<template>
    <div class="window" ref="main">
        <div class="node" >
            <div class="input">
                <span style="color: white;">Token(Unauthenticated tokens will be restricted):&nbsp;</span>
                <input style="color: white;" v-model="token" type="password">
            </div>
        </div>
        <div class="main">
            <div class="node" v-for="i in nodes">
                <div class="content" v-html="i.content"></div>
                <div v-show="i.show" class="input">
                    <span>Funny233@Debian&nbsp;>&nbsp;</span>
                    <input :id="i.id" :readonly="i.isClose" @keyup.enter.prevent="addNode" v-model="i.input"
                        type="text">
                </div>
            </div>
        </div>

    </div>
</template>
<script setup>
// import hljs from "highlight.js";
import { ref, reactive, nextTick } from 'vue'
import MarkdownIt from "markdown-it";
import axios from "axios";


const markdown = new MarkdownIt({
    breaks: true,
});
// let node = ref(markdown.render("# qwq"));

let nodes = reactive([
    {
        id: 1, isClose: false, show: true, content: markdown.render(`
\`\`\`bash
Welcome to Debian GNU/Linux 11 (bullseye)!
This is a shell simulated by 通义千问，created by Funny233.
Enjoy it!
\`\`\``), input: ""
    },]
)
let messages = [
    {
        role: "system",
        content: "你将扮演一个模拟的Linux终端环境，系统使用debian11，sudo密码是123456，负责接收用户输入的命令并准确模拟其在真实Linux终端中的执行结果。我将输入命令，你将回答并仅显示终端应该显示的内容，不需要给任何解释。你的职责是模拟Linux命令的执行结果，而非实际执行命令或提供命令执行的环境。因此，不涉及任何实际文件系统的操作、系统状态的改变或网络通信。如果我的命令是ls，你应该返回\n```bash\nDesktop Documents Pictures sample.txt\n```"
    }
]
const main = ref('main')
let nowCommend = 0

const addNode = async () => {
    nodes[nodes.length - 1].isClose = true
    messages.push({ role: "user", content: nodes[nodes.length - 1].input })
    nextTick(() => {
        console.log(main.value);
        main.value.scrollTo({ top: main.value.scrollHeight, behavior: 'smooth' });
    })
    nodes.push({ id: nodes.length + 1, show: false, isClose: false, content: markdown.render("```...```"), input: "" })
    try {
        let msg = await axios.post('http://localhost:8072/api/bash', messages, {
            headers: {
                'Auth': token.value
            }
        })
        nodes[nodes.length - 1].content = markdown.render(msg.data.output.text)
        nodes[nodes.length - 1].show = true
        nowCommend = messages.length
        nextTick(() => {
            console.log(main.value);
            main.value.scrollTo({ top: main.value.scrollHeight, behavior: 'smooth' });
        })
    } catch (error) {
        nodes[nodes.length - 1].content = markdown.render("```bash\n" + error + "\n```")
        nodes[nodes.length - 1].show = true
        nowCommend = messages.length
        nextTick(() => {
            console.log(main.value);
            main.value.scrollTo({ top: main.value.scrollHeight, behavior: 'smooth' });
        })
    }

}

const commendAdd = (e) => {
    if (e.keyCode == 38) {
        nodes[nodes.length - 1].input = messages[nowCommend].content
        if (nowCommend >= messages.length) {
            return
        }
        nowCommend++
        e.preventDefault()
        return
    } else if (e.keyCode == 40) {
        if (nowCommend <= 0) {
            return
        }
        nowCommend--
        nodes[nodes.length - 1].input = messages[nowCommend].content
        e.preventDefault()
        return
    }
    // e.preventDefault()
    // console.log(e);
    // nodes[nodes.length - 1].input = messages[nowCommend].content
    // if (nowCommend >= messages.length) {
    //     return
    // }
    // nowCommend++
}
const commendSub = (e) => {
    e.preventDefault()
    // if (nowCommend <= 0) {
    //     return
    // }
    // nowCommend--
    // nodes[nodes.length - 1].input = messages[nowCommend].content
}



let token = ref("")

</script>
<style>
pre {
    white-space: pre-wrap !important;
    word-wrap: break-word;
    width: 100%;
}
</style>
<style scoped>
.main {
    /* margin: 5px 20px; */
}

.window {
    /* overflow: hidden; */
    height: calc(100% - 35px);
    padding: 5px 20px;
    background-color: #00000072;
}

.node {
    /* margin: 3px 0; */
    padding: 0px 10px;
    /* background: #3333333a; */
    /* border-radius: 5px; */
    color: #fff;
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;
}

.node input {
    width: 100%;
    background: transparent;
    color: #fff;
    border: none;
    outline: none;
}

.node .content {
    display: inline-block;
}

.node .input {
    display: flex;

}

.input span {
    white-space: nowrap;
    color: #d524c0;
    font-weight: bold;
}

.input input {
    background: transparent;
    color: #21c0ff;
    border: none;
    outline: none;
}

.input {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
</style>