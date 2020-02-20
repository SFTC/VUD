<template>
  <div>
    <header>
      <img class="img-icon" src="https://img.yzcdn.cn/public_files/2017/12/18/fd78cf6bb5d12e2a119d0576bedfd230.png" alt="">
      <span>VUD</span>
      <div class="input-container"><input type="text" placeholder="搜索组件..."><i></i></div>
      <a href="https://github.com/SFTC/VUD"></a>
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
    width: 1440px;
    display: flex;
    align-items: center;
    padding-left: 30px;
    font-size: 20px;
    color: rgb(12, 9, 9);
    padding-right: 30px;
    height: 80px;
    margin:0 auto 10px;
    border-bottom: 1px solid #dcdfe6;
    .img-icon{
      width: 24px;
      margin-right: 10px;
    }
    span{
      margin-right: 40px;
    }
    .input-container{
      border-bottom: 1px solid rgb(220, 222, 224);
      height: 31px;
      display: flex;
      input{
        display: inline-block;
        flex: 1;
        min-width: 80px;
        height: 100%;
        box-sizing: border-box;
        padding: 0 10px;
        margin: 0;
        font-size: 14px;
        box-shadow: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        outline: none;
        border: 0;
      }
      &::after{
        display: block;
        margin-top: 5px;
        content: '';
        width: 20px;
        height: 20px;
        background: url('../assets/search.png') left top no-repeat;
        background-size: 100%;
      }
    }
    a{
      width: 28px;
      height: 28px;
      color: #409eff;
      margin-left: auto;
      text-decoration: none;
      background: url('https://img.yzcdn.cn/zanui/react/GitHub-Mark-120px-plus.png') left top no-repeat;
      background-size: 28px 28px;
    }
  }

</style>
