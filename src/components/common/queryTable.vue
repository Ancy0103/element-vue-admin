/**
  数据展示table组件
  dataList: 展示的数据数组
  changeList: 需要key值转value值的prop组成的数据。
  例：changeList: {
    propList: ['a'],//有几个值下面就应该对应的有几个aList。例如prop为status需要处理，则propList:['status']
    aList: [{}{}],//有机种值就有几个对象，如：status的值有1：待处理2：已处理 应该为statuslist[{'***':1,'***':'待处理'}{'***':2,'***':'未处理'}]
  },。
  labelList: 表头以及对应字段,必须为对象
  isBatch: 是否需要批量操作（true/false,默认为false（不需要），为true时，必须绑定batchOperator事件）
  isLoading: 是否需要loading
**/
<template>
  <el-table :data="dataList" v-loading="isLoading" element-loading-text="拼命加载中,请稍候……" element-loading-spinner="el-icon-loading" tooltip-effect="dark" style="width:100%;" border @selection-change="selectionChange">
    <el-table-column type="selection" v-if="isBatch"></el-table-column>
    <el-table-column v-for="(value, key, index) in labelList" :label="value" :key="index">
      <template slot-scope="scope">
        <span v-if="changeList&&changeList.propList.indexOf(key)!==-1">{{ keySwitchValue(scope.row[key],changeList[`${key}List`])}}</span>
        <span v-else>{{ scope.row[key] }}</span>
      </template>
    </el-table-column>
    <!--所有的操作按钮放到这里-->
    <slot name="operator"></slot>
  </el-table>
</template>

<script>
import { keySwitchValue } from "@/helper/common.js";
export default {
  props: {
    // 数据
    dataList: {
      type: Array,
    },
    // 是否需要批量操作
    isBatch: {
      type: Boolean,
      default: false,
    },
    // 表头
    labelList: {
      type: Object
    },
    // loading状态
    isLoading: {
      type: Boolean,
      default: false,
    },
    // 需要转换显示格式的字段组成的数组
    changeList: {
      type: Object,
      function () {
        return {};
      }
    },
  },
  data() {
    return {
      keySwitchValue: keySwitchValue
    };
  },
  methods: {
    selectionChange(val) {
      // 批量选择
      this.$emit('batchOperator', val);
    },
  }
};
</script>

<style lang="less" scoped>
  .table-container {
    margin-top: 20px;
  }
</style>
