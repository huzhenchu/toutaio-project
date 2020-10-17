<template>
<div class="article_container">
  <el-card>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="article_form">
      <el-form ref="form" :model="form" label-width="50px">
        <el-form-item label="状态">
          <el-radio-group v-model="form.resource">
            <el-radio label="全部"></el-radio>
            <el-radio label="草稿"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>
            <el-radio label="已删除"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="频道">
          <el-select v-model="form.region" placeholder="请选择频道">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="日期">
          <el-date-picker v-model="form.data1" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00']">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">筛选</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>

  <el-card>
    <div class="article_table">
      <div class="article_table_title">根据筛选条件共查询到 {{ tableTotal }} 条结果：</div>
      <el-table :data="tableData" style="width: 100%" stripe>
        <el-table-column prop="date" label="封面" width="180">
        </el-table-column>
        <el-table-column prop="title" label="标题" width="180">
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template>
            <el-tag type="success">标签二</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间">
        </el-table-column>
        <el-table-column prop="address" label="操作">
        </el-table-column>
      </el-table>
      <div class="article_pagination">
        <el-pagination layout="prev, pager, next" :total="10000" background>
        </el-pagination>

      </div>
    </div>
  </el-card>

</div>
</template>

<script>
import {
  getUsertableInfo
} from "@/api/article.js";
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        delivery: false,
        type: [],
        resource: "1",
        desc: ""
      },
      tableTotal: 4466,
      tableData: [],
      currentPage4: 4
    };
  },
  created() {
    this.getTable();
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },

    getTable() {
      getUsertableInfo().then(res => {
        console.log(res);
        this.tableData = res.data.data.results
        this.tableTotal = res.data.data.total_count
      });
    }
  }
};
</script>

<style lang="less" scoped>
.article_container {
  .article_form {
    margin-top: 15px;
    border-top: 1px solid #eee;
  }

  .el-card {
    margin-top: 25px;

    .article_table {
      overflow: hidden;

      .el-table {
        margin-top: 20px;
        border-top: 1px solid #eee;
        margin-bottom: 20px;
      }

      .article_pagination {
        float: right;
      }
    }
  }
}
</style>
