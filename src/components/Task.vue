<template>
    <span class="show-title" :title="title" :style="type == 'line'?{width: '100%'} :''">
        <span :class="pid==-1?'pid-1':''" v-if="type == 'task'" @dragenter="$emit('dragenter', $event)" @dragend="$emit('dragend', $event)"
            @dragstart="$emit('dragstart', $event)" @dragover="$emit('dragover', $event)" @click="$emit('click')"
            class="main w-12 h-12">
            <i :class="class1" class="icon"></i>
            <span v-if="pid== -1" class="des">{{ title }}</span>
            <!-- {{ number1 }} -->
        </span>
        <div v-if="type == 'line'" class="title">
            {{ title }}
        </div>
    </span>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
    name: 'Task',
    props: {
        icon: String,
        type: String,
        title: String,
        pid: Number
    },
    emits: ['click', 'dragend', 'dragenter', 'dragstart', 'dragover'],
    data() {
        return {
            IconName: ref(`fa fa-${this.icon}`),
        }
    },
    computed: {
        class1() {
            return `fa fa-${this.icon}`
        }
    },
    methods: {

    },
    mounted() {

    }
});

</script>

<style scoped lang="scss">
.main {
    display: flex;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 30%;
    background-color: rgba(0, 0, 0, 0.2);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.7);
    cursor: pointer;
    user-select: none;
    position: relative;
    // display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s;
}

.main:hover {
    background-color: rgba(0, 0, 0, 0.3);
    // transform: scale(1.1);
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.8);

}

.icon {
    height: 100%;
    width: 100%;
    font-size: 25px;
    color: rgb(226, 226, 226);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}
.title{
    color: white;
    font-size: 20px;
    margin: 0px 10px;
    // margin-top: 24px;
    width: 100%;
}
.des{
    color: white;
    font-size: 12px;
    position: absolute;
    top: 58px;
    width: 200%;
    text-align: center;
}
.main:hover .des{
    text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.8);
}
.pid-1{
    margin-bottom: 24px ;
}
</style>
