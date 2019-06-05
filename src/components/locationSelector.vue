<template>
  <div style="width: 100%;padding: 30px">
    <div class="block" style="width: 100%; display: flex; align-items: center; justify-content: space-between">
      <span class="demonstration" style="font-size: 14px;">省份/城市/地区</span>
      <el-cascader
        :options="areas"
        v-model="selectedArea"
        @change="handleAreaSelect"
        style="width: 66%"
      >
      </el-cascader>
    </div>
    <el-select
      v-model="newAddress"
      filterable
      remote
      reserve-keyword
      suffix-icon="el-icon-search"
      placeholder="请输入地址"
      :remote-method="remoteMethod"
      :loading="loading"
      :disabled="disabled"
      @change="addressSelected"
      style="min-width: 400px;margin-top: 20px;width: 100%">
      <el-option
        v-for="item in options"
        :key="item"
        :value="item">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  import options from '../../static/js/country-data.js'

    export default {
        name: "locationSelector",
      data(){
          return{
            options: [],
            newAddress: "",
            list: [],
            loading: false,
            areas:options,
            selectedArea: [],
            disabled: true
          }
      },
      methods:{
        remoteMethod(query) {
          if (query !== '') {
            this.loading = true;
            let area=this.selectedArea[1]==="市辖区"? this.selectedArea[0]: this.selectedArea[1];
            this.$axios.post('/address/getSimilarLocations', {keyword: this.selectedArea[2]+query, area: area}).then(
              res => {
                this.options = res.data;
                console.log(this.options);
                this.loading = false;
              }).catch(err => {
              this.loading = false
            });
          } else {
            // this.options = [];
          }
        },
        addressSelected(value) {
          let location="";
          let region="全国";
          for(let i=0;i<this.selectedArea.length;i++){
            if(this.selectedArea[i]!=="市辖区"){
              location=location+this.selectedArea[i];
            }
          }
          if (this.selectedArea[1]!=="市辖区"){
            region=this.selectedArea[1];
          }else{
            region=this.selectedArea[0];
          }
          location=location+value;
          this.$parent.addressSelected(location, region);
        },

        handleAreaSelect(value) {
          //console.log(value);
          this.disabled=false;
          this.newAddress="";
        }
      }
    }
</script>

<style scoped>

</style>
