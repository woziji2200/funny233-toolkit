<template>
    <vue-draggable-resizable class="window" @drag-stop="dragstop" :resizeable="!isMaximized" :draggable="!isMaximized"
        :style="zindex" :x="style.left" :y="style.top" :min-width="400" :min-height="300" :w="style.width" :h="style.height"
        @mousedown.stop="mousedown" dragHandle=".header" @draging="">
        <div class="main" tabindex="0" ref="main" @keydown.esc.stop="close()">
            <div class="header">
                <div>
                    <i :class="`fa fa-${icon}`"></i>
                </div>
                <div class="title" @dblclick="maximize()">
                    <div>{{ title }}</div>
                </div>
                <div class="buttons">
                    <button class="minimize" @click="minimize()" @mousedown.prevent></button>
                    <button class="maximize" @click="maximize()" @mousedown.prevent></button>
                    <button class="close" @click="close()" @mousedown.prevent></button>

                </div>
            </div>
            <div class="router-div scroll-container">
                <router-view class="router scroll-container" :name="name"></router-view>
            </div>
        </div>


    </vue-draggable-resizable>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { windowIndex, indexAdd, newWindows, newWindowsDec } from '../modules/api'

export default defineComponent({
    name: 'Window',
    data() {
        return {
            isMaximized: false,
            style: {
                left: window.innerWidth < 700 ? 25 : window.innerWidth * 0.2 + newWindows * 20,
                top: window.innerWidth < 700 ? 25 : (window.innerHeight * 0.2 - 70) + newWindows * 20,
                width: window.innerWidth < 700 ? window.innerWidth - 50 : window.innerWidth * 0.6,

                height: window.innerWidth < 700 ? window.innerHeight - 70 - 50 : window.innerHeight * 0.6,
            },
            styleCopy: {
                left: window.innerWidth * 0.2 + newWindows * 20,
                top: (window.innerHeight * 0.2 - 70) + newWindows * 20,
                width: window.innerWidth < 700 ? window.innerWidth : window.innerWidth * 0.6,
                height: window.innerHeight * 0.6,
            },
            zindex: { 'z-index': windowIndex, display: 'block', opacity: 0 },
            isMinimized: false
        }
    },
    props: {
        name: String,
        icon: String,
        title: String,
        pid: Number
    },
    emits: ['close'],
    methods: {
        mousedown() {
            const main = ref<HTMLElement>(this.$refs.main as HTMLElement)
            main.value.focus()
            indexAdd()
            this.zindex['z-index'] = windowIndex
        },
        close() {
            this.zindex.opacity = 0
            setTimeout(() => {
                this.$emit('close', this.pid)
            }, 200);
            // this.$emit('close', this.name)
        },
        maximize() {
            this.isMinimized = false
            this.zindex.display = 'block'
            this.zindex.opacity = 1
            const main = ref<HTMLElement>(this.$refs.main as HTMLElement)
            main.value.focus()
            if (this.isMaximized) {
                this.style = this.styleCopy
                main.value.style.left = this.styleCopy.left + 'px'
                main.value.style.top = this.styleCopy.top + 'px'
            } else {
                this.styleCopy = JSON.parse(JSON.stringify(this.style))
                this.style = {
                    left: 0,
                    top: 0,
                    width: window.innerWidth,
                    height: window.innerHeight - 70,
                }
            }
            this.isMaximized = !this.isMaximized

            setTimeout(() => {
                main.value.style.transition = 'all 0s'
            }, 320);

        },
        minimize() {
            this.isMinimized = true
            this.zindex.opacity = 0
            setTimeout(() => {
                this.zindex.display = 'none'
            }, 200);
            // this.zindex.display = 'none'
            // console.log(this.isMinimized);

        },
        showWindow() {
            // console.log(this.isMinimized);
            this.zindex.display = 'block'
            this.zindex.opacity = 1
            this.isMinimized = false
            // console.log(this.isMinimized);
            indexAdd()
            this.zindex['z-index'] = windowIndex
            const main = ref<HTMLElement>(this.$refs.main as HTMLElement)
            main.value.focus()

        },
        dragstop(left: number, top: number) {
            newWindowsDec()
            this.style.left = left
            this.style.top = top
        },

    },
    mounted() {
        this.zindex.opacity = 1
        const main = ref<HTMLElement>(this.$refs.main as HTMLElement)
        main.value.focus()
        // this.$router.push({ name: this.name })

        window.addEventListener('resize', () => {
            if (this.isMaximized) {
                this.style = {
                    left: 0,
                    top: 0,
                    width: window.innerWidth,
                    height: window.innerHeight - 70,
                }
            }
        })
    },
})

</script>
<style scoped lang="scss">
.window {
    position: absolute;
    // backdrop-filter: blur(10px);
    z-index: 100;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.7);
    resize: both;
    // overflow: hidden;
    transition: opacity 0.2s;
}

.main:focus .header,
.main:focus-within .header {
    background-color: #24242484;
}

.main {
    background-color: rgba(0, 0, 0, 0.4);
    width: 100%;
    height: 100%;
}

.main:focus,
.main:focus-within {
    // background-color: rgba(0, 0, 0, 0.6);
    outline: none;
    backdrop-filter: blur(10px);

}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #73737388;
    // backdrop-filter: blur(10px);
    color: white;
    // padding: 10px;
    height: 35px;
}

.header i {
    margin-left: 15px;
}

.title {
    padding-left: 10px;
    user-select: none;
    flex-grow: 1;
    height: 100%;
    line-height: 35px;
    // font-size: 1.5rem;
}

.buttons {
    display: flex;
    gap: 10px;
    margin-right: 15px;
}

.buttons button {
    border: none;
    outline: none;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    cursor: pointer;
}

.buttons button:hover {
    //颜色加亮
    filter: brightness(1.5);
    transition: all 0.3s;
}

.close {
    background-color: rgb(195, 4, 4);
}

.minimize {
    background-color: rgb(196, 196, 0);
}

.maximize {
    background-color: rgb(12, 177, 12);
}

.fade-enter-active,
.fade-leave-active {
    transition: all .5s linear;
}

.fade-enter {
    opacity: 0;
}

.router {
    width: 100%;
    height: 100%;
    overflow: auto;
}
.router-div{
    overflow: auto;
    width: 100%;
    height: calc(100% - 35px);
}
</style>