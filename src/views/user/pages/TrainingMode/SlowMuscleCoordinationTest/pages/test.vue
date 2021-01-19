<template>
  <div id="slowMuscleCoordinationTest-pages-test-app">
    <div id="slowMuscleCoordinationTest-pages-test-head">
      <div id="slowMuscleCoordinationTest-pages-test-font">
        挺直腰背坐在座椅中间, 按照画面图形提示进行盆底肌收缩,
        越贴近图形,得分越高（慢收-保持-慢放）
      </div>
      <div id="slowMuscleCoordinationTest-pages-test-logo">
        <img
          class="slowMuscleCoordinationTest-pages-test-logo"
          :src="require('@/assets/image/logo.jpg')"
          alt=""
        />
      </div>
    </div>

    <div id="slowMuscleCoordinationTest-pages-test-middio">
      <div id="slowMuscleCoordinationTest-pages-test-echarts"></div>
      <div id="slowMuscleCoordinationTest-pages-test-setting">
        回合数
        <el-input-number
          v-model="allRound"
          controls-position="right"
          :min="1"
          :max="6"
          :disabled="isOpen1"
          style="width:80%"
        ></el-input-number>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div style="margin-left:15%; text-align:left">
          请注意 : <br />
          训练页面刷新时，<br />应保持完全放松
        </div>
      </div>
    </div>
    <div id="slowMuscleCoordinationTest-pages-test-bottom">
      <el-button
        id="slowMuscleCoordinationTest-pages-test-btn1"
        @click="open"
        :disabled="isOpen1"
        >开始</el-button
      >
      <el-button
        id="slowMuscleCoordinationTest-pages-test-btn2"
        @click="close"
        :disabled="isOpen2"
        >结束</el-button
      >
      <el-button
        id="slowMuscleCoordinationTest-pages-test-btn3"
        @click="bink"
        :disabled="isOpen3"
        >查看报告</el-button
      >
    </div>
  </div>
</template>
<style lang="scss">
#slowMuscleCoordinationTest-pages-test-app {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
}
#slowMuscleCoordinationTest-pages-test-middio {
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 100%;
}
#slowMuscleCoordinationTest-pages-test-setting {
  width: 10%;
  height: 70%;
  font-size: 15px;
}
#slowMuscleCoordinationTest-pages-test-font {
  text-align: left;
  margin-left: 5%;
  width: 55%;
  height: 0%;
  font-size: 20px;
}
#slowMuscleCoordinationTest-pages-test-head {
  margin-top: 10px;
  display: flex;
  width: 100%;
  height: 50px;
}
#slowMuscleCoordinationTest-pages-test-logo {
  text-align: right;
  width: 100%;
  height: 100%;
}
.slowMuscleCoordinationTest-pages-test-logo {
  width: 250px;
  height: 50px;
}
#slowMuscleCoordinationTest-pages-test-echarts {
  text-align: center;
  width: 85%;
  height: 90%;
  margin-bottom: 2%;
  margin-left: 5%;
}
#slowMuscleCoordinationTest-pages-test-bottom {
  text-align: center;
  width: 100%;
  height: 10%;
}
#slowMuscleCoordinationTest-pages-test-btn1,
#slowMuscleCoordinationTest-pages-test-btn2,
#slowMuscleCoordinationTest-pages-test-btn3 {
  width: 20%;
  font-size: 15px;
}
</style>
<script>
import { addTrainRecord } from '@/api/dexie.js'
import { calculateData } from '../utils/calculateData.js'
export default {
  name: 'slowMuscleCoordinationTest-pages-test',
  data() {
    return {
      isOpen1: false, //开关
      isOpen2: true,
      isOpen3: true,
      allRound: 2, //总回合数
      myChart: null,
      testArray: [],
      line: [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1.625,
        3.25,
        4.875,
        6.5,
        8.125,
        9.75,
        11.375,
        13,
        14.625,
        16.25,
        17.875,
        19.5,
        21.125,
        22.75,
        24.375,
        26,
        27.625,
        29.25,
        30.875,
        32.5,
        34.125,
        35.75,
        37.375,
        39,
        40.625,
        42.25,
        43.875,
        45.5,
        47.125,
        48.75,
        50.375,
        52,
        53.625,
        55.25,
        56.875,
        58.5,
        60.125,
        61.75,
        63.375,
        65,
        65,
        65,
        65,
        65,
        65,
        65,
        65,
        65,
        65,
        65,
        65,
        65,
        65,
        65,
        65,
        65,
        65,
        65,
        65,
        65,
        63.375,
        61.75,
        60.125,
        58.5,
        56.875,
        55.25,
        53.625,
        52,
        50.375,
        48.75,
        47.125,
        45.5,
        43.875,
        42.25,
        40.625,
        39,
        37.375,
        35.75,
        34.125,
        32.5,
        30.875,
        29.25,
        27.625,
        26,
        24.375,
        22.75,
        21.125,
        19.5,
        17.875,
        16.25,
        14.625,
        13,
        11.375,
        9.75,
        8.125,
        6.5,
        4.875,
        3.25,
        1.625,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1.625,
        3.25,
        4.875,
        6.5,
        8.125,
        9.75,
        11.375,
        13,
        14.625,
        16.25,
        17.875,
        19.5,
        21.125,
        22.75,
        24.375,
        26,
        27.625,
        29.25,
        30.875,
        32.5,
        34.125,
        35.75,
        37.375,
        39,
        40.625,
        42.25,
        43.875,
        45.5,
        47.125,
        48.75,
        50.375,
        52,
        53.625,
        55.25,
        56.875,
        58.5,
        60.125,
        61.75,
        63.375,
        65,
        65,
        65,
        65,
        65,
        65,
        65,
        65,
        65,
        65,
        65,
        65,
        65,
        65,
        65,
        65,
        65,
        65,
        65,
        65,
        65,
        63.375,
        61.75,
        60.125,
        58.5,
        56.875,
        55.25,
        53.625,
        52,
        50.375,
        48.75,
        47.125,
        45.5,
        43.875,
        42.25,
        40.625,
        39,
        37.375,
        35.75,
        34.125,
        32.5,
        30.875,
        29.25,
        27.625,
        26,
        24.375,
        22.75,
        21.125,
        19.5,
        17.875,
        16.25,
        14.625,
        13,
        11.375,
        9.75,
        8.125,
        6.5,
        4.875,
        3.25,
        1.625,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      xData: [],
      timer1: null, // setInterval定时器名称
      timer2: null, // x轴时间增加
      timeOut: null, //settimeout定时器名称
      recordData: {
        data: [],
        time: 26
      },
      sendMessage: {
        name: localStorage.getItem('username'),
        devicesId: localStorage.getItem('devicesId'),
        standardArray: [],
        testArray: [],
        score: [],
        trainName: 'SlowMuscleCoordinationTest'
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.timer1)
    clearInterval(this.timer2)
    clearTimeout(this.timeOut)
    this.timer1 = null
    this.timer2 = null
    this.isOpen1 = false
    this.isOpen2 = true
  },
  watch: {
    recordData: {
      handler(newValue, oldValue) {
        const xAxisData = []
        const mathData = []
        const basicData = oldValue.data[0]
        const newData = newValue.data
        const maxData = this.$store.getters.getMax
        this.totalTime = 0

        for (let m = 0; m < newData.length; m++) {
          mathData.push(((newData[m] - basicData) / maxData).toFixed(3) * 100)
        }
        for (let i = 0; i <= newValue.time * 10; i++) {
          xAxisData.push(i / 10)
        }
        this.testArray = mathData

        this.myChart.setOption({
          xAxis: {
            data: xAxisData,
            splitLine: {
              show: true //去掉网格线
            }
          },
          series: [
            {
              data: this.line,
              showSymbol: false,
              hoverAnimation: false
            },
            {
              name: '测试值(%)',
              type: 'line',
              data: mathData,
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
      },
      deep: true
    }
  },
  methods: {
    drawChart() {
      return new Promise((resolve, reject) => {
        this.myChart = this.$echarts.init(
          document.getElementById(
            'slowMuscleCoordinationTest-pages-test-echarts'
          )
        )
        // 指定图表的配置项和数据
        this.myChart.setOption({
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              animation: false
            },
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
            splitLine: {
              show: true //去掉网格线
            }
          },
          yAxis: {
            name: 'mbar',
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
          grid: {
            left: '5%',
            top: '1%',
            width: '90%',
            height: '95%',
            containLabel: false
          },
          series: []
        })
        return resolve()
      })
    },
    destroy() {
      clearInterval(this.timer1)
      clearInterval(this.timer2)
      clearTimeout(this.timeOut)
      this.timer1 = null
      this.timer2 = null
      this.isOpen1 = false
      this.isOpen2 = true
    },

    open() {
      this.$store.dispatch('setDataStatus', 1)
      this.isOpen1 = true
      this.isOpen2 = false
      this.isOpen3 = true
      this.recordData.data = []
      this.timer1 = setInterval(() => {
        this.recordData.data.push(this.$store.getters.getData)
      }, 100)
      this.timeOut = setTimeout(async() => {
        var scoreArray = calculateData(this.line, this.testArray)
        this.sendMessage.standardArray = this.line
        this.sendMessage.testArray.push(this.testArray)
        this.sendMessage.score.push(scoreArray)
        this.destroy()
        if (this.allRound == 1) {
          this.isOpen3 = false
           var res = await addTrainRecord(this.sendMessage)
          if (res['status'] == 1) {
            this.$message.success({
              message: '训练保存成功',
              center: true
            })
          } else {
            this.$message.error({
              message: '训练保存失败',
              center: true
            })
          }
          this.sendMessage.testArray = []
          this.sendMessage.standardArray = []
          this.sendMessage.score = []
        }
        if (this.allRound != 1) {
          this.open()
          this.allRound--
        }
      }, this.recordData.time * 1000)
    },
    close() {
      this.destroy()
      this.$store.dispatch('setData', '')
      this.$store.dispatch('setDataStatus', 0)
    },
    iniChart() {
      for (let i = 0; i <= this.recordData.time * 10; i++) {
        this.xData.push(i / 10)
      }
      this.myChart.setOption({
        xAxis: {
          data: this.xData,
          splitLine: {
            show: true //去掉网格线
          }
        },
        series: [
          {
            name: '标准值(%)',
            type: 'line',
            data: this.line,
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
          }
        ]
      })
    },
    bink() {
      this.$router.push({ path: '/home/checkTest/index' })
    }
  },
  mounted() {
    this.drawChart()
    this.iniChart()
  }
}
</script>
