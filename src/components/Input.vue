<template>
    <input class="input1" :value="value" @input="$emit('update:value', $event.target.value)" type="text" name="" id="">
</template>
<script>
export default {
    props: {
        value: String
    },
    emits: ['update:value']
}
</script>
<style scoped>
.input1{
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.3);
    color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    outline: none;
    transition: all 0.2s;
}
</style>