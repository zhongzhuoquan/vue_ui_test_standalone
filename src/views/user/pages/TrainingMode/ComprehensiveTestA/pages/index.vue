<!--
 * @Author      : 钟焯权
 * @Date        : 2020-11-17 09:16:45
 * @LastEditTime: 2021-01-04 14:49:33
 * @Description : 
-->
<template>
  <div id="comprehensiveTestA-pages-app">
    <div id="comprehensiveTestA-pages-head">
      <div id="comprehensiveTestA-pages-font">
        挺直腰背坐在座椅中间,<br />
        进行全力且快速的三次收缩（快收-快放）
      </div>
      <div id="comprehensiveTestA-pages-logo">
        <img
          class="comprehensiveTestA-pages-logo"
          :src="require('@/assets/image/logo.jpg')"
          alt=""
        />
      </div>
    </div>
    <div id="comprehensiveTestA-pages-middio">
      <div id="comprehensiveTestA-pages-echarts"></div>
    </div>
    <div id="comprehensiveTestA-pages-bottom">
      <el-button id="comprehensiveTestA-pages-btn2" @click="open"
        >开始</el-button
      >

      <el-button
        id="comprehensiveTestA-pages-btn1"
        @click="btnClick"
        :disabled="isOpen1"
        >完成校验</el-button
      >
    </div>
  </div>
</template>
<style lang="scss">
#comprehensiveTestA-pages-app {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
}
#comprehensiveTestA-pages-middio {
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 100%;
}
#comprehensiveTestA-pages-font {
  text-align: left;
  margin-left: 5%;
  width: 40%;
  height: 0%;
  font-size: 20px;
}
#comprehensiveTestA-pages-head {
  margin-top: 10px;
  width: 100%;
  height: 50px;
}
#comprehensiveTestA-pages-logo {
  text-align: right;
  width: 100%;
  height: 100%;
}
.comprehensiveTestA-pages-logo {
  width: 250px;
  height: 50px;
}
#comprehensiveTestA-pages-echarts {
  text-align: center;
  width: 85%;
  height: 90%;
  margin-bottom: 2%;
  margin-left: 5%;
}
#comprehensiveTestA-pages-bottom {
  text-align: center;
  width: 100%;
  height: 10%;
}
#comprehensiveTestA-pages-btn1,
#comprehensiveTestA-pages-btn2 {
  width: 20%;
  font-size: 15px;
}
</style>
<script>
export default {
  name: 'comprehensiveTestA-pages-index',
  data() {
    return {
      isOpen1: true, //开关

      myChart: null, //图表
      max: '', //最大压力值
      min: '', //最小压力值
      timer: null, // setInterval定时器名称
      timeOut: null, //settimeout定时器名称
      recordData: {
        data: [],
        time: 12
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
    clearTimeout(this.timeOut)
    this.timer = null
  },
  watch: {
    recordData: {
      handler(newValue, oldValue) {
        const xAxisData = []
        const newData = newValue.data
        const oldData = oldValue.data

        for (let i = 0; i <= this.recordData.time * 10; i++) {
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
              showSymbol: false,
              hoverAnimation: false,
              data: newData,
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
          document.getElementById('comprehensiveTestA-pages-echarts')
        )
        // 指定图表的配置项和数据
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
            type: 'value'
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
              name: '压力值（mbar）',
              type: 'line',
              data: [],
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
    },

    btnClick() {
      this.destroy()

      this.isOpen1 = true
      let dataArray = this.recordData.data
      this.min = Math.min.apply(null, dataArray)
      this.max = Math.max.apply(null, dataArray)
      if (this.min == this.max) {
        this.isOpen == true
        this.isOpen == true
        this.$message({
          message: '请重新校验',
          center: true
        })
      } else {
        this.$store.dispatch('setMax', this.max - this.min)
        this.$router.push('/home/trainingmode/comprehensivetesta/pages/test')
      }
    },
    open() {
      this.isOpen1 = false
      this.destroy()
      this.$store.dispatch('setDataStatus', 1)
      this.recordData.data = []
      this.timer = setInterval(() => {
        this.recordData.data.push(this.$store.getters.getData)
      }, 100)
      this.timeOut = setTimeout(() => {
        this.$store.dispatch('setDataStatus', 0)
        this.destroy()
      }, this.recordData.time * 1000)
    }
  },
  mounted() {
    this.drawChart()
  }
}
</script>
