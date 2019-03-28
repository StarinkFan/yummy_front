<template>
  <div style="width: 100%">
    <div slot="header" class="clearfix" style="padding-bottom:16px;border-bottom: 1px solid #ebeef5">
      <h4>财务整理</h4>
    </div>
    <div style="padding-left: 5%;font-size: 16px;margin-top: 50px">
      <div id="timeChart" class="myChart"></div>
      <div id="timeChart2" class="myChart"></div>
      <div id="payChart" class="myChart"></div>
      <div id="restaurantChart" class="myChart"></div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "personalStatistics",
      data(){
          return{
            timeCounts:[],
            timeCounts2:[],
            payCounts:[],
            restaurantCounts:[]
          }
      },
      mounted(){
        this.$axios.post('/statistics/getPersonalCondition', {uid: localStorage.uid}).then(
          res => {
            let data=res.data;
            console.log(data);
            this.timeCounts=data.timeCounts;
            this.timeCounts2=data.timeCounts2;
            this.payCounts=data.payCounts;
            this.payCounts[0]={name:"30元及以下",value:this.payCounts[0]};
            this.payCounts[1]={name:"31-80元",value:this.payCounts[1]};
            this.payCounts[2]={name:"81-200元",value:this.payCounts[2]};
            this.payCounts[3]={name:"200元以上",value:this.payCounts[3]};
            this.restaurantCounts=data.restaurantCounts;
            this.restaurantCounts[0]={name:"中餐",value:this.restaurantCounts[0]};
            this.restaurantCounts[1]={name:"西餐",value:this.restaurantCounts[1]};
            this.restaurantCounts[2]={name:"快餐",value:this.restaurantCounts[2]};
            this.restaurantCounts[3]={name:"甜品",value:this.restaurantCounts[3]};
            this.restaurantCounts[4]={name:"小吃",value:this.restaurantCounts[4]};
            this.restaurantCounts[5]={name:"其他",value:this.restaurantCounts[5]};
            this.draw();
          }).catch(err => {
          console.log(err)
        });
      },
      methods:{
          draw(){
            let that=this;
            let timeChart = this.$echarts.init(document.getElementById('timeChart'));
            // 绘制图表
            timeChart.setOption({
              title: { text: '近三日成交订单数' },
              tooltip: {},
              xAxis: {
                data: ["前天","昨天", "今天"]
              },
              yAxis: {type: 'value'},
              series: [{
                data: that.timeCounts,
                type: 'line'
              }]
            });
            let timeChart2 = this.$echarts.init(document.getElementById('timeChart2'));
            // 绘制图表
            timeChart2.setOption({
              title: { text: '近三日退款订单数' },
              tooltip: {},
              xAxis: {
                data: ["前天","昨天", "今天"]
              },
              yAxis: {type: 'value'},
              series: [{
                data: that.timeCounts2,
                type: 'line'
              }]
            });
            let payChart = this.$echarts.init(document.getElementById('payChart'));
            // 绘制图表
            payChart.setOption({
              title : {
                text: '成交订单金额分布（折后）',
              },
              tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend: {
                orient: 'vertical',
                right: 'right',
                data: ['30元及以下','31-80元','81-200元',"200元以上"]
              },
              series : [
                {
                  type: 'pie',
                  radius : '55%',
                  center: ['50%', '60%'],
                  data:that.payCounts,
                  itemStyle: {
                    emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            });

            let restaurantChart = this.$echarts.init(document.getElementById('restaurantChart'));
            // 绘制图表
            restaurantChart.setOption({
              title : {
                text: '成交订单餐厅类型分布',
              },
              tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend: {
                orient: 'vertical',
                right: 'right',
                data: ['中餐','西餐','快餐',"甜品", "小吃", "其他"]
              },
              series : [
                {
                  type: 'pie',
                  radius : '55%',
                  center: ['50%', '60%'],
                  data:that.restaurantCounts,
                  itemStyle: {
                    emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            });
          }
      }
    }
</script>

<style scoped>
.myChart{
  width: 80%;
  min-height: 300px;
}
</style>
