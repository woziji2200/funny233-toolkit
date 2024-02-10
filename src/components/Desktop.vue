<template>
    <div class="main">
        111
    </div>
</template>
<style scoped>
.main{
    height: 80vh;
    max-height: 600px;
    width: 500px;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    margin: 20px;
    border-radius: 30px;
    padding: 20px;
}
@media screen and (max-width: 700px){
    .main{
        width: calc(100vw - 40px);
        height: calc(100vh - 70px - 40px);
    }
}
</style>