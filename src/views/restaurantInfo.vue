<template>
  <div style="width: 100%">
    <div slot="header" class="clearfix" style="padding-bottom:16px;border-bottom: 1px solid #ebeef5">
      <h4>餐厅信息</h4>
      <el-tag type="info" style="float: right; margin-top: -8px" v-if="hasModification">修改申请审核中</el-tag>
      <a href="/restaurant/restaurantCenter/editRestaurantInfo" v-else><el-button style="float: right; padding: 3px 0" type="text">修改</el-button></a>
    </div>
    <div style="padding-left: 5%;font-size: 16px;margin-top: 50px">
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
    </div>
  </div>
</template>

<script>
    export default {
        name: "restaurantInfo",
      data() {
        return {
          info: {
            kind: '',
            name: '',
            photo: '/static/pic/defaultPhoto.jpg',
            certificate: '/static/pic/defaultLackPic.png',
            location: ""
          },
          hasModification:true
        }
      },
      // beforeCreate(){
      //   this.$axios.post("/modification/hasModification",
      //     {"rid":localStorage.rid}
      //   ).then(res => {
      //     this.hasModification=res.data;
      //   }).catch(err => {
      //     console.log(err)
      //   });
      //
      // },
      mounted() {
        this.$axios.post("/modification/hasModification",
          {"rid":localStorage.rid}
        ).then(res => {
          this.hasModification=res.data;
        }).catch(err => {
          console.log(err)
        });
        this.$axios.post('/restaurant/getRestaurantDetail', {rid: localStorage.rid}).then(
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
    }
</script>

<style scoped>
  h4{
    margin: 0;
    display: inline-block;
  }

  .photoPart{
    position: absolute;
    right: 10%;
    top: 110px;
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
