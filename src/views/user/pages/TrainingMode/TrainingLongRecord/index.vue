<!--
 * @Author      : 钟焯权
 * @Date        : 2020-11-16 17:24:29
 * @LastEditTime: 2021-01-14 15:36:11
 * @Description : 
-->
<template>
  <div id="trainingLongRrcord-app">
    <div id="trainingLongRrcord-top">
      <div id="trainingLongRrcord-menu">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="1">慢肌基础训练</el-menu-item>
          <el-menu-item index="2">慢肌协调训练</el-menu-item>
          <el-menu-item index="3">慢肌进阶训练</el-menu-item>
          <el-menu-item index="4">快肌协调训练</el-menu-item>
          <el-menu-item index="5">快肌进阶训练</el-menu-item>
          <el-menu-item index="6">综合训练A</el-menu-item>
          <el-menu-item index="7">综合训练B</el-menu-item>
        </el-menu>
      </div>
      <div id="trainingLongRrcord-logo">
        <img
          class="trainingLongRrcord-logo"
          :src="require('@/assets/image/logo.jpg')"
          alt=""
        />
      </div>
    </div>
    <div id="trainingLongRrcord-middio" ref="exportPdf">
      <div id="trainingLongRrcord-middio_block">
        <el-date-picker
          id="trainingLongRrcord-middio_picker"
          v-model="sendMessage.value_time"
          type="daterange"
          align="right"
          value-format="yyyy-MM-dd 00:00:00"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </div>
      <div id="trainingLongRrcord-echarts"></div>
    </div>
    <div id="trainingLongRrcord-bottom">
      <el-button class="checkTest-btn" @click="print">打印报告</el-button>
      <el-button class="checkTest-btn" @click="repty">返回</el-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#trainingLongRrcord-app {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
}
#trainingLongRrcord-top {
  margin-top: 10px;
  display: flex;
  font-size: 15px;
  text-align: right;
  width: 100%;
  height: 50px;
}
#trainingLongRrcord-logo {
  width: 20%;
  height: 100%;
}
.trainingLongRrcord-logo {
  width: 250px;
  height: 50px;
}
#trainingLongRrcord-menu {
  width: 80%;
}
#trainingLongRrcord-middio {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 90%;
  height: 100%;
  margin-top: 2%;
  margin-left: 2%;
}
#trainingLongRrcord-bottom {
  text-align: center;
  width: 100%;
  height: 10%;
}
#trainingLongRrcord-table {
  width: 100%;
  height: 60%;
}
#trainingLongRrcord-btn {
  width: 20%;
  font-size: 15px;
}
.checkTest-btn {
  width: 20%;
  font-size: 15px;
}
#trainingLongRrcord-echarts {
  text-align: center;
  width: 100%;
  height: 100%;
}
#trainingLongRrcord-middio_block {
  width: 85%;
  text-align: right;
}
</style>
<script>
import { findTrainRecordLong } from '@/api/dexie.js'
import { fsWrite } from '@/api/fs.js'
export default {
  name: 'trainingLongRrcord-index',
  data() {
    return {
      activeIndex: '1',
      name: localStorage.getItem('username'),
      sendMessage: {
        record_id: '',
        name: localStorage.getItem('username'),
        devicesId: localStorage.getItem('devicesId'),
        key: 1,
        value_time: ''
      },
      tableData: [],
      limitePage: {
        limit: 5,
        page: 1
      },
      myChart1: null,
      getData: [],
      score_relax_array: [],
      score_keep_array: [],
      score_shrink_array: [],
      score_loosen_array: [],
      score_shrink_rate_array: [],
      score_height_array: [],
      createTimeArray: [],
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
    }
  },
  watch: {
    getData: {
      handler(newValue, oldValue) {
        for (let i = 0; i < newValue.length; i++) {
          let score_relax = 0
          let score_keep = 0
          let score_shrink = 0
          let score_loosen = 0
          let score_shrink_rate = 0
          let score_height = 0
          for (let n = 0; n < newValue[i].score.length; n++) {
            score_relax = parseFloat(newValue[i].score[n][0]) + score_relax
            score_keep = parseFloat(newValue[i].score[n][1]) + score_keep
            score_shrink = parseFloat(newValue[i].score[n][2]) + score_shrink
            score_loosen = parseFloat(newValue[i].score[n][3]) + score_loosen
            score_shrink_rate =
              parseFloat(newValue[i].score[n][4]) + score_shrink_rate
            score_height = parseFloat(newValue[i].score[n][5]) + score_height
          }
          this.createTimeArray.push(newValue[i].create_time.toString())
          this.score_relax_array.push(
            (score_relax / newValue[i].round).toFixed(2)
          )
          this.score_keep_array.push(
            (score_keep / newValue[i].round).toFixed(2)
          )
          this.score_shrink_array.push(
            (score_shrink / newValue[i].round).toFixed(2)
          )
          this.score_loosen_array.push(
            (score_loosen / newValue[i].round).toFixed(2)
          )
          this.score_shrink_rate_array.push(
            (score_shrink_rate / newValue[i].round).toFixed(2)
          )
          this.score_height_array.push(
            (score_height / newValue[i].round).toFixed(2)
          )
        }
        this.myChart1.setOption({
          xAxis: {
            name: '',
            type: 'category',
            data: this.createTimeArray,
            axisLabel: {
              interval: 10
            },
            splitLine: {
              show: true //去掉网格线
            }
          },
          legend: {
            data: [
              '完全放松',
              '保持',
              '收缩',
              '逐渐放松',
              '收缩速率',
              '收缩高度'
            ],
            show: true,
            right: '15%',
            top: 12,
            icon: 'roundRect',
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 20, // 设置间距
            textStyle: {
              color: '#1a1a1a',
              fontSize: 15
            },
            selected: {
              完全放松: !isNaN(this.score_relax_array[0]),
              保持: !isNaN(this.score_keep_array[0]),
              收缩: !isNaN(this.score_shrink_array[0]),
              逐渐放松: !isNaN(this.score_loosen_array[0]),
              收缩速率: !isNaN(this.score_shrink_rate_array[0]),
              收缩高度: !isNaN(this.score_height_array[0])
            }
          },

          series: [
            {
              name: '完全放松',
              type: 'line',
              data: this.score_relax_array,
              showSymbol: true,
              hoverAnimation: true,
              itemStyle: {
                normal: {
                  color: '#3cb472',
                  lineStyle: {
                    width: 2
                  }
                }
              }
            },
            {
              name: '保持',
              type: 'line',
              data: this.score_keep_array,
              showSymbol: true,
              hoverAnimation: true,
              itemStyle: {
                normal: {
                  color: '#da74d7',
                  lineStyle: {
                    width: 2
                  }
                }
              }
            },
            {
              name: '收缩',
              type: 'line',
              data: this.score_shrink_array,
              showSymbol: true,
              hoverAnimation: true,
              itemStyle: {
                normal: {
                  color: '#ff4700',
                  lineStyle: {
                    width: 2
                  }
                }
              }
            },
            {
              name: '逐渐放松',
              type: 'line',
              data: this.score_loosen_array,
              showSymbol: true,
              hoverAnimation: true,
              itemStyle: {
                normal: {
                  color: '#ffa300',
                  lineStyle: {
                    width: 2
                  }
                }
              }
            },
            {
              name: '收缩速率',
              type: 'line',
              data: this.score_shrink_rate_array,
              showSymbol: true,
              hoverAnimation: true,
              itemStyle: {
                normal: {
                  color: '#1b1a71',
                  lineStyle: {
                    width: 2
                  }
                }
              }
            },
            {
              name: '收缩高度',
              type: 'line',
              data: this.score_height_array,
              showSymbol: true,
              hoverAnimation: true,
              itemStyle: {
                normal: {
                  color: '#7c69ed',
                  lineStyle: {
                    width: 2
                  }
                }
              }
            }
          ]
        })
      },
      deep: true
    },
    sendMessage: {
      async handler(newValue, oldValue) {
        this.score_relax_array = []
        this.score_keep_array = []
        this.score_shrink_array = []
        this.score_loosen_array = []
        this.score_shrink_rate_array = []
        this.score_height_array = []
        this.createTimeArray = []
        const rLoading = this.openLoading()
        this.sendMessage['train_id'] = newValue.key
        this.sendMessage['create_time'] = newValue.value_time
        var res = await findTrainRecordLong(this.sendMessage)
        if (res['status'] == 1) {
          rLoading.close()
          this.getData = res['data']
        } else {
          rLoading.close()
          this.getData = []
        }
      },
      deep: true
    }
  },
  created() {
    this.getMessage()
  },
  methods: {
    handleSelect(key, keyPath) {
      this.sendMessage.key = key
    },
    //axios接收数据
    async getMessage() {
      const rLoading = this.openLoading()
      this.sendMessage['train_id'] = this.sendMessage.key
      this.sendMessage['create_time'] = this.sendMessage.value_time
      var res = await findTrainRecordLong(this.sendMessage)
      if (res['status'] == 1) {
        rLoading.close()
        this.getData = res['data']
      } else {
        rLoading.close()
        this.getData = []
      }
    },

    //画图
    trainingLongRrcord_charts() {
      return new Promise((resolve, reject) => {
        this.myChart1 = this.$echarts.init(
          document.getElementById('trainingLongRrcord-echarts')
        )
        // 指定图表的配置项和数据
        this.myChart1.setOption({
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            axisLabel: {
              interval: 0,
              rotate: 40
            },
            splitLine: {
              show: true //去掉网格线
            }
          },
          yAxis: {
            name: '分数',
            scale: true,
            type: 'value',
            min: 0,
            max: 100,
            splitLine: {
              show: true //去掉网格线
            }
          },
          series: []
        })
        return resolve()
      })
    },
    print() {
      let train_name = ''
      if (this.sendMessage.key == 1) {
        train_name = '慢肌基础训练'
      }
      if (this.sendMessage.key == 2) {
        train_name = '慢肌协调训练'
      }
      if (this.sendMessage.key == 3) {
        train_name = '慢肌进阶训练'
      }
      if (this.sendMessage.key == 4) {
        train_name = '快肌协调训练'
      }
      if (this.sendMessage.key == 5) {
        train_name = '快肌进阶训练'
      }
      if (this.sendMessage.key == 6) {
        train_name = '综合训练A'
      }
      if (this.sendMessage.key == 7) {
        train_name = '综合训练B'
      }
      this.$PDFSave(
        this.$refs.exportPdf,
        localStorage.getItem('username') +
          '-' +
          train_name +
          '-' +
          this.$moment().format('YYYY-MM-DD hh-mm-ss')
      )
    },
    repty() {
      this.$router.go(-1)
    }
  },
  mounted() {
    this.trainingLongRrcord_charts()
  }
}
</script>
