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
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="频道">
          <el-select v-model="channelId" placeholder="请选择频道">
            <el-option v-for='item in channelsList' :key='item.id' :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="日期">
          <el-date-picker value-format='yyyy-MM-dd' format="yyyy-MM-dd" v-model="dataTime" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00']">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="loading" @click="getTable(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>

  <el-card>
    <div class="article_table">
      <div class="article_table_title">根据筛选条件共查询到 {{ totalData }} 条结果：</div>
      <el-table :data="tableData" v-loading="loading">
        <el-table-column prop="date" align="center" label="封面" width="180">
          <template slot-scope="scope">
            <!--
            <img v-if="scope.row.cover.images[0]" :src="scope.row.cover.images[0]" alt="" class="article-cover">
            <img v-else :src="img" alt="" class="article-cover">
            -->
            <el-image style="width: 100px; height: 100px" :src="scope.row.cover.images[0]" lazy fit="cover"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" align="center" label="标题" width="180">
        </el-table-column>
        <el-table-column prop="status" align="center" label="状态">
          <template slot-scope="scope">
            <!--{{ scope.row.status }}-->
            <!--
              <el-tag v-if='scope.row.status === 0' type="warning">草稿</el-tag>
              <el-tag v-else-if='scope.row.status === 1'>待审核</el-tag>
              <el-tag v-else-if='scope.row.status === 2' type="success">审核通过</el-tag>
              <el-tag v-else-if='scope.row.status === 3' type="danger">审核失败</el-tag>
              <el-tag v-else-if='scope.row.status === 4' type="info">已删除</el-tag>
            -->
            <!--代码改进:-->
            <el-tag :type="articlesStatus[scope.row.status].type">{{ articlesStatus[scope.row.status].text }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" align="center" label="发布时间">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" plain icon="el-icon-edit" circle @click="handleEdit(scope.$index, scope.row)"></el-button>
            <el-button type="danger" plain icon="el-icon-delete" circle @click="handleDelete(scope.$index, scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="article_pagination">
        <el-pagination :current-page.sync="page" :disabled='loading' :page-size="pageSize" @current-change='OncurrentChangePage' layout="prev, pager, next" :total="totalData" background />
      </div>
    </div>
  </el-card>

</div>
</template>

<script>
import {
  getUsertableInfo,
  getUserChannels,
  deleteArticle
} from "@/api/article.js";
export default {
  name: "Article",
  data() {
    return {
      form: {},
      img: require("@/assets/error.3f7b1f94.gif"),
      totalData: null,
      pageSize: 10, //每页大小
      tableData: [],
      channelsList: [],
      currentPage4: 4,
      status: null,
      channelId: null,
      dataTime: null,
      loading: true,
      page: 1, //当前组件

      articlesStatus: [{
          status: 0,
          text: "草稿",
          type: "info"
        },
        {
          status: 1,
          text: "待审核",
          type: ""
        },
        {
          status: 2,
          text: "审核通过",
          type: "success"
        },
        {
          status: 3,
          text: "审核失败",
          type: "warning"
        },
        {

          status: 4,
          text: "已删除",
          type: "danger"
        }
      ]
    };
  },
  created() {
    this.getTable();
    this.getChannels(1);
  },
  methods: {
    // 频道
    getChannels() {
      getUserChannels().then(res => {
        console.log(res.data.data.channels);
        this.channelsList = res.data.data.channels;
      });
    },

    getTable(page) {
      getUsertableInfo({
        page: page || 1,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelId,
        begin_pubdate: this.dataTime ? this.dataTime[0] : null,
        end_pubdate: this.dataTime ? this.dataTime[1] : null
      }).then(res => {
        // console.log(res);
        this.tableData = res.data.data.results;
        this.totalData = res.data.data.total_count;
        this.loading = false;
      });
    },

    // 分页
    OncurrentChangePage(val) {
      console.log(val);
      this.getTable(val);
      this.loading = false;
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.$router.push(`/publish`)
    },
    handleDelete(index, rowId) {
      console.log(index, rowId);
      console.log(rowId.toString());
      this.$confirm('确认删除?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticle(rowId.toString()).then(res => {
          console.log(res);
          // this.getTable(this.page)
        });

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

      // this.getTable()
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

      .article-cover {
        width: 100px;
        background-size: cover;
      }

      .article_pagination {
        float: right;
      }
    }
  }
}
</style>
