<template>
  <div id="free-pages-test-app">
    <div id="free-pages-test-head">
      <div id="free-pages-test-font">
        挺直腰背坐在座椅中间,可根据用户弱项,<br />
        自由设计曲线路径进行针对性训练
      </div>
      <div id="free-pages-test-logo">
        <img
          class="free-pages-test-logo"
          :src="require('@/assets/image/logo.jpg')"
          alt=""
        />
      </div>
    </div>

    <div id="free-pages-test-middio">
      <div id="free-pages-test-echarts"></div>
      <div id="free-pages-test-setting">
        <div>每回合时长（s）</div>
        <el-input-number
          v-model="recordData.time"
          controls-position="right"
          :min="15"
          :max="60"
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
    <div id="free-pages-test-bottom">
      <el-button id="free-pages-test-btn1" @click="open" :disabled="isOpen1"
        >开始</el-button
      >
      <el-button id="free-pages-test-btn2" @click="close" :disabled="isOpen2"
        >结束</el-button
      >
    </div>
  </div>
</template>
<style lang="scss">
#free-pages-test-app {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
}
#free-pages-test-middio {
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 100%;
}
#free-pages-test-setting {
  width: 10%;
  height: 70%;
  font-size: 15px;
}
#free-pages-test-font {
  text-align: left;
  margin-left: 5%;
  width: 40%;
  height: 0%;
  font-size: 20px;
}
#free-pages-test-head {
  margin-top: 10px;
  display: flex;
  width: 100%;
  height: 50px;
}
#free-pages-test-logo {
  text-align: right;
  width: 100%;
  height: 100%;
}
.free-pages-test-logo {
  width: 250px;
  height: 50px;
}
#free-pages-test-echarts {
  text-align: center;
  width: 85%;
  height: 90%;
  margin-bottom: 2%;
  margin-left: 5%;
}
#free-pages-test-bottom {
  text-align: center;
  width: 100%;
  height: 10%;
}
#free-pages-test-btn1,
#free-pages-test-btn2 {
  width: 20%;
  font-size: 15px;
}
</style>
<script>
export default {
  name: 'test-pages',
  data() {
    return {
      isOpen1: false, //开关
      isOpen2: true,
      myChart: null,
      timer1: null, // setInterval定时器名称
      timer2: null, // x轴时间增加
      timeOut: null, //settimeout定时器名称
      totalTime: 0,
      recordData: {
        data: [],
        time: 15
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
        for (let m = 0; m < newData.length; m++) {
          mathData.push(((newData[m] - basicData) / maxData).toFixed(3) * 100)
        }
        for (let i = 0; i <= newValue.time * 10; i++) {
          xAxisData.push(i / 10)
        }

        this.myChart.setOption({
          xAxis: {
            data: xAxisData,
            splitLine: {
              show: true //去掉网格线
            }
          },
          series: [
            {
              name: '测试值(%)',
              type: 'line',
              data: mathData,
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
          document.getElementById('free-pages-test-echarts')
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
            name: '',
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
          series: [
            {
              name: '测试值(%)',
              type: 'line',
              showSymbol: false,
              hoverAnimation: false
            }
          ]
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
      this.recordData.data = []
      this.timer1 = setInterval(() => {
        this.recordData.data.push(this.$store.getters.getData)
      }, 100)
      this.timeOut = setTimeout(() => {
        this.$store.dispatch('setDataStatus', 0)
        this.destroy()
        this.open()
      }, this.recordData.time * 1000)
    },
    close() {
      this.destroy()
      this.$store.dispatch('setData', '')
      this.$store.dispatch('setDataStatus', 0)
    }
  },
  mounted() {
    this.drawChart()
  }
}
</script>
