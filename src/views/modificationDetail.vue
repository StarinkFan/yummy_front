<template>
  <el-card class="box-card" style="width: 50%;margin-left: 25%;margin-top: 50px;padding: 50px;margin-bottom: 50px">
    <p>名称：{{info.name}}</p><br>
    <p>类型：{{info.kind}}</p><br>
    <p>地址：{{info.location}}</p>
    <div class="photoPart">
      <img id="photo" :src="info.photo">
      <p>头像</p>
    </div>
    <div class="certificatePart">
      <img id="certificate" :src="info.certificate">
      <p>营业资格证</p>
    </div>
    <div style="width: 100%; text-align: center">
      <el-button type="primary" plain style="margin-top: 20px;margin-right: 50px" @click="passModification">通  过</el-button>
      <el-button type="primary" plain @click="vetoModification">否  决</el-button>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: "applicationDetail",
    data() {
      return {
        info: {
          kind: '',
          name: '',
          photo: '/static/pic/defaultPhoto.jpg',
          certificate: '/static/pic/defaultLackPic.png',
          location: ""
        }
      }
    },
    mounted() {
      this.$axios.post('/modification/getModificationDetail', {mid: localStorage.modificationId}).then(
        res => {
          this.info=res.data;
          switch(this.info.kind){
            case 1:
              this.info.kind="中餐";
              break;
            case 2:
              this.info.kind="西餐";
              break;
            case 3:
              this.info.kind="快餐";
              break;
            case 4:
              this.info.kind="甜品";
              break;
            case 5:
              this.info.kind="小吃";
              break;
            case 6:
              this.info.kind="其他";
              break;
          }
        }).catch(err => {
        console.log(err)
      });
    },
    methods:{
      passModification(){
        this.$axios.post('/modification/pass', {mid: localStorage.modificationId}).then(
          res => {
            if(res.data===true){
              this.$message({
                message: '通过成功',
                type: 'success'
              });
            }
            this.$router.replace("/manager/modifyAdmin");
          }).catch(err => {
          console.log(err)
        });
      },
      vetoModification(){
        this.$axios.post('/modification/veto', {mid: localStorage.modificationId}).then(
          res => {
            if(res.data===true){
              this.$message({
                message: '否决成功',
                type: 'success'
              });
            }
            this.$router.replace("/manager/modifyAdmin");
          }).catch(err => {
          console.log(err)
        });
      }
    }

  }
</script>

<style scoped>
  .photoPart{
    position: absolute;
    right: 32%;
    top: 180px;
  }

  #photo{
    width: 120px;
    height: 120px;
  }

  .certificatePart{
    margin-top: 50px;
    margin-left: 60px;
  }

  #certificate{
    width: 400px;
    height: 250px;
  }
</style>
