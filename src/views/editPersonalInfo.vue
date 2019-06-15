<template>
  <div style="width: 100%">
    <div slot="header" class="clearfix" style="padding-bottom:16px;border-bottom: 1px solid #ebeef5">
      <h4>个人信息</h4>
      <el-button style="float: right; padding: 3px 0" type="text" @click="savePersonalInfo()">保存</el-button>
    </div>
    <div style="padding-left: 5%;font-size: 16px;margin-top: 50px">
      <p>昵称：<el-input v-model="info.name" placeholder="请输入昵称,长度2-10" style="width: 180px"></el-input></p><br>
      <p>邮箱：{{info.email}}</p><br>
      <p>密码：<el-input v-model="info.password" type="password" placeholder="请输入密码,长度6-15" style="width: 180px"></el-input></p><br>
      <p>等级：{{info.level}}</p><br>
      <p>电话：<el-input v-model="info.phone" placeholder="请输入电话" style="width: 150px"></el-input></p><br>
      <p>地址：</p>
      <el-table
        :data="info.addresses"
        border>
        <el-table-column
          fixed
          label="地址"
          prop="location">
        </el-table-column>
        <el-table-column
          fixed
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="deleteRow(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <p style="font-size: 14px;margin-left: 10px;margin-top: 10px">新增地址:</p>
      <location-selector @addressSelected="addressSelected(arguments)"></location-selector>
    </div>
  </div>
</template>

<script>
  import locationSelector from '@/components/locationSelector.vue'

    export default {
        name: "editPersonalInfo",
      components:{locationSelector},
      data(){
        return{
          info:{
            uid: localStorage.uid,
            name:"Starink",
            email:"shiyifan198@163.com",
            level:3,
            phone:"18252605889",
            password:"123456",
            addresses:[
              {location:'江苏省南京市鼓楼区汉口路22号,南京大学陶园二舍'},
              {location:'江苏省南京市栖霞区仙林大道163号，南京大学学生宿舍1栋'}
            ]
          },
        }
      },
      mounted() {
        this.$axios.post('/user/getInfo', {uid: localStorage.uid}).then(
          res => {
            this.info=res.data;
          }).catch(err => {
          console.log(err)
        });
      },
      methods:{
        savePersonalInfo(){
          this.info.uid=localStorage.uid;
          console.log(this.info.uid);
          this.$axios.post("/user/saveInfo", this.info).then(res => {
            let data=res.data;
            console.log(data);
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.$router.replace('/user/personalCenter');
          }).catch(err => {
            this.$message({
              message: '修改失败',
              type: 'error'
            });
          });
        },
        deleteRow(row) {
          console.log(row);
          let index=this.find(row.location);
          console.log(index);
          this.info.addresses.splice(index,1);
        },
        addressSelected(msg) {
          if(this.find(msg[0])>=0){
            this.$message({
              message: "请勿重复添加",
              type: "error"
            });
          }else{
            this.info.addresses.push({tid:0,uid: parseInt(localStorage.uid),location:msg[0], region: msg[1]});
          }

        },
        find(value){
          for(let i=0;i<this.info.addresses.length;i++){
            if(this.info.addresses[i].location===value){
              return i;
            }
          }
          return -1;
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
