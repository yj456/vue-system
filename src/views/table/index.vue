<template>
  <div class="table-contanier">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="money"
        label="金额"
        width="180">
      </el-table-column>
      <el-table-column
        prop="aptitudes"
        label="资质"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          money: 100000,
          aptitudes: '良',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          money: 1000000,
          aptitudes: '优',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          money: 10000000,
          aptitudes: '良',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          money: 100000000,
          aptitudes: '优',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2016-05-05',
          name: '王小虎',
          money: 1000000000,
          aptitudes: '优',
          address: '上海市普陀区金沙江路 1520 弄'
        }]
    }
  },
  methods: {},
  mounted () {}
}
</script>

<style scoped>
.table-contanier{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 32px;
}
</style>
