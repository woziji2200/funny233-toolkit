<template>
    <div @contextmenu.prevent="">
        <el-config-provider :size="size" :z-index="zIndex">
            <router-view></router-view>
        </el-config-provider>
    </div>
</template>
<script>
import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'
export default defineComponent({
    components: {
        ElConfigProvider,
    },
    setup() {
        return {
            zIndex: 13000,
            // size: 'small',
        }
    },
})
</script>
<style lang="scss">
@import url(./modules/drag.css);

.mx-menu-ghost-host {
    z-index: 10000 !important;
}

.scroll-container:hover::-webkit-scrollbar-thumb {
    background: #a3a3a3b8;
}

.scroll-container:hover::-webkit-scrollbar-track {
    background: #ffffff1e;
}

/* 滚动条整体 */
.scroll-container::-webkit-scrollbar {
    height: 3px;
    width: 3px;
    cursor: pointer;
    transition: all 0.3s;
}

/* 两个滚动条交接处 -- x轴和y轴 */
.scroll-container::-webkit-scrollbar-corner {
    background-color: transparent;
}

/* 滚动条滑块 */
.scroll-container::-webkit-scrollbar-thumb {
    border-radius: 10px;
    // -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #a3a3a3b8;

}

/* 滚动条轨道 */
.scroll-container::-webkit-scrollbar-track {
    // -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #ffffff1e;
}

/* 滚动条两端按钮 */
.scroll-container::-webkit-scrollbar-button {}
</style>
