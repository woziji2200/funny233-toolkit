<template>
    <div id="range" class="background h-screen w-screen">
        <div class="background-image h-screen w-screen"></div>

        <div class="Tasks bg-opacity-30 bg-black w-screen absolute bottom-0 hover:bg-opacity-40">
            <div class="scroll-container Tasks2">
                <TaskVue icon="home" @click="AppMenuShow = !AppMenuShow" :type="'task'">
                </TaskVue>
                <transition-group name="list" tag="TaskVue" class="flex overflow-visible">
                    <TaskVue :key="i.pid" v-for="(i, index) in TasksList" :icon="i.icon.toString()"
                        @dragstart="TaskDragStart($event, i.pid, index)" @dragenter="TaskDragEnter($event, i.pid, index)"
                        @dragend="TaskDragEnd($event, i.pid, index)" @dragover="TaskDragOver($event)" draggable="true"
                        @click="showTask(i.pid)" @contextmenu.prevent="ShowTaskMenu($event, i.pid)"
                        :type="i.type.toString()" :pid="i.pid" :title="i.title">
                    </TaskVue>
                </transition-group>
            </div>

            <div class="task-time h-full">
                <span>{{ Time }}</span>
                <span>{{ YearMonthDay }}</span>
                <div class="task-time-sd absolute bg-white h-full w-1 right-0 opacity-30 hover:opacity-50" @click="showDesktop()" title="显示桌面"></div>
            </div>
        </div>
        <div class="windows">
            <!-- <transition-group  name="list" tag="WindowVue" class="flex overflow-visible"> -->

            <WindowVue v-for="i in TasksList" :ref="setTaskRef" :icon="i.icon.toString()" :title="i.title.toString()"
                :name="i.name.toString()" :key="i.pid" @close="closeTask" :pid="i.pid"></WindowVue>
            <!-- </transition-group> -->
        </div>

        <transition>
            <div class="app-menu-ghost" v-show="AppMenuShow" @click="AppMenuShow = false" tabindex="0"
                @keydown="AppMenuClose">
                <div class="app-menu" :ref="GetAppMenu" @click.stop="" tabindex="0">
                    <div class="app-menu-title">
                        <h1>应用菜单</h1>
                        <button @click="AppMenuShow = false"></button>
                    </div>
                    <div class="search">
                        <input type="text" v-model="AppSearch" placeholder="搜索应用">
                    </div>
                    <div class="menu scroll-container">
                        <transition-group>
                            <TaskVue v-for="i in AppListShow" :icon="i.icon" @click="OpenApp(i)" :type="i.type"
                                :title="i.title" :pid="i.pid" :key="i.name"></TaskVue>
                        </transition-group>
                    </div>
                </div>
            </div>
        </transition>

        <div class="desktop">
            <TaskVue v-for="i in AppList?.filter(i => i.recommend)" :icon="i.icon" @click="OpenApp(i)" :type="i.type"
                :title="i.title" :pid="i.pid" :key="i.name" class="desktop-task"></TaskVue>
        </div>





    </div>
</template>

<script setup lang="ts">
import TaskVue from './../components/Task.vue'
import WindowVue from '@/components/Window.vue';
import DesktopVue from '@/components/Desktop.vue';
import * as props from '../modules/interfaces'
import { ref, onBeforeUpdate, onMounted, onUpdated, toRaw, watch, nextTick } from 'vue'
import { newWindowsAdd, newWindows, newWindowsDec } from '../modules/api'
import ContextMenu from '@imengyu/vue3-context-menu'
import { routes } from '@/router';
import { getAppList } from '../views/modules/_List';

let TasksList = ref<props.Task[]>([])
let TaskDragIndex = ref<number>(0)
let pid = 0;


const createTask = (icon: String, name: String, title: String) => {
    newWindowsAdd()
    TasksList.value.push({
        icon: icon,
        name: name,
        title: title,
        pid: pid,
        type: 'task'
    })
    pid++
    console.log('task', TasksList.value);

}
onBeforeUpdate(() => {
    TaskRef.value = []
})


const closeTask = (pid: Number) => {
    console.log('task', TasksList.value);

    TasksList.value.splice(TasksList.value.findIndex(i => i.pid == pid), 1)
    newWindowsDec()
}
let TaskRef = ref<HTMLElement[]>([])
const setTaskRef = (el: any) => {
    if (el) {
        TaskRef.value.push(el)
    }
}
const showTask = (pid: Number) => {
    (TaskRef.value.filter(i => (toRaw(i) as any).pid as any == pid)[0] as any).showWindow()
}



const TaskDragStart = (e: Event, pid: Number, index: number) => {
    e.stopPropagation()
    TaskDragIndex.value = index
    setTimeout(() => {
        TasksList.value.filter(i => i.pid == pid)[0].class = 'moving'
    }, 0);
}

const TaskDragEnter = (e: Event, pid: Number, index: number) => {
    e.preventDefault()
    if (TaskDragIndex.value !== index) {
        const source = TasksList.value[TaskDragIndex.value]
        TasksList.value.splice(TaskDragIndex.value, 1)
        TasksList.value.splice(index, 0, source)
        TaskDragIndex.value = index
    }
}
const TaskDragEnd = (e: Event, pid: Number, index: number) => {
    TasksList.value.filter(i => i.pid == pid)[0].class = ''
}
const TaskDragOver = (e: Event) => {
    e.preventDefault()
}


const AppList = ref<props.Task[]>()
const AppListShow = ref<props.Task[]>()
const AppSearch = ref('')
AppList.value = getAppList()
AppListShow.value = AppList.value
console.log('应用列表：', AppList.value);
const OpenApp = (app: props.Task) => {
    AppMenuShow.value = false
    setTimeout(() => {
        createTask(app.icon, app.name, app.title)
    }, 100);
}
watch(AppSearch, (newVal, oldVal) => {
    if (newVal == '') {
        AppListShow.value = AppList.value
    } else {
        AppListShow.value = AppList.value?.filter(i => { return i.title.toString().toLowerCase().indexOf(newVal.toLowerCase()) != -1 && i.type == 'task' })
    }
})


const ShowTaskMenu = (e: MouseEvent, pid: Number) => {
    console.log(111);

    ContextMenu.showContextMenu({
        x: e.x,
        y: e.y - 100,
        items: [{
            label: '最大化',
            icon: 'fa fa-window-maximize',
            onClick: () => {
                (TaskRef.value.filter(i => (toRaw(i) as any).pid as any == pid)[0] as any).maximize()
            }
        }, {
            label: '最小化',
            icon: 'fa fa-window-minimize',
            onClick: () => {
                (TaskRef.value.filter(i => (toRaw(i) as any).pid as any == pid)[0] as any).minimize()
            }
        }, {
            label: '关闭窗口',
            icon: 'fa fa-window-close',
            onClick: () => {
                (TaskRef.value.filter(i => (toRaw(i) as any).pid as any == pid)[0] as any).close()
            }
        }]
    })
}

const showDesktop = () => {
    TaskRef.value.forEach(i => {
        (i as any).minimize()
    })
}

let AppMenuShow = ref(false)
const AppMenuClose = (e: KeyboardEvent) => {
    if (e.key == 'Escape') {
        AppMenuShow.value = false
    }
}

let AppMenuRef = ref<HTMLElement>()
const GetAppMenu = (el: HTMLElement) => {
    AppMenuRef.value = el
    return undefined
}

watch(AppMenuShow, (newVal, oldVal) => {
    if (newVal == true && oldVal == false) {
        setTimeout(() => {
            AppMenuRef.value?.focus()
        }, 300);
    }
})

let Time = ref(new Date().toLocaleTimeString())
setInterval(() => {
    Time.value = new Date().toLocaleTimeString()
}, 200);
let YearMonthDay = ref(new Date().toLocaleDateString())
setInterval(() => {
    YearMonthDay.value = new Date().toLocaleDateString()
}, 1000);

OpenApp({
    icon: 'id-card',
    name: 'Profile',
    title: '自我介绍',
    pid: -1,
    type: 'task'
})


</script>

<style scoped lang="scss">
.background {
    overflow: hidden;
    // z-index: -1100;
    position: relative;
}

.background-image {
    background: url('../assets/bg.webp');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    z-index: -1000;
}

* {
    transition: all 0.3s;
}

.Tasks {
    display: flex;
    justify-content: left;
    align-items: center;
    backdrop-filter: blur(10px);
    height: 70px;
    overflow-y: hidden;
}
.Tasks2{
    display: flex;
    justify-content: left;
    align-items: center;
    // backdrop-filter: blur(10px);
    width: calc(100% - 120px);
    height: 70px;
    overflow-y: hidden;
    overflow-x: auto;
}
.moving {
    opacity: 0;
}

.list-move,
.list-enter-active,
.list-leave-active {
    transition: all 0.3s;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateY(30px);
}

.list-leave-active {
    position: absolute;
}

.app-menu-ghost {
    z-index: 9999;
    position: absolute;
    width: 100vw;
    height: calc(100vh - 70px);
    background-color: rgba(0, 0, 0, 0.3);
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
}

.app-menu {
    width: 80vw;
    height: 80vh;
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);
    border-radius: 30px;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.8);
    padding: 25px 55px;
    outline: none;
}

@media screen and (max-width: 700px) {
    .app-menu {
        padding: 25px 20px;
    }
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.2s;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.app-menu-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.app-menu-title h1 {
    color: white;
    font-size: 26px;
    // margin-left: 40px;
}

.app-menu-title button {
    background-color: rgb(182, 20, 20);
    border: none;
    outline: none;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    cursor: pointer;
}

.app-menu-title button:hover {
    filter: brightness(1.5);
    transition: all 0.2s;
}

.windows {
    // width: 100vw;
    // height: 100vh;
    // position: absolute;
}

.menu {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    overflow-y: auto;
    overflow-x: hidden;
    height: calc(100% - 120px);
    padding-top: 20px;
    align-content: flex-start;
}


.search {
    margin-bottom: 20px;
}

.search input {
    width: 100%;
    outline: none;
    height: 40px;
    padding: 0px 20px;
    background-color: rgba(255, 255, 255, 0.17);
    color: white;
    border-radius: 20px;
    // border: solid 1px rgba(255, 255, 255, 0.4);
}

.search input::placeholder {
    color: rgba(255, 255, 255, 0.695);
}

.desktop {
    margin: 30px;
    display: flex;
    gap: 20px;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: flex-start;
}

@media screen and (max-width: 700px) {
    .desktop {
        // margin: 30px 0;
        flex-direction: row;
    }
}

.task-time {
    position: absolute;
    right: 0;
    padding-right: 20px;
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    font-size: 14px;
}
</style>
<style>
.desktop-task .main {
    background-color: rgba(0, 0, 0, 0.6);
}

.desktop-task .main:hover {
    background-color: rgba(0, 0, 0, 0.7);
}

.desktop-task .des {
    text-shadow: 0px 0px 5px rgba(0, 0, 0);
}
</style>