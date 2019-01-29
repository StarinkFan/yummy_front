<template>
  <div style="width: 100%">
    <div slot="header" class="clearfix" style="padding-bottom:16px;border-bottom: 1px solid #ebeef5">
      <h4>餐厅申请</h4>
      <el-button style="float: right; padding: 3px 0" type="text" @click="applyForRestaurant()">提交</el-button>
    </div>
    <div style="padding-left: 5%;font-size: 16px;margin-top: 50px" id="mainPart">
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
      <el-select
        v-model="newAddress"
        filterable
        remote
        reserve-keyword
        suffix-icon="el-icon-search"
        placeholder="请输入地址"
        :remote-method="remoteMethod"
        :loading="loading"
        style="min-width: 600px">
        <el-option
          v-for="item in options"
          :key="item.name"
          :value="item.name">
        </el-option>
      </el-select>

      <div class="photoPart">
        <input type="file" class="photoChoose" id="photoChoose" accept="image/png,image/jpg,image/gif,image/JPEG" style="display: none;" @change="previewPhoto"/>
        <label for="photoChoose">
          <img id="photo" :src="photoSrc">
        </label>
        <p>点击上传头像</p>
      </div>
      <div class="certificatePart">
        <input type="file" class="certificateChoose" id="certificateChoose" accept="image/png,image/jpg,image/gif,image/JPEG" style="display: none;" @change="previewCertificate"/>
        <label for="certificateChoose">
          <img id="certificate" :src="certificateSrc">
        </label>
        <p>点击上传营业资格证</p>
      </div>

    </div>
  </div>
</template>

<script>
    export default {
      name: "restaurantApply",
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
          kind: '',
          name: '',
          password:'',
          options: [],
          newAddress: "",
          list: [],
          loading: false,
          photoSrc: '/static/pic/defaultPhoto.jpg',
          certificateSrc: '/static/pic/defaultLackPic.png'
        }
      },
      methods:{
        remoteMethod(query) {
          if (query !== '') {
            this.loading = true;
            this.$axios.post('/personalCenter/getInfo', {keyword: query}).then(
              res => {
                this.options = res.data.list;
                this.loading = false;
              }).catch(err => {
              this.loading = false
            });
          } else {
            // this.options = [];
          }
        },

        previewPhoto(e){
          let _this = this;
          let files = e.target.files[0];
          if (!e || !window.FileReader) return;  // 看支持不支持FileReader
          let reader = new FileReader();
          reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
          reader.onloadend = function () {
            _this.photoSrc = this.result
          }
        },
        previewCertificate(e){
          let _this = this;
          let files = e.target.files[0];
          if (!e || !window.FileReader) return;  // 看支持不支持FileReader
          let reader = new FileReader();
          reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
          reader.onloadend = function () {
            _this.certificateSrc = this.result
          }
        }
      }
    }
</script>

<style scoped>
  h4{
    margin: 0;
    display: inline-block;
  }

  .photoPart{
    position: absolute;
    right: 15%;
    top: 120px;
  }

  #photo{
    width: 120px;
    height: 120px;
    cursor: pointer;
  }

  .certificatePart{
    margin-top: 50px;
    margin-right: 50px;
  }

  #certificate{
    width: 400px;
    height: 250px;
    cursor: pointer;
  }
</style>
