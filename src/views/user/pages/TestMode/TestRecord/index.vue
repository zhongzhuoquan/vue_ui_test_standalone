<!--
 * @Author      : 钟焯权
 * @Date        : 2020-11-16 17:24:29
 * @LastEditTime: 2021-01-14 16:20:27
 * @Description : 
-->
<template>
  <div id="testRrcord-app">
    <div id="testRrcord-top">
      <div id="testRrcord-logo">
        <img
          class="testRrcord-logo"
          :src="require('@/assets/image/logo.jpg')"
          alt=""
        />
      </div>
    </div>
    <div id="testRrcord-middio">
      <el-table
        height="100%"
        class="testRrcord-table"
        :data="
          tableData.slice(
            (limitePage.page - 1) * limitePage.limit,
            limitePage.limit * limitePage.page
          )
        "
        style="width: 70%"
      >
        <el-table-column
          align="center"
          prop="create_time"
          label="日期"
          width="290"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="total_time"
          label="数值(s)"
          width="290"
        >
        </el-table-column>
        <el-table-column align="center" label="操作" width="290">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="limitePage.page"
          :page-sizes="[10]"
          :page-size="limitePage.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length"
        >
        </el-pagination>
      </div>
    </div>
    <div id="testRrcord-bottom"></div>
  </div>
</template>
<style lang="scss" scoped>
#testRrcord-app {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
}
.block {
  margin-bottom: 1%;
}
#testRrcord-top {
  width: 100%;
  height: 50px;
}
#testRrcord-logo {
  margin-top: 10px;
  text-align: right;
  width: 100%;
  height: 50px;
}
.testRrcord-logo {
  width: 250px;
  height: 50px;
}
#testRrcord-middio {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}
#testRrcord-bottom {
  text-align: center;
  width: 100%;
  height: 10%;
}
#testRrcord-table {
  width: 80%;
  height: 60%;
}
#testRrcord-btn {
  width: 20%;
  font-size: 15px;
}
</style>
<script>
import { fsWrite } from '@/api/fs.js'
import { findTestRecord, deleteTestRecord } from '@/api/dexie.js'
export default {
  name: 'checktest-index',
  data() {
    return {
      sendMessage: {
        record_id: '',
        name: localStorage.getItem('username'),
        devicesId: localStorage.getItem('devicesId')
      },
      tableData: [],
      limitePage: {
        limit: 10,
        page: 1
      }
    }
  },
  created() {
    this.getInformation()
  },
  methods: {
    async getInformation() {
      const rLoading = this.openLoading()
      var res = await findTestRecord(this.sendMessage)
      if (res['status'] == 1) {
        rLoading.close()
        this.tableData = res['data']
        console.log(this.tableData)
      } else {
        rLoading.close()
        this.$message.error({ message: '查询失败', center: true })
      }
    },
    handleSizeChange(val) {
      this.limitePage.limit = val
    },
    handleCurrentChange(val) {
      this.limitePage.page = val
    },
    handleDelete(index, row) {
      this.$confirm('确定要删除吗？', '提示', {
        type: 'warning'
      }).then(async () => {
        this.sendMessage.record_id = row['id']
        const rLoading = this.openLoading()
        var res = await deleteTestRecord(this.sendMessage)
        if (res['status'] == 1) {
          rLoading.close()
          this.tableData.splice(
            (this.limitePage.page - 1) * this.limitePage.limit + index,
            1
          )
          this.$message.success({
            message: '删除成功',
            center: true
          })
        } else {
          rLoading.close()
          this.$message.error({
            message: '删除失败',
            center: true
          })
        }
      })
    }
  },
  mounted() {}
}
</script>
