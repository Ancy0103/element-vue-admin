<!--
  分页组件
  total: 数据总条数，必传
  isPageOne：是否返回组件默认值（分页组件所有默认值：第一页，一页展示10条数据），默认值为false,代表不返回,true为返回。
  pageInfo：正常情况不需要传，有需要记录分页信息的时候传，比如有详情页，跳转详情时需要记录此时的分页信息，返回时需要查询出此时的数据
-->
<template>
  <el-row :gutter="24" class="pagination">
    <el-col :span="22" :offset="1">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pageInfo.pageIndex"
        :page-sizes="pagesizes"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      required: true
    },
    isPageOne: {
      type: Boolean,
      default: false,
      required: true
    },
    pageInfo: {
      type: Object,
      default: function () {
        return {pageIndex: 1, pageSize: 10};
      }
    }
  },
  data() {
    return {
      pagesizes: [10, 20, 50, 100],
      // pageInfo: {
      //   pageIndex:1,
      //   pageSize:10,
      // }
    };
  },
  methods: {
    handleSizeChange(val) {
      // 每页显示条数改变时
      this.pageInfo.pageSize = val;
      this.pageInfo.pageIndex = 1;
      this.$emit('getList', this.pageInfo);
    },
    handleCurrentChange(val) {
      // 当前页码改变时
      this.pageInfo.pageIndex = val;
      this.$emit('getList', this.pageInfo);
    },
    pageOne() {
      // 回到第一页
      // this.pageInfo.pageSize = 10;
      this.pageInfo.pageIndex = 1;
      this.$emit('getList', this.pageInfo);
    }
  },
  watch: {
    isPageOne: 'pageOne'
  }
};
</script>

<style scoped lang="less">
  .pagination {
    margin-top: 20px;
    .el-pagination {
      float: right;
    }
  }
</style>
