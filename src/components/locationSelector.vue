<template>
  <div style="width: 100%">
    <div class="block" style="padding-left: 20px">
      <span class="demonstration" style="font-size: 14px">省份/城市/地区</span>
      <el-cascader
        :options="areas"
        v-model="selectedArea"
        @change="handleAreaSelect"
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
      style="min-width: 600px;margin-top: 20px">
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
            this.$axios.post('/address/getSimilarLocations', {keyword: this.selectedArea[2]+query, area: this.selectedArea[1]}).then(
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
            location=location+this.selectedArea[i];
            if (this.selectedArea.length===i+2){
              region=this.selectedArea[i];
              console.log(region);
            }
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
