<template>
  <div style="width: 100%">
    <div slot="header" class="clearfix" style="padding-bottom:16px;border-bottom: 1px solid #ebeef5">
      <h4>申请修改</h4>
      <el-button style="float: right; padding: 3px 0" type="text" @click="applyForModification()" :disabled="disabled">申请</el-button>
    </div>
    <div style="padding-left: 5%;font-size: 16px;margin-top: 50px" id="mainPart" v-if="canModify">
      <p>名称：<el-input v-model="name" placeholder="餐厅名长度2-15" style="width: 180px"></el-input></p><br>
      <p>密码：<el-input v-model="password" type="password" placeholder="请输入密码,长度6-15" style="width: 180px"></el-input></p><br>
      <p>类型：
        <el-select v-model="kind" placeholder="请选择">
          <el-option
            v-for="item in kindOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </p><br>
      <p>地址：</p>
      <location-selector ref="loc" @addressSelected="addressSelected(arguments)"></location-selector>
      <pics-uploader ref="pics"></pics-uploader>

    </div>
  </div>
</template>

<script>
  import LocationSelector from "../components/locationSelector";
  import picsUploader from "../components/picsUploader"
  export default {
    name: "editRestaurantInfo",
    components: {LocationSelector, picsUploader},
    data(){
      return{
        kindOptions: [{
          value: '中餐',
          label: '中餐'
        }, {
          value: '西餐',
          label: '西餐'
        }, {
          value: '快餐',
          label: '快餐'
        }, {
          value: '甜品',
          label: '甜品'
        }, {
          value: '小吃',
          label: '小吃'
        }, {
          value: '其他',
          label: '其他'
        }],
        rid: 0,
        kind: '',
        name: '',
        password:'',
        photoSrc: '',
        certificateSrc: '',
        location: '',
        region: '',
        disabled: false,
        canModify: true
      }
    },
    beforeCreate(){
      this.$axios.post("/modification/hasModification",
        {"rid":localStorage.rid}
      ).then(res => {
        let data=res.data;
        console.log(data);
        if(data===true) {
          this.disabled = true;
          this.canModify=false;
          this.$message({
            message: "修改审核中，不可重复提交",
            type: "warning"
          });
        }else if(data===false){
          this.$axios.post('/restaurant/getRestaurantDetail', {rid: localStorage.rid}).then(
            res => {
              let data=res.data;
              this.rid=data.rid;
              this.name=data.name;
              this.password=data.password;
              this.$refs.pics.photoSrc=data.photo;
              this.$refs.pics.certificateSrc=data.certificate;
              this.$refs.loc.newAddress=data.location;
              this.location=data.location;
              this.region=data.region;
              switch(data.kind){
                case 1:
                  this.kind="中餐";
                  break;
                case 2:
                  this.kind="西餐";
                  break;
                case 3:
                  this.kind="快餐";
                  break;
                case 4:
                  this.kind="甜品";
                  break;
                case 5:
                  this.kind="小吃";
                  break;
                case 6:
                  this.kind="其他";
                  break;
              }
            }).catch(err => {
            console.log(err)
          });
        }

      }).catch(err => {
        console.log(err)
      });

    },
    methods:{
      addressSelected(msg) {
        this.location=msg[0];
        this.region=msg[1];
      },
      applyForModification(){
        if(this.name.length<2||this.name.length>15){
          this.$message({
            message: "名称长度不符",
            type: "error"
          });
          return;
        }else if(this.password.length<6||this.password.length>15){
          this.$message({
            message: "密码长度不符",
            type: "error"
          });
          return;
        }else if(this.location===""){
          this.$message({
            message: "地址不得为空",
            type: "error"
          });
          return;
        }
        this.photoSrc=this.$refs.pics.photoSrc;
        this.certificateSrc=this.$refs.pics.certificateSrc;

        this.$axios.post("/modification/apply",
          {"rid": this.rid, "name":this.name, "password": this.password,"kind":this.kind,"location":this.location,"region":this.region, "photo": this.photoSrc, "certificate": this.certificateSrc}
        ).then(res => {
          let data=res.data;
          console.log(data);
          if(data===false){
            this.$message({
              message: "申请失败",
              type: "error"
            });
          }else if(data===true){
            this.$message({
              message: '申请成功，等待审核',
              type: 'success'
            });
            this.$router.replace('/restaurant/restaurantCenter');
          }
        }).catch(err => {
          console.log(err)
        });
      },
    }
  }
</script>

<style scoped>
  h4{
    margin: 0;
    display: inline-block;
  }

</style>
