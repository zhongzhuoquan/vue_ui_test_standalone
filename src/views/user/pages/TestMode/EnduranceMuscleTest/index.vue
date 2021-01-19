<!--
 * @Author      : 钟焯权
 * @Date        : 2020-11-18 09:56:09
 * @LastEditTime: 2021-01-19 09:24:51
 * @Description : 激活模式-测试页面
-->
<template>
  <div id="test-enduranceMuscle-app">
    <div id="test-enduranceMuscle-head">
      <div id="test-enduranceMuscle-font">
        挺直腰背坐在座椅中间<br />
        收缩到红线区域内之后保持收缩状态，不要屏气（慢收-保持）
      </div>
      <div id="test-enduranceMuscle-logo">
        <img
          class="test-enduranceMuscle-logo"
          :src="require('@/assets/image/logo.jpg')"
          alt=""
        />
      </div>
    </div>
    <div id="test-enduranceMuscle-middio">
      <div id="test-enduranceMuscle-echarts"></div>
      <div id="test-enduranceMuscle-setting">
        有效时长（s）<br />
        <el-input
          type="text"
          id="group-name"
          v-model="sendMessage.totalTime"
          disabled
          style="width:80%"
        ></el-input>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div style="margin-left:15%; text-align:left">
          注 : <br />
          训练页面刷新时，<br />应保持完全放松
        </div>
      </div>
    </div>
    <div id="test-enduranceMuscle-bottom">
      <el-button
        id="test-enduranceMuscle-btn1"
        @click="open"
        :disabled="isOpen1"
        >开始</el-button
      >
      <el-button
        id="test-enduranceMuscle-btn2"
        @click="close"
        :disabled="isOpen2"
        >结束</el-button
      >
    </div>
  </div>
</template>
<style lang="scss">
#test-enduranceMuscle-app {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
}
#test-enduranceMuscle-middio {
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 100%;
}
#test-enduranceMuscle-setting {
  width: 10%;
  height: 70%;
  font-size: 15px;
}
#test-enduranceMuscle-head {
  width: 100%;
  height: 50px;
  margin-top: 10px;
}
#test-enduranceMuscle-font {
  text-align: left;
  margin-left: 5%;
  width: 40%;
  height: 0%;
  font-size: 20px;
}
#test-enduranceMuscle-logo {
  text-align: right;
  width: 100%;
  height: 100%;
}
.test-enduranceMuscle-logo {
  width: 250px;
  height: 50px;
}
#test-enduranceMuscle-echarts {
  text-align: center;
  width: 85%;
  height: 90%;
  margin-bottom: 2%;
  margin-left: 5%;
}
#test-enduranceMuscle-bottom {
  text-align: center;
  width: 100%;
  height: 10%;
}
#test-enduranceMuscle-btn1,
#test-enduranceMuscle-btn2 {
  width: 20%;
  font-size: 15px;
}
</style>
<script>
import { fsWrite } from '@/api/fs.js'
import { addTestRecord } from '@/api/dexie.js'
export default {
  name: 'test-pages',
  data() {
    return {
      isOpen1: false, //开关
      isOpen2: true, //开关
      myChart: null,
      timer1: null, // setInterval定时器名称
      timer2: null, // x轴时间增加
      timeOut: null, //settimeout定时器名称
      time: 1,
      sendMessage: {
        totalTime: 0,
        name: localStorage.getItem('username'),
        devicesId: localStorage.getItem('devicesId')
      },
      recordData: {
        data: [],
        time: 15
      },
      time3: 0 //到达时间图像才增加
    }
  },
  beforeDestroy() {
    clearInterval(this.timer1)
    this.timer1 = null
    this.isOpen1 = false
  },
  watch: {
    recordData: {
      handler(newValue, oldValue) {
        const xAxisData = []
        const mathData = []
        const basicData = oldValue.data[0]
        const newData = newValue.data
        const maxData = this.$store.getters.getMax
        this.sendMessage.totalTime = 0
        for (let m = 0; m < newData.length; m++) {
          mathData.push(((newData[m] - basicData) / maxData).toFixed(3) * 100)
        }
        for (let s = 0; s < mathData.length; s++) {
          if (50 <= mathData[s] && mathData[s] <= 65) {
            this.sendMessage.totalTime = this.sendMessage.totalTime + 1
          }
        }
        for (let i = 0; i <= newValue.time * 10; i++) {
          xAxisData.push(i / 10)
          if (i >= 150) {
            mathData.shift()
            xAxisData.shift()
          }
        }

        this.time++
        this.sendMessage.totalTime = this.sendMessage.totalTime / 10
        this.myChart.setOption({
          xAxis: {
            data: xAxisData,
            splitLine: {
              show: true //去掉网格线
            }
          },
          series: [
            {
              name: '测试值（%）',
              type: 'line',
              data: mathData
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
          document.getElementById('test-enduranceMuscle-echarts')
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
              show: true
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
          series: [
            {
              name: '测试值（%）',
              type: 'line',
              showSymbol: false,
              hoverAnimation: false,
              itemStyle: {
                normal: {
                  color: '#8b008b'
                }
              },
              markLine: {
                label: { show: false },
                data: [
                  {
                    yAxis: 50
                  },
                  {
                    yAxis: 65
                  }
                ]
              }
            }
          ]
        })
        return resolve()
      })
    },
    destroy() {
      clearInterval(this.timer1)
      this.timer1 = null
      this.isOpen1 = false
    },

    open() {
      this.$store.dispatch('setDataStatus', 1)
      this.isOpen1 = true
      this.isOpen2 = false
      this.recordData.time = 15
      this.recordData.data = []
      this.timer1 = setInterval(() => {
        if (this.time3 >= 7.5) {
          this.recordData.time = this.recordData.time + 0.1
        }
        this.time3 = this.time3 + 0.1
        this.recordData.data.push(this.$store.getters.getData)
      }, 100)
    },
    close() {
      this.destroy()
      this.isOpen2 = true
      this.time3 = 0
      this.$store.dispatch('setData', '')
      this.$store.dispatch('setDataStatus', 0)
      const rLoading = this.openLoading()
      var res = addTestRecord(this.sendMessage.name, this.sendMessage.totalTime)
      if ((res['status'] = 1)) {
        rLoading.close()
        this.$message.success({
          message: '训练记录保存成功',
          center: true
        })
      } else {
        rLoading.close()
        this.$message.error({
          message: '训练记录保存失败',
          center: true
        })
      }
    }
  },
  mounted() {
    this.drawChart()
  }
}
</script>
