<template>
    <div>
        <div class=" m-5">
            <label for="select" class=" text-white">选择转换的编码：</label>
            <SelectVue class=" w-40" name="select" :options="options.map(i => i.type)" v-model:value="selected"></SelectVue>
        </div>

        <TextareaVue class="scroll-container m-5 text" v-model:value="value1" name="" id=""></TextareaVue>
        <div class=" mt-3 mb-3 flex justify-center gap-5">
            <ButtonVue title="↓ 转换成base编码" width="180px" @click="toBase()"></ButtonVue>
            <ButtonVue title="↑ 转换成原文" width="180px" @click="toRaw()"></ButtonVue>
        </div>
        <TextareaVue class="scroll-container m-5 text" v-model:value="value2" name="" id=""></TextareaVue>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ButtonVue from '../../components/Button.vue'
import TextareaVue from '../../components/Textarea.vue'
import InputVue from '../../components/Input.vue'
import SelectVue from '../../components/Select.vue'
let value1 = ref('')
let value2 = ref('')


const options = ref([
    { type: 'base2', code: '01' },
    { type: 'base8', code: '01234567' },
    { type: 'base11', code: '0123456789a' },
    { type: 'base16', code: '0123456789abcdef' },
    { type: 'base32', code: '0123456789ABCDEFGHJKMNPQRSTVWXYZ' },
    { type: 'base32(z-base-32)', code: 'ybndrfg8ejkmcpqxot1uwisza345h769' },
    { type: 'base36', code: '0123456789abcdefghijklmnopqrstuvwxyz' },
    { type: 'base58', code: '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz' },
    { type: 'base62', code: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' },
    { type: 'base64', code: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/' },
    { type: 'base67', code: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.!~' },
])
let selected = ref('base64')

function arrayBufferToString(buffer: ArrayBuffer, encoding = 'utf-8') {
    const decoder = new TextDecoder(encoding);
    return decoder.decode(buffer);
}

function StringToArrayBuffer(text: string, encoding = 'utf-8') {
    const encoder = new TextEncoder();
    return encoder.encode(text);
}

const toBase = () => {
    let basecode = options.value.find(i => i.type == selected.value)?.code
    // console.log(basecode);
    let bs = require('base-x')(basecode)
    value2.value = bs.encode(StringToArrayBuffer(value1.value))
}

const toRaw = () => {
    let basecode = options.value.find(i => i.type == selected.value)?.code
    let bs = require('base-x')(basecode)
    value1.value = arrayBufferToString(bs.decode(value2.value))
}

</script>
<style scoped>
.text {
    height: calc(50% - 110px);
    width: calc(100% - 40px);
}
</style>