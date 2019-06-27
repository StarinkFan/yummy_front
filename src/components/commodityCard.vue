<template>
  <div id="main">
    <img :src="photo" id="photo"/>
    <h5>{{name}}</h5><h5>¥{{price}}</h5>
    <div id="detail" style="width: 100%;height: 13px">
      <p>{{description}}</p>
    </div>
    <el-input-number style="width: 60%;margin-right: -50px;margin-top: 15px;" ref="num" v-model="currentIndex" :min="0" :max="10" label="描述文字" @change="change()"></el-input-number>
  </div>
</template>

<script>
    export default {
        name: "commodityCard",
      data(){
        return {
          currentIndex:this.num,
        }
      },
      props: {
        cid: {
          type: Number,
          required: -1
        },
        name: {
          type: String,
          default: ""
        },
        photo: {
          type: String,
          default:"https://njuhzl.oss-cn-hangzhou.aliyuncs.com/yummy/defaultPhoto.jpg"
        },
        kind: {
          type: String,
          default: ""
        },
        description: {
          type: String,
          default: ""
        },
        rid: {
          type: Number,
          required: -1
        },
        price: {
          type: Number,
          required: -1
        },
        num: {
          type: Number,
          required: 0
        },
        cindex: {
          type: Number,
          required: 0
        },
      },
      methods:{
          change(value){
            this.$nextTick(() => {
              //console.log(this.$refs.num.value+" "+this.cindex);
              let num=this.$refs.num.value;
              this.$emit('change',num,this.cindex,this.kind);
            })
            //this.$parent.;
          },
        changeN(value){
            console.log("yyy"+value);
        }
      },
    }

</script>

<style scoped>
  #photo{
    width: 100%;
    height: 180px;
  }

  #main{
    width: 33%;
    display: flex;
    justify-content: center;
    padding: 30px 10px 30px 10px;
    border-bottom: 0.2px lightgrey solid;
    flex-wrap: wrap;
    cursor: pointer;
  }

  #detail{
    display: flex;
    justify-content: space-between;
  }

  #detail p{
    display: inline-block;
    color: darkgrey;
    font-size: 13px;
  }

  h5{
    width: 100%;
    font-size: 15px;
    color: #606266;
    font-weight:700;
  }
  #num{
    width: 70%;
    margin-right: -50px;
  }

</style>
