<template>
  <div style="width: 100%;text-align: center">
    <h1 style="color: lightskyblue; margin-top: 50px">套餐管理</h1>
    <el-card class="box-card" style="width: 56%; vertical-align: top;display: inline-block; min-height: 500px; margin-top: 30px;margin-bottom: 30px">
      <el-table
        :data="packages"
        stripe
        height="500"
        style="overflow-x: hidden">
        <el-table-column
          fixed
          label="名称"
          width="120"
          prop="name">
        </el-table-column>
        <el-table-column
          fixed
          label="价格"
          width="80"
          prop="price">
        </el-table-column>
        <el-table-column
          fixed
          label="起始时间"
          width="100"
          prop="beginDate">
        </el-table-column>
        <el-table-column
          fixed
          label="结束时间"
          width="100"
          prop="endDate">
        </el-table-column>
        <el-table-column
          fixed
          label="包含商品">
          <template slot-scope="scope">
            <el-popover v-for="(item,index) in scope.row.items" :key="index" trigger="hover" placement="top" style="display: inline-block; margin-right: 2px">
              <p>名称: {{ item.name }}</p>
              <p>单价: {{ item.price }}</p>
              <p>类型: {{ item.kind }}</p>
              <p>数量: {{ item.num }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ item.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          fixed
          label="操作"
          width="80">
          <template slot-scope="scope">
            <el-button @click="deleteRow(scope.$index, scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card style="margin-left: 5%; display: inline-block; width: 22%;padding: 20px; margin-top: 30px">
      <el-input v-model="name" placeholder="请输入套餐名" maxlength="10" minlength="2"></el-input>
      <el-input v-model="price" placeholder="请输入价格" maxlength="8" minlength="1" onkeyup="value=value.replace(/[^\d.]/g, '').replace(/^\./g, '').replace(/\.{2,}/g, '.').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')" style="margin-top: 20px"></el-input>
      <el-popover v-for="(item,name) in items" v-bind:key="name" trigger="hover" placement="top" style="display: inline-block; margin-right: 2px; margin-top: 10px">
        <p>名称: {{ item.name }}</p>
        <p>单价: {{ item.price }}</p>
        <p>类型: {{ item.kind }}</p>
        <p>数量: {{ item.num }}</p>
        <div slot="reference" class="name-wrapper">
          <el-tag size="medium">{{ item.name }}</el-tag>
          <i class="el-icon-circle-close" style="color: lightgrey;cursor: pointer;font-size: 15px;z-index:10; vertical-align: 8px; margin-left: -12px" @click="deleteItem(item.name)"></i>
        </div>
      </el-popover>
      <el-input v-model="num" placeholder="请输入新增单品数量" maxlength="3" minlength="1" onkeyup="value=value.replace(/[^\d]/g,'')" style="margin-top: 20px"></el-input>
      <el-select v-model="selectedCommodity" value-key="cid" placeholder="请选择单品" style="margin-top: 20px" @change="addItem">
        <el-option
          v-for="item in options"
          :key="item.cid"
          :label="item.name"
          :value="item">
        </el-option>
      </el-select>
      <el-button round style="margin-top: 30px" @click="addPackage">添加套餐</el-button>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "packageAdmin",
    data(){
      let that=this;
      return{
        name:"",
        price:"",
        newItem:{},
        selectedCommodity: {},
        beginDate:"",
        endDate:"",
        num:"1",
        packages: [
          {
            name: "套餐一",
            price:70,
            beginDate: "2019-02-15",
            endDate: "2019-02-18",
            items: [{
              piid:-1,
              name: "海鲜意面",
              kind:"主食",
              price: 28,
              num: 2,
            },{
              piid:-2,
              name: "肉酱意面",
              kind:"主食",
              price: 26,
              num: 1
            }]
          }
        ],
        items: [],
        options: [],
      }
    },
    mounted() {
      this.$axios.post('/package/getPackages',{rid: localStorage.rid}).then(
        res => {
          this.packages=res.data;
        }).catch(err => {
        console.log(err)
      });
      this.$axios.post('/package/getOptions',{rid: localStorage.rid}).then(
        res => {
          this.options=res.data;
        }).catch(err => {
        console.log(err)
      });
    },
    methods:{
      addItem(){
        this.newItem={};
        this.newItem.num=parseInt(this.num);
        this.newItem.name=this.selectedCommodity.name;
        this.newItem.kind=this.selectedCommodity.kind;
        this.newItem.cid=this.selectedCommodity.cid;
        this.newItem.price=this.selectedCommodity.price;
        this.items.push(this.newItem);
      },

      deleteItem(name){
        console.log(name);
        for(let i=0;i<this.items.length;i++){
          if(this.items[i].name===name){
            this.items.splice(i,1);
          }
        }
      },

      addPackage(){
        if(this.name===''||this.price===''||this.items===[]){
          this.$message({
            message: '请将信息填写完整',
            type: 'error'
          });
          return;
        }
        this.price=Number(this.price).toFixed(2);
        this.$axios.post('/package/addPackage',{"rid": parseInt(localStorage.rid), "name": this.name, "price": this.price, "beginDate": this.beginDate, "endDate": this.endDate, "items":this.items}).then(
          res => {
            if(res.data===true){
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              this.$axios.post('/package/getPackages',{rid: localStorage.rid}).then(
                res => {
                  this.packages=data;
                }).catch(err => {
                console.log(err)
              });
            }else {
              this.$message({
                message: '同期存在同名套餐，添加失败',
                type: 'error'
              });
            }
          }).catch(err => {
          console.log(err)
        });
        //this.clear();
      },
      clear(){
        this.name="";
        this.price="";
        this.amount="";
        this.beginDate="";
        this.endDate="";
      },
      deleteRow: function(index, row) {
        this.$axios.post('/package/deletePackage',{pid: row.pid}).then(
          res => {
            if(res.data===true){
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.packages.splice(index, 1);
            }else{
              this.$message({
                message: '删除失败',
                type: 'error'
              });
            }

          }).catch(err => {
          console.log(err)
        });
      },

    }
  }
</script>

<style scoped>

</style>
