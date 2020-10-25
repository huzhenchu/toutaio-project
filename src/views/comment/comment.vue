<template>
<div class="comment-connation">
  <el-card>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>评论管理</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="comment-connation-table">
      <el-table :data="tableData" stripe style="width: 100%" center>
        <el-table-column prop="date" label="标题" width="180">
        </el-table-column>
        <el-table-column prop="name" label="总评论数" width="180">
        </el-table-column>
        <el-table-column prop="address" label="粉丝评论数">
        </el-table-column>
        <el-table-column prop="address" label="状态">
        </el-table-column>
        <el-table-column prop="address" label="操作">
        </el-table-column>
      </el-table>

    </div>

    <div class="comment-connation-pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total_content">
      </el-pagination>

    </div>

  </el-card>
</div>
</template>

<script>
export default {
  name: 'commentIndex',
  data() {
    return {
      tableData: [],
      currentPage4: 1,
      pageSize: 10,
      total_content: 100
    }
  },
  created() {

  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {}
  },

}
</script>

<style lang="less" scoped>
.comment-connation {
  .comment-connation-table {
    margin-top: 20px;
  }

  .comment-connation-pagination {
    margin-top: 10px;
  }
}
</style>
