<template>
  <div style="width: 100%;text-align: center">
    <h1 style="color: lightskyblue; margin-top: 50px">单品管理</h1>
    <el-card class="box-card" style="width: 56%; vertical-align: top;display: inline-block; min-height: 540px; margin-top: 30px;margin-bottom: 30px">
      <el-table
        :data="commodities"
        stripe
        height="540"
        style="overflow-x: hidden">
        <el-table-column
          fixed
          label="ID"
          width="50"
          prop="cid">
        </el-table-column>
        <el-table-column
          fixed
          label="名称"
          prop="name">
        </el-table-column>
        <el-table-column
          fixed
          label="类型"
          width="80"
          prop="kind">
        </el-table-column>
        <el-table-column
          fixed
          label="单价"
          width="80"
          prop="price">
        </el-table-column>
        <el-table-column
          fixed
          label="销量"
          width="80"
          prop="sold">
        </el-table-column>
        <el-table-column
          fixed
          label="状态"
          width="80"
          prop="state">
        </el-table-column>
        <el-table-column
          fixed
          label="操作">
          <template slot-scope="scope">
            <el-button @click="checkDetail(scope.$index, scope.row)" type="text" size="small">详情</el-button>
            <el-button @click="invalidate(scope.row)" type="text" size="small" v-if="scope.row.ifValid === true">下架</el-button>
            <el-button @click="validate(scope.row)" type="text" size="small" v-else>上架</el-button>
            <el-button @click="deleteRow(scope.$index, scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card style="margin-left: 5%; display: inline-block; width: 22%;padding: 20px; margin-top: 30px">
      <p v-if="cid >= 0" style="color: lightgray;float: left">ID：{{cid}}</p>
      <div class="photoPart">
        <input type="file" class="photoChoose" id="photoChoose" accept="image/png,image/jpg,image/gif,image/JPEG" style="display: none;"/>
        <label for="photoChoose">
          <img id="photo" :src="photoSrc">
        </label>
        <p style="color: lightgray">点击上传商品照片</p>
      </div>
      <el-input v-model="name" placeholder="请输入商品名" maxlength="10" minlength="2"@blur="checkSameName" id="name"></el-input>
      <p style="color: red; margin-bottom: -14px" v-show="hasSameName"><i  class="el-icon-error"></i>有同名商品，请修改名称！</p>
      <el-input v-model="price" placeholder="请输入价格" maxlength="8" minlength="1" onkeyup="value=value.replace(/[^\d.]/g, '').replace(/^\./g, '').replace(/\.{2,}/g, '.').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')" style="margin-top: 20px"></el-input>
      <el-select v-model="kind" placeholder="请选择类型" style="margin-top: 20px">
        <el-option
          v-for="item in kindOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 5}"
        placeholder="请输入描述"
        v-model="description"
        maxlength="30"
        style="margin-top: 20px">
      </el-input>
      <el-button round style="margin-top: 30px" @click="addCommodity">保存单品</el-button><br>
      <a style="padding-top: 10px;cursor: pointer" @click="clear" v-if="cid >= 0">返回</a>
    </el-card>
  </div>
</template>

<script>
    export default {
        name: "commodityAdmin",
      data(){
          let that=this;
        return{
          cid:-1,
          name:"",
          price:"",
          kind:"",
          description:"",
          photoSrc: '/static/pic/defaultLackPic.png',
          commodities: [

          ],

          kindOptions: [{
            value: '主食',
            label: '主食'
          }, {
            value: '小食',
            label: '小食'
          }, {
            value: '饮品',
            label: '饮品'
          }, {
            value: '其他',
            label: '其他'
          }],
          hasSameName:false
        }
      },
      mounted() {
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
        this.$axios.post('/commodity/getCommodities',{rid: localStorage.rid}).then(
          res => {
            this.commodities=res.data;
            console.log(this.commodities);
          }).catch(err => {
          console.log(err)
        });

      },
      methods:{
          addCommodity(){
            if(this.name===''||this.price===''||this.amount===''||this.beginDate===''||this.endDate===''||this.kind===''){
              this.$message({
                message: '请将信息填写完整',
                type: 'error'
              });
              return;
            }
            this.price=Number(this.price).toFixed(2);
            this.$axios.post('/commodity/saveCommodity',{"cid":this.cid,"rid": parseInt(localStorage.rid), "name": this.name, "price": this.price, "kind": this.kind, "photo":this.photoSrc, "description":this.description}).then(
              res => {
                if(res.data>0){
                  this.$message({
                    message: '添加成功',
                    type: 'success'
                  });
                  this.$axios.post('/commodity/getCommodities',{rid: localStorage.rid}).then(
                    res => {
                      let data=res.data;
                      for(let item of data){
                        item.disabled=Date.parse(item.beginDate) <  Date.now();
                      }
                      this.commodities=data;

                    }).catch(err => {
                    console.log(err)
                  });
                }else if(res.data===-2){
                  this.$message({
                    message: '同期有重名商品，添加失败',
                    type: 'error'
                  });
                }else{
                  this.$message({
                    message: '添加失败',
                    type: 'error'
                  });
                }
              }).catch(err => {
              console.log(err)
            });
            //this.clear();
          },
          clear(){
            this.cid=-1;
            this.name="";
            this.photo="https://njuhzl.oss-cn-hangzhou.aliyuncs.com/yummy/defaultLackPic.png";
            this.kind="";
            this.price="";
            this.description="";
          },
        deleteRow: function(index, row) {
          this.$axios.post('/commodity/deleteCommodity',{cid: row.cid}).then(
            res => {
              if(res.data===1){
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
                this.commodities.splice(index, 1);
              }else if(res.data===-1){
                this.$message({
                  message: '商品已在套餐中，不可删除',
                  type: 'error'
                });
              }

            }).catch(err => {
            console.log(err)
          });
        },
        validate(row){
          this.$axios.post('/commodity/validate',{cid: row.cid}).then(
            res => {
              if(res.data===true){
                this.$message({
                  message: '成功上架',
                  type: 'success'
                });
                row.ifValid=true;
                row.state="销售中";
              }else{
                this.$message({
                  message: '上架失败',
                  type: 'error'
                });
              }

            }).catch(err => {
            console.log(err)
          });
        },
        invalidate(row){
          this.$axios.post('/commodity/invalidate',{cid: row.cid}).then(
            res => {
              if(res.data===true){
                this.$message({
                  message: '成功下架',
                  type: 'success'
                });
                row.ifValid=false;
                row.state="已下架";
              }else{
                this.$message({
                  message: '商品已在套餐中，下架失败',
                  type: 'error'
                });
              }

            }).catch(err => {
            console.log(err)
          });
        },
        checkDetail(index, row){
            this.name=row.name;
            this.cid=row.cid;
            this.price=row.price;
            this.photoSrc=row.photo;
            this.kind=row.kind;
            this.description=row.description;
        },
        checkSameName(){
          this.$axios.post('/commodity/hasSameName',{rid:localStorage.rid, cid: this.cid,name: this.name}).then(
            res => {
              if(res.data===true){
                $("#name").focus();
                this.hasSameName=true;
              }else{
                this.hasSameName=false;
              }

            }).catch(err => {
            console.log(err)
          });
        },

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
    position: relative;
    clear: left;
  }

  #photo{
    width: 90px;
    height: 90px;
    cursor: pointer;
  }
</style>
