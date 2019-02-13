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
            <el-popover v-for="(item,name) in scope.row.items" v-bind:key="name" trigger="hover" placement="top" style="display: inline-block; margin-right: 2px">
              <p>名称: {{ item.name }}</p>
              <p>单价: {{ item.price }}</p>
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
            <el-button @click="deleteRow(scope.$index, scope.row)" type="text" size="small" :disabled="scope.row.disabled">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card style="margin-left: 5%; display: inline-block; width: 22%;padding: 20px; margin-top: 30px">
      <el-input v-model="name" placeholder="请输入套餐名" maxlength="7" minlength="2"></el-input>
      <el-input v-model="price" placeholder="请输入价格" maxlength="8" minlength="1" onkeyup="value=value.replace(/[^\d.]/g, '').replace(/^\./g, '').replace(/\.{2,}/g, '.').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')" style="margin-top: 20px"></el-input>
      <el-date-picker
        v-model="beginDate"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择起始日期"
        :picker-options="pickerOptions0"
        style="margin-top: 20px">
      </el-date-picker>
      <el-date-picker
        v-model="endDate"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择结束日期"
        :picker-options="pickerOptions1"
        style="margin-top: 20px">
      </el-date-picker>
      <el-popover v-for="(item,name) in items" v-bind:key="name" trigger="hover" placement="top" style="display: inline-block; margin-right: 2px; margin-top: 10px">
        <p>名称: {{ item.name }}</p>
        <p>单价: {{ item.price }}</p>
        <p>数量: {{ item.num }}</p>
        <div slot="reference" class="name-wrapper">
          <el-tag size="medium">{{ item.name }}</el-tag>
        </div>
      </el-popover>
      <el-select v-model="newItem" disabled placeholder="请选择" style="margin-top: 20px">
        <el-option
          v-for="item in options"
          :key="item"
          :value="item">
        </el-option>
      </el-select>
      <el-button round style="margin-top: 30px" @click="addCommodity">添加套餐</el-button>
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
        newItem:"",
        beginDate:"",
        endDate:"",
        packages: [
          {
            name: "套餐一",
            price:70,
            beginDate: "2019-02-15",
            endDate: "2019-02-18",
            items: [{
              name: "海鲜意面",
              price: 28,
              num: 2
            },{
              name: "肉酱意面",
              price: 26,
              num: 1
            }]
          }
        ],
        items: [],
        options: ["海鲜意面","肉酱意面"],

        pickerOptions0: {
          disabledDate(time) {
            if (that.endDate !== "") {
              return time.getTime() <= Date.now() || time.getTime() >= Date.parse(that.endDate);
            } else {
              return time.getTime() <= Date.now();
            }

          }
        },
        pickerOptions1: {
          disabledDate: (time) => {
            return time.getTime() <= Date.parse(that.beginDate) || time.getTime() <= Date.now();
          }
        },
      }
    },
    mounted() {
      this.$axios.post('/commodity/getPackages',{rid: localStorage.rid}).then(
        res => {
          let data=res.data;
          for(let item of data){
            item.disabled=item.beginDate <  Date.now();
          }
          this.packages=data;

        }).catch(err => {
        console.log(err)
      });
    },
    methods:{
      addCommodity(){
        if(this.name===''||this.price===''||this.amount===''||this.beginDate===''||this.endDate===''){
          this.$message({
            message: '请将信息填写完整',
            type: 'error'
          });
          return;
        }
        this.price=Number(this.price).toFixed(2);
        this.$axios.post('/commodity/saveCommodity',{"rid": parseInt(localStorage.rid), "cid":-1, "name": this.name, "price": this.price, "amount": this.amount, "beginDate": this.beginDate, "endDate": this.endDate, "sold": 0}).then(
          res => {
            if(res.data>0){
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              this.commodities.push({"rid": parseInt(localStorage.rid), "cid":res.data, "name": this.name, "price": this.price, "amount": this.amount, "beginDate": this.beginDate, "endDate": this.endDate, "sold": 0, "disabled": Date.now()>=Date.parse(this.beginDate)});
            }else {
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
        this.name="";
        this.price="";
        this.amount="";
        this.beginDate="";
        this.endDate="";
      },
      clearNoNum(){
        console.log("a");
        console.log(this.price);
        this.price = this.price.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
        this.price = this.price.replace(/^\./g,""); //验证第一个字符是数字
        this.price = this.price.replace(/\.{2,}/g,"."); //只保留第一个, 清除多余的
        this.price = this.price.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
        this.price = this.price.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); //只能输入两个小数
        console.log("b");
      },
      deleteRow: function(index, row) {
        this.$axios.post('/commodity/deleteCommodity',{cid: row.cid}).then(
          res => {
            if(res.data===true){
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.commodities.splice(index, 1);
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
