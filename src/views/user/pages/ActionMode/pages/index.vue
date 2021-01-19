<!--
 * @Author      : 钟焯权
 * @Date        : 2020-11-18 09:56:09
 * @LastEditTime: 2021-01-12 17:11:49
 * @Description : 激活模式-测试页面
-->
<template>
  <div id="action-pages-app">
    <div id="action-pages-head">
      <div id="action-pages-font">
        挺直腰背坐在座椅中间，点击开始，联想控尿时的发力感，主动收缩盆底肌收缩时曲线上升，放松时曲线下降
      </div>
      <div id="action-pages-logo">
        <img
          class="action-pages-logo"
          :src="require('@/assets/image/logo.jpg')"
          alt=""
        />
      </div>
    </div>
    <div id="action-pages-middio">
      <div id="action-pages-echarts"></div>
      <div id="action-pages-setting">
        <div>时间(s)</div>
        <el-input-number
          v-model="recordData.time"
          controls-position="right"
          :min="15"
          :max="30"
          :disabled="isOpen1"
          style="width:80%"
        ></el-input-number>
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
    <div id="action-pages-bottom">
      <el-button id="action-pages-btn1" @click="open" :disabled="isOpen1"
        >开始</el-button
      >
      <el-button id="action-pages-btn2" @click="close" :disabled="isOpen2"
        >结束</el-button
      >
    </div>
  </div>
</template>
<style lang="scss">
#action-pages-app {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
}
#action-pages-middio {
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 100%;
}
#action-pages-setting {
  width: 10%;
  height: 70%;
  font-size: 15px;
}
#action-pages-head {
  margin-top: 10px;
  width: 100%;
  height: 50px;
}
#action-pages-font {
  text-align: left;
  margin-left: 5%;
  width: 40%;
  height: 0%;
  font-size: 20px;
}
#action-pages-logo {
  text-align: right;
  width: 100%;
  height: 100%;
}
.action-pages-logo {
  width: 250px;
  height: 50px;
}
#action-pages-echarts {
  text-align: center;
  width: 85%;
  height: 90%;
  margin-bottom: 2%;
  margin-left: 5%;
}
#action-pages-bottom {
  text-align: center;
  width: 100%;
  height: 10%;
}
#action-pages-btn1,
#action-pages-btn2 {
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
      isOpen2: true, //开关2
      myChart: null,
      timer: null, // setInterval定时器名称
      timeOut: null, //settimeout定时器名称
      recordData: {
        data: [],
        time: 15
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
    clearTimeout(this.timeOut)
    this.timer = null
    this.isOpen1 = false
  },
  watch: {
    recordData: {
      handler(newValue, oldValue) {
        const xAxisData = []
        const newData = newValue.data
        const oldData = oldValue.data
        if (newValue.time != oldValue.time) {
          for (let i = 0; i <= newValue.time * 10; i++) {
            xAxisData.push(i / 10)
          }
        } else {
          for (let i = 0; i <= oldValue.time * 10; i++) {
            xAxisData.push(i / 10)
          }
        }
        this.myChart.setOption({
          xAxis: {
            data: xAxisData
          },
          series: [
            {
              showSymbol: false,
              hoverAnimation: false,
              showSymbol: false,
              hoverAnimation: false,
              data: newData
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
          document.getElementById('action-pages-echarts')
        )

        // 指定图表的配置项和数据
        this.myChart.setOption({
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis'
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
            name: 'mbar',
            scale: true,
            type: 'value',
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
              name: '压力值(mbar)',
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
    destroy() {
      clearInterval(this.timer)
      clearTimeout(this.timeOut)
      this.timer = null
      this.isOpen1 = false
    },

    open() {
      this.$store.dispatch('setIsCollapse', true)
      this.isOpen1 = true
      this.isOpen2 = false
      this.recordData.data = []
      this.timer = setInterval(() => {
        this.recordData.data.push(this.$store.getters.getData)
      }, 100)
      this.timeOut = setTimeout(() => {
        this.destroy()
        this.open()
      }, this.recordData.time * 1000)
    },
    close() {
      this.destroy()
      this.isOpen2 = true
      this.recordData.data = []
      this.$store.dispatch('setData', '')
      this.$store.dispatch('setDataStatus', 0)
     
    }
  },
  mounted() {
    this.drawChart()
  }
}
</script>
