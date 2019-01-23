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
        <input type="file" class="photoChoose" id="photoChoose" accept="image/png,image/jpg,image/gif,image/JPEG" style="display: none;" @change="uploadPhoto()"/>
        <label for="photoChoose">
          <img id="photo" :src="photoSrc">
        </label>
        <p>点击上传头像</p>
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
          photoSrc: '/static/pic/defaultPhoto.jpg'
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

        getObjectURL(file) {
          let url = null;
          if(window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(file);
          } else if(window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file);
          } else if(window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
          }
          return url;
        },
        submitPicture(url,data) {
          document.getElementById('photo').disable = true;
          //warming.style.display='block';
          if (url && data) {
            $.ajax({
              type: "post",
              url: url,
              async: true,
              data: data,
              //下面这两个要写成false，要不然上传不了。
              processData: false,
              contentType: false,
              success: function (dat) {
                // photoSrc=dat.photoSrc;
                // alert("上传成功");
                // //warming.style.display='none';
              },
              error: function () {
                // alert("上传失败");
                // document.getElementById("photo").style.backgroundImage="url('"+photoSrc+"')";

              }

            });
          } else {
            alert('数据格式不正确!');
          }
        },
        uploadPhoto(){
          //获取type=file的input
          let fileImg = $("#photoChoose")[0];
          //得到所有的图片列表
          let fileList = fileImg.files;
          let imgSrcI = this.getObjectURL(fileList[0]);

          //向文件名的数组末尾添加此文件名
          let imgName=fileList[0].name;
          //向路径的数组末尾添加路径
          let imgSrc=imgSrcI;
          //在文件流数组的末尾添加文件
          let imgFile=fileList[0];
          //将图片展示出去
          this.photoSrc=require("url("+imgSrc+")");
          console.log(this.photoSrc);

          let fd = new FormData();
          //由于fd对象中已经包含<input type='file'>的input标签，如果不删除，就会造成重复上传
          //将文件流循环添加到FormData对象中
          fd.append("file",imgFile);
          //上传所有的图片
          this.submitPicture('/editPersonalInformation/uploadPhoto', fd);
          // let nf = obj.cloneNode(true);
          // obj.parentNode.replaceChild(nf, obj);
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
</style>
