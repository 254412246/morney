<template>
       <Layout>
           <div>
               <ul>
                   <ol>衣</ol>
                   <ol>食</ol>
                   <ol>住</ol>
                   <ol>行</ol>
               </ul>
               <button>新增标签</button>
           </div>
           <div>
               <label>
                   <span>备注</span>
                   <input type="text">
               </label>
           </div>
           <div>
               <span>支出</span><span>收入</span>
           </div>
           <div class="numberPad">
           <div class="output">100</div>
           <div class="buttons">
               <button>1</button>
               <button>2</button>
               <button>3</button>
               <button>+</button>
               <button>删除</button>
               <button>4</button>
               <button>5</button>
               <button>6</button>
               <button>-</button>
               <button>清空</button>
               <button>7</button>
               <button>8</button>
               <button>9</button>
               <button>X</button>
               <button>OK</button>
               <button>0</button>
               <button>/</button>
           </div>
           </div>
       </Layout>
</template>

<script>


    export default {
        name: "Money",

    }
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
    p {
        color: $red;
    }
</style>
