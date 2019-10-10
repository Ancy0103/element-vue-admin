<!--码卷对比-->
<template>
  <div class="main-container">
    <!--筛选-->
    <div title="筛选">
      <el-form ref="queryForm" :model="queryForm" inline label-width="80px" slot="titleContent">
        <el-form-item label="喷码机">
          <el-select v-model="queryForm.machineId" placeholder="请选择喷码机" clearable size="small">
            <el-option v-for="item in machCodeList" :value="item" :key="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间段">
          <el-date-picker
            size="small"
          v-model="queryForm.date"
          type="daterange"
          unlink-panels
          :clearable="false"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="统计类型">
          <el-select v-model="queryForm.type" placeholder="请选择统计类型" size="small">
            <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="primary" @click="query" size="small">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--表格展示-->
    <queryTable :dataList="tableData" :labelList="tableLabel" :isLoading="loading" :changeList="changeList">
      <el-table-column label="操作" slot="operator">
        <template slot-scope="scope">
          <el-tooltip content="明细" placement="top" slot="operator">
            <el-button type="text" size="medium" @click="detail(scope.row)">
              <i class="iconfont icon-xiangqing1"></i>
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </queryTable>
    <!--分页-->
    <pagination :total="total" :isPageOne="isPageOne" :pageInfo="pageInfo" @getList="loadList"></pagination>
  </div>
</template>

<script>
import queryTable from '@/components/common/queryTable.vue';
import pagination from "@/components/common/pagination";
import api from '@/api/apiConfig';
export default {
  components: {
    queryTable,
    pagination,
  },
  data() {
    return {
      //查询表单
      queryForm: {
        machineId: '',
        date: [new Date(new Date().getTime() - 3600 * 1000 * 24 * 90), new Date()],
        type: ''
      },
      // 提交表单（保存查询时的查询条件）
      submitForm: '',
      //喷码机列表
      machCodeList: [],
      // 统计类型列表
      typeList: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '数据不存在',
          value: 1
        },
        {
          label: '数据不在同一列',
          value: 2
        },
      ],
      changeList: {
        propList: ['status'], //有几个值下面就应该对应的有几个～List
        statusList: [
          {
            label: '待处理',
            value: 1
          },
          {
            label: '已处理',
            value: 2
          },
          {
            label: '已处理',
            value: 3
          },
        ]
      },
      // 表头及对应字段
      tableLabel: {
        operateDate: '日期',
        machineId: '机器',
        // blowHead: '喷头',
        // collectHead: '采集头',
        bundleNo: '卷号',
        notExistNum: '不存在',
        notSameColumnNum: '不在同列',
        status: '状态'
      },
      // 展示数据
      tableData: [],
      // loading展示
      loading: false,
      // 分页是否返回第一页
      isPageOne: false,
      // 分页需要的总数据条数
      total: 0,
      // 标注需要的数据
      sloganObj: {},
      // 保存分页信息（一般不需要，这里为了使详情页返回来的时候数据仍然不变，没有详情页的时候不需要写此分页信息）
      pageInfo: {
        pageIndex: 1,
        pageSize: 10
      }
    };
  },
  mounted() {
    // 获取统计类型列表数据
    // this.getMachCodeList();
  },
  methods: {
    query() {
      // 查询触发
      // 保存查询条件
      this.submitForm = {
        machineId: this.queryForm.machineId,
        startDt: this.queryForm.date[0] ? this.$moment(this.queryForm.date[0]).format('YYYY-MM-DD') : '',
        endDt: this.queryForm.date[1] ? this.$moment(this.queryForm.date[1]).format('YYYY-MM-DD') : '',
        statisticType: this.queryForm.type,
      };
      // 每次查询分页显示返回第一页，并更新数据(为了触发分页组件的watch,执行loadList)
      // this.isPageOne = !this.isPageOne;
    },
    detail(row) {
      // 需要保存的数据，为了使详情页返回后数据仍然存在（返回后的查询条件）
      let detailInfo = {
        queryForm: {...this.queryForm},
        submitForm: {...this.submitForm},
        detail: {...row}, // detail跳转到详情页后使用
        page: {...this.pageInfo}
      };
      localStorage.setItem('codeConstrastDetail', JSON.stringify(detailInfo));
      // 路由跳转
      this.$router.push('codeConstrast_detail');
    },
    async loadList(info) {
      // 刷新表格数据列表
      this.loading = true;
      // 获取数据
      const { data, message, retCode } = await api.query('/code/compare/list', {...info, ...this.submitForm});
      if (retCode === '0000') {
        this.tableData = data.list.rows;
        this.sloganObj = data.statistic;
        this.total = data.list.records;
      } else {
        message ? this.$message.error(`${message}`) : this.$message.error('服务端出错，查询失败，请稍后再试!');
      }
      this.loading = false;
    },
    async getMachCodeList() {
      // 获取喷码机列表
      const { data, message, retCode } = await api.query('/code/compare/blowMachineList', {});
      if (retCode === '0000') {
        this.machCodeList = data;
      } else {
        message ? this.$message.error(`${message},喷码机列表获取失败`) : this.$message.error('服务端出错，喷码机列表获取失败！');
      }
    }
  },
  beforeRouteEnter(to, from, next){
    // 判断是否是详情页返回
    if (from.name === 'codeConstrastDetail') {
      next(($this)=>{ //参数$this就是当前组件的实例。
        const {queryForm, submitForm, page} = JSON.parse(localStorage.getItem("codeConstrastDetail"));
        $this.queryForm = queryForm;
        $this.submitForm = submitForm;
        $this.submitForm = submitForm;
        $this.loadList(page);
      });
    } else {
      next(($this)=>{
        // 执行查询，查询数据
        $this.query();
      });
    }
  },
};
</script>

<style scoped lang="less">
  .main-container {
    padding: 20px;
    .slogan {
      display: inline-block;
      margin-left: 22px;
      color: #606266;
      i {
        margin: 0 3px;
        color: #409eff;
      }
    }
  }
</style>
