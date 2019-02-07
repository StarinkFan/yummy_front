<template>
    <div style="width: 100%;">
      <div class="photoPart">
        <input type="file" class="photoChoose" id="photoChoose" accept="image/png,image/jpg,image/gif,image/JPEG" style="display: none;"/>
        <label for="photoChoose">
          <img id="photo" :src="photoSrc">
        </label>
        <p>点击上传头像</p>
      </div>
      <div class="certificatePart">
        <input type="file" class="certificateChoose" id="certificateChoose" accept="image/png,image/jpg,image/gif,image/JPEG" style="display: none;"/>
        <label for="certificateChoose">
          <img id="certificate" :src="certificateSrc">
        </label>
        <p>点击上传营业资格证</p>
      </div>
    </div>
</template>

<script>
    export default {
        name: "picsUploader",
      data(){
        return{
          photoSrc: '/static/pic/defaultPhoto.jpg',
          certificateSrc: '/static/pic/defaultLackPic.png'
        }
      },
      mounted(){
        let that=this;
        $("#photoChoose").change(function(e){
          const file = e.target.files[0];
          const item = {
            name: file.name,
            size: file.size,
            file: file
          };
          that.html5Reader(file, item);
          that.submit(item, "p");
        });
        $("#certificateChoose").change(function(e){
          const file = e.target.files[0];
          const item = {
            name: file.name,
            size: file.size,
            file: file
          };
          that.html5Reader(file, item);
          that.submit(item, "c");
        });
      },
      methods:{
        html5Reader(file, item) {
          const reader = new FileReader();
          reader.onload = e => {
            this.$set(item, "src", e.target.result);
          };
          reader.readAsDataURL(file);
        },
        timestamp: function() {
          const time = new Date();
          const y = time.getFullYear();
          const m = time.getMonth() + 1;
          const d = time.getDate();
          const h = time.getHours();
          const mm = time.getMinutes();
          const s = time.getSeconds();
          const ms = time.getMilliseconds();
          return (
            "" +
            y +
            this.Add0(m) +
            this.Add0(d) +
            this.Add0(h) +
            this.Add0(mm) +
            this.Add0(s) +
            this.Add0(ms)
          );
        },

        Add0: function(m) {
          return m < 10 ? "0" + m : m;
        },
        submit(file, value) {
          let that = this;
          //console.log(that.photoSrc);
          let OSS = require("ali-oss");
          const client = new OSS({
            region: "oss-cn-hangzhou",
            accessKeyId: "LTAIL4RFw3fPAweH",
            accessKeySecret: "xOw4hzztNsCPm5LtJoWVwsvSOFl8IB",
            bucket: "njuhzl"
          });
          let f = file.file;
          console.log(f);
          const Name = f.name;
          console.log(Name);
          const suffix = Name.substr(Name.indexOf("."));
          const obj = this.timestamp();
          const storeAs = "yummy/" + obj + suffix; //  路径+时间戳+后缀名
          console.log(storeAs);
          client
            .multipartUpload(storeAs, f)
            .then(function(result) {
              let data = result.res.requestUrls[0];
              let url = data.split("?uploadId")[0];
              console.log(url);
              if(value==="p"){
                that.photoSrc=url;
              }else{
                that.certificateSrc=url;
              }
            })
            .catch(function(err) {
              console.log(err);
            });
        },
      }
    }
</script>

<style scoped>
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
