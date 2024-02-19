<template>
    <div class="main">
        <div class="profile">
            <div class="profile-avatar">
                <img src="../../assets/logo.png" alt="" srcset="">
            </div>
            <div class="profile-des">
                <div class="profile-des-name">高坂滑稽果</div>
                <div class="profile-des-p text-wrap">嘟嘟</div>
            </div>
        </div>

        <div>
            <div></div>
            <h2 class=' text-2xl text-wrap text-center'>你好！这里是高坂滑稽果</h2>
            <div class="text-center text-zinc-300 mt-5">试着点击左下角应用菜单吧</div>
            <div class="text-center text-zinc-300 text-opacity-80 mt-5 text-sm">这里是传送门：</div>

            <div class="flex justify-center gap-2 mt-4 buttons">
                <ButtonVue @click="linkTo('https://github.com/woziji2200/funny233-toolkit')" title="Github" width="120px"></ButtonVue>
                <ButtonVue @click="linkTo('https://funny233.xyz')" title="博客" width="120px"></ButtonVue>
                <ButtonVue @click="linkTo('https://status.funny233.xyz')" title="服务器状态" width="120px"></ButtonVue>
            </div>



        </div>


        <div>
            <p class="footer">ICP备案 <a target="_blank" href="https://beian.miit.gov.cn/">鲁ICP备2020046160号</a></p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ButtonVue from '../../components/Button.vue'
const log = (word: any) => {
    console.log(word)
}

const linkTo = (url: string) => {
    window.open(url)
}
</script>

<style scoped>
.main {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: white;
    user-select: none;
}

.profile {
    display: flex;
    /* justify-content: space-around; */
    margin: 30px 0;
    background-color: rgba(255, 255, 255, 0.3);
    color: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);
    width: 500px;
    transition: all 0.5s;

}

.profile:hover{
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.8);
    background-color: rgba(255, 255, 255, 0.4);
    transform: scale(1.05);
}
.profile-des {
    margin-left: 30px;
}

.profile-des-name {
    font-size: 24px;
    /* font-weight: bold; */
}

.profile-des-p {
    font-size: 18px;
    color: rgba(255, 255, 255, 0.7);
}

.profile-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);
}

.profile-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.8s;
}

.profile-avatar img:hover {
    transform:rotate(360deg);
}
.buttons{
    margin-bottom: 100px;
}

@media screen and (max-width: 700px) {
    .profile {
        width: calc(100vw - 80px);
    }
    .buttons{
        flex-direction: column;
        align-items: center;
    }
}
.footer{
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    bottom: 10px;
    color: rgba(255, 255, 255, 0.5);
    font-size: 10px;
    text-align: center;
    /* width: 100%; */
}
</style>