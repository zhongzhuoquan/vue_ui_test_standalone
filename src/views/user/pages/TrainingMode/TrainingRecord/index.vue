<!--
 * @Author      : 钟焯权
 * @Date        : 2020-11-16 17:24:29
 * @LastEditTime: 2021-01-15 09:31:04
 * @Description : 
-->
<template>
  <div id="trainingRrcord-app">
    <div id="trainingRrcord-head">
      <div id="trainingRrcord-logo">
        <img
          class="trainingRrcord-logo"
          :src="require('@/assets/image/logo.jpg')"
          alt=""
        />
      </div>
    </div>
    <div id="trainingRrcord-top">
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div id="trainingRrcord-middio">
      <el-table
        height="100%"
        class="trainingRrcord-table"
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
          label="训练日期"
          width="250"
        >
        </el-table-column>
        <el-table-column align="center" prop="desc" label="类型" width="200">
        </el-table-column>
        <el-table-column align="center" prop="round" label="回合数" width="200">
        </el-table-column>
        <el-table-column align="center" label="操作" width="250">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="info"
              @click="handleShow(scope.$index, scope.row)"
              >显示报告</el-button
            >
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
    <div id="trainingRrcord-bottom">
      <el-button id="checkTest-btn" @click="bink">打印长期报告</el-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#trainingRrcord-head {
  margin-top: 10px;
  width: 100%;
  height: 50px;
}
#trainingRrcord-logo {
  text-align: right;
  width: 100%;
  height: 100%;
}
.trainingRrcord-logo {
  width: 250px;
  height: 50px;
}
#trainingRrcord-app {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
}
#trainingRrcord-top {
  font-size: 15px;
  text-align: right;
  width: 80%;
  height: 10%;
}
#trainingRrcord-middio {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}
#trainingRrcord-bottom {
  text-align: center;
  width: 100%;
  height: 10%;
}
#trainingRrcord-table {
  width: 100%;
  height: 60%;
}
#trainingRrcord-btn {
  width: 20%;
  font-size: 15px;
}
#checkTest-btn {
  width: 20%;
  font-size: 15px;
}
.block {
  margin-bottom: 1%;
}
</style>
<script>
import { fsWrite } from '@/api/fs.js'
import { findTrainRecordAll, deleteTrainRecord } from '@/api/dexie.js'
export default {
  name: 'trainingRrcord-index',
  data() {
    return {
      name: localStorage.getItem('username'),
      sendMessage: {
        record_id: '',
        name: localStorage.getItem('username'),
        devicesId: localStorage.getItem('devicesId')
      },
      tableData: [],
      limitePage: {
        limit: 10,
        page: 1
      },
      options: [
        {
          value: '1,2,3,4,5,6,7',
          label: '全部'
        },
        {
          value: '1',
          label: '慢肌基础训练'
        },
        {
          value: '2',
          label: '慢肌协调训练'
        },
        {
          value: '3',
          label: '慢肌进阶训练'
        },
        {
          value: '4',
          label: '快肌协调训练'
        },
        {
          value: '5',
          label: '快肌进阶训练'
        },
        {
          value: '6',
          label: '综合训练A'
        },
        {
          value: '7',
          label: '综合训练B'
        }
      ],
      value: '1,2,3,4,5,6,7'
    }
  },
  watch: {
    value: {
      async handler(newValue, oldValue) {
        const rLoading = this.openLoading()
        this.sendMessage['train_id'] = newValue
        var res = await findTrainRecordAll(this.sendMessage)
        if (res['status'] == 1) {
          rLoading.close()
          this.tableData = res['data']
        } else {
          rLoading.close()
          this.tableData = []
        }
      }
    }
  },
  created() {
    this.getInformation()
  },
  methods: {
    async getInformation() {
      const rLoading = this.openLoading()
      this.sendMessage['train_id'] = '1,2,3,4,5,6,7'
      var res = await findTrainRecordAll(this.sendMessage)
      if (res['status'] == 1) {
        rLoading.close()
        this.tableData = res['data']
      } else {
        rLoading.close()
        this.$message.error({
          message: '暂无训练记录',
          center: true
        })
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
        var res = await deleteTrainRecord(this.sendMessage)
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
    },
    handleShow(index, row) {
      this.tableData.splice(index, 1)
      this.$store.dispatch('setTrainId', row['id'])
      this.$router.push({ path: '/home/checkTest/index2' })
    },
    bink() {
      this.$router.push('/home/trainingmode/trainingLongRecord/index')
    }
  },
  mounted() {}
}
</script>
