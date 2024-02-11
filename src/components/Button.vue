<template>
    <!-- <button>111</button> -->
    <span class="main1" @click="click" :style="{ width, height }">{{ title }}</span>
</template>

<style scoped>
.main1{
    /* display: inline-block; */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.3);
    padding: 5px 20px;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    user-select: none;
    transition: all 0.2s;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);
    outline: none;
}
.main1:hover{
    background-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0px 0px 15px rgba(255, 255, 255, 0.8);
}
</style>

<script>
export default {
    props: {
        title: String,
        width: {
            type: String,
            default: 'auto'
        },
        height: {
            type: String,
            default: 'auto'
        }
    },
    emits: ['click'],
    methods: {
        click(e) {
            this.$emit('click', e)
        }
    }
}
</script>