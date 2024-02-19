<template>
    <textarea class="textarea1" :value="value" @input="$emit('update:value', $event.target.value)" name="" id="" :cols="cols" :rows="rows"></textarea>
</template>
<script>
export default {
    props:{
        value: String,
        cols: { type: String, default: '30' },
        rows: { type: String, default: '10'}
    },
    emits: ['update:value'],
}
</script>
<style scoped>
.textarea1{
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.3);
    color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);
    outline: none;
    resize: vertical;
    /* transition: all 0.2s; */
}
</style>