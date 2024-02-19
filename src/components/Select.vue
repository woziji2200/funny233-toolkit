<template>
    <select class="select" @change="$emit('update:value', $event.target.value)" :value="value">
        <option :value="i" v-for="i in options">{{ i }}</option>
    </select>
    <!-- <div class="select" tabindex="1">
        <el-select :value="value">
            <el-option
                v-for="item in options"
                :key="item"
                :label="item"
                :value="item">
            </el-option>
        </el-select>
    </div> -->
</template>

<script>
// import ElInput from 'element-plus'
export default {
    components: {
        // ElInput
    },
    props: {
        value: String,
        options: Array
    },
    emits: ['update:value']
}
</script>
<style scoped>
.select{
    outline: none;
}
</style>