<!--
 * @Author      : 钟焯权
 * @Date        : 2020-11-16 17:24:29
 * @LastEditTime: 2021-01-15 09:55:20
 * @Description : 
-->
<template>
  <div id="checkTest-app">
    <div id="checkTest-head">
      <div id="checkTest-logo">
        <img
          class="checkTest-logo"
          :src="require('@/assets/image/logo.jpg')"
          alt=""
        />
      </div>
    </div>
    <div id="checkTest-top">
      {{ getData.trainName }}
    </div>
    <div id="checkTest-middio" ref="exportPdf">
      <div id="checkTest-left">
        <div id="left-echarts"></div>
      </div>
      <div id="checkTest-right">
        <div id="right-top">训练曲线</div>
        <div id="right-echarts"></div>
        <div id="right-bottom">
          <el-button
            :key="count"
            v-for="count in getData.round"
            class="right-bottom-btn"
            @click="change_chart(count)"
            >回合{{ count }}</el-button
          >
        </div>
      </div>
    </div>

    <div id="checkTest-bottom">
      <el-button class="checkTest-btn" @click="print">打印报告</el-button>
      <el-button class="checkTest-btn" @click="repty">返回</el-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#checkTest-app {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
}
#checkTest-top {
  font-size: 20px;
  text-align: center;
  width: 100%;
  height: 10%;
}
#checkTest-head {
  margin-top: 10px;
  width: 100%;
  height: 50px;
}
#checkTest-logo {
  text-align: right;
  width: 100%;
  height: 100%;
}
.checkTest-logo {
  width: 250px;
  height: 50px;
}
#checkTest-middio {
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 100%;
}
#checkTest-left {
  text-align: center;
  width: 68%;
  height: 100%;
}
#checkTest-right {
  display: flex;
  flex-direction: column;
  width: 32%;
  height: 100%;
}
#left-echarts {
  text-align: center;
  width: 95%;
  height: 100%;
}
#right-echarts {
  text-align: center;
  margin-left: 12%;
  width: 81%;
  height: 65%;
}
#right-top {
  font-size: 15px;
  height: 1%;
}
#right-bottom {
  width: 100%;
  height: 35%;
}
.right-bottom-btn {
  width: 25%;
  height: 25%;
  margin: 15px;
}
#checkTest-bottom {
  text-align: center;
  width: 100%;
  height: 10%;
}
.checkTest-btn {
  width: 20%;
  font-size: 15px;
}
</style>
<script>
import { fsWrite } from '@/api/fs.js'
import { findTrainRecord } from '@/api/dexie.js'
export default {
  name: 'checktest-index',
  data() {
    return {
      myChart1: null,
      myChart2: null,
      getData: {
        trainName: '',
        score: [],
        round: '',
        testArray: [],
        standardArray: []
      },
      score_relax: [],
      score_keep: [],
      score_shrink: [],
      score_loosen: [],
      score_shrink_rate: [],
      score_height: [],
      xdata: [],
      checkRound: ''
    }
  },
  created() {
    this.getMessage()
  },
  watch: {
    getData: {
      handler(newValue, oldValue) {
        for (let i = 0; i < newValue.round; i++) {
          this.score_relax.push(newValue.score[i][0])
          this.score_keep.push(newValue.score[i][1])
          this.score_shrink.push(newValue.score[i][2])
          this.score_loosen.push(newValue.score[i][3])
          this.score_shrink_rate.push(newValue.score[i][4])
          this.score_height.push(newValue.score[i][5])
        }
        this.myChart1.setOption({
          xAxis: {
            name: 'Rounds',
            type: 'category',
            data: [1, 2, 3, 4, 5, 6],
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
              完全放松: this.score_relax[0] !== null,
              保持: this.score_keep[0] !== null,
              收缩: this.score_shrink[0] !== null,
              逐渐放松: this.score_loosen[0] !== null,
              收缩速率: this.score_shrink_rate[0] !== null,
              收缩高度: this.score_height[0] !== null
            }
          },
          series: [
            {
              name: '完全放松',
              type: 'line',
              data: this.score_relax,
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
              data: this.score_keep,
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
              data: this.score_shrink,
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
              data: this.score_loosen,
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
              data: this.score_shrink_rate,
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
              data: this.score_height,
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
    checkRound: {
      handler(newValue, oldValue) {
        for (let i = 0; i < this.getData.standardArray; i++) {
          this.xdata.push(0.1 * i)
        }
        this.myChart2.setOption({
          xAxis: {
            name: 't/s',
            type: 'category',
            data: this.xdata,
            splitLine: {
              show: true //去掉网格线
            }
          },
          series: [
            {
              name: '标准值(%)',
              type: 'line',
              data: this.getData.standardArray,
              showSymbol: false,
              hoverAnimation: false,
              itemStyle: {
                normal: {
                  color: '#ffb6c1',
                  lineStyle: {
                    width: 5
                  }
                }
              }
            },
            {
              name: '测试值(%)',
              type: 'line',
              data: this.getData.testArray[this.checkRound - 1],
              showSymbol: false,
              hoverAnimation: false,
              itemStyle: {
                normal: {
                  color: '#8b008b',
                  lineStyle: {
                    width: 2
                  }
                }
              }
            }
          ]
        })
      }
    }
  },
  methods: {

  async getMessage() {
      const rLoading = this.openLoading()
      var res = await findTrainRecord(this.$store.getters.getTrainId)
      if (res['status'] == 1) {
        rLoading.close()
        this.$store.dispatch('setTrainId', '')
        this.checkRound = 1
        this.getData.round = res['data']['round']
        this.getData.trainName = res['data']['train_name']
        this.getData.testArray = res['data']['test_data']
        this.getData.standardArray = res['data']['standard_data']
        this.getData.score = res['data']['score']
      } else {
        rLoading.close()
        this.$message.error({
          message: '查看训练记录失败',
          center: true
        })
      }
    },

    //画图
    drawChart_left() {
      return new Promise((resolve, reject) => {
        this.myChart1 = this.$echarts.init(
          document.getElementById('left-echarts')
        )
        // 指定图表的配置项和数据
        this.myChart1.setOption({
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
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
            }
          },
          xAxis: {
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
    drawChart_right() {
      return new Promise((resolve, reject) => {
        this.myChart2 = this.$echarts.init(
          document.getElementById('right-echarts')
        )
        // 指定图表的配置项和数据
        this.myChart2.setOption({
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis',
            formatter: function(datas) {
              let res = datas[0].name + '<br/>'
              let val
              let length = datas.length
              let i = 0
              for (; i < length; i++) {
                val = datas[i].value
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                res +=
                  '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' +
                  datas[i].color +
                  ';"></span>' +
                  datas[i].seriesName +
                  '：' +
                  val +
                  '<br/>'
              }
              return res
            }
          },
          xAxis: {
            name: 't/s',
            type: 'category',
            data: [],
            splitLine: {
              show: true //去掉网格线
            }
          },
          yAxis: {
            scale: true,
            type: 'value',
            boundaryGap: [0, '100%'],
            min: -20,
            max: 100,
            axisLabel: {
              show: true,
              interval: 'auto',
              formatter: '{value}%'
            },
            splitLine: {
              show: true //去掉网格线
            }
          },
          series: [
            {
              name: '标准值(%)',
              type: 'line',
              data: [],
              showSymbol: false,
              hoverAnimation: false,
              itemStyle: {
                normal: {
                  color: '#ffb6c1',
                  lineStyle: {
                    width: 10
                  }
                }
              }
            },
            {
              name: '测试值(%)',
              type: 'line',
              data: [],
              showSymbol: false,
              hoverAnimation: false,
              itemStyle: {
                normal: {
                  color: '#8b008b'
                }
              }
            }
          ]
        })
        return resolve()
      })
    },
    change_chart(id) {
      this.checkRound = id
    },
    print() {
      this.$PDFSave(
        this.$refs.exportPdf,
        localStorage.getItem('username') +
          '-' +
          this.getData.trainName +
          '-' +
          this.$moment().format('YYYY-MM-DD hh-mm-ss')
      )
    },
    repty() {
      this.$router.go(-1)
    }
  },

  mounted() {
    this.drawChart_left()
    this.drawChart_right()
  }
}
</script>
