<template>
  <div>
    <header>
      <img class="img-icon" src="../assets/icon.png" alt="">
      <img class="img-txt" src="../assets/txt.png" alt="">
      <a href="https://github.com/SFTC/sf-vue-ui">资源</a>
    </header>
  </div>
</template>
<script>
export default {
  name: 'Header'
}
</script>
<style lang="less" scoped>
  header{
    display: flex;
    align-items: center;
    padding-left: 30px;
    font-size: 20px;
    color: rgb(12, 9, 9);
    padding-right: 30px;
    height: 80px;
    margin-bottom: 10px;
    box-shadow: 0 2px 8px #f0f1f2;
    .img-icon{
      width: 50px;
      height: 50px;
    }
    .img-txt{
      height: 50px;
    }
    a{
      color: #409eff;
      margin-left: auto;
      text-decoration: none;
    }
  }

</style>
