<!--
 * @Author      : 钟焯权
 * @Date        : 2020-11-17 09:16:45
 * @LastEditTime: 2021-01-04 14:39:51
 * @Description : 
-->
<template>
  <div id="test-app">
    <div id="test-head">
      <div id="test-font">
        挺直腰背坐在座椅中间 <br />
        进行全力且快速的三次收缩（快收-快放）
      </div>
      <div id="test-logo">
        <img
          class="test-logo"
          :src="require('@/assets/image/logo.jpg')"
          alt=""
        />
      </div>
    </div>
    <div id="test-middio"><div id="test-echarts"></div></div>
    <div id="test-bottom">
      <el-button id="test-btn2" @click="open">开始</el-button>
      <el-button id="test-btn1" @click="btnClick" :disabled="isOpen1"
        >完成校验</el-button
      >
    </div>
  </div>
</template>
<style lang="scss">
#test-app {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
}
#test-middio {
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 100%;
}
#test-head {
  margin-top: 10px;
  width: 100%;
  height: 50px;
}
#test-font {
  text-align: left;
  margin-left: 5%;
  width: 40%;
  height: 0%;
  font-size: 20px;
}
#test-logo {
  text-align: right;
  width: 100%;
  height: 100%;
}
.test-logo {
  width: 250px;
  height: 50px;
}
#test-echarts {
  text-align: center;
  width: 85%;
  height: 90%;
  margin-bottom: 2%;
  margin-left: 5%;
}
#test-bottom {
  text-align: center;
  width: 100%;
  height: 10%;
}
#test-btn1,
#test-btn2 {
  width: 20%;
  font-size: 15px;
}
</style>
<script>
export default {
  name: 'testMode-index',
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

        for (let i = 0; i <= this.recordData.time; i++) {
          if (this.recordData.time == i) {
            xAxisData.push(i)
            break
          }
          for (let n = 1; n < 10; n++) {
            xAxisData.push(i + n / 10)
          }
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
          document.getElementById('test-echarts')
        )
        // 指定图表的配置项和数据
        // 指定图表的配置项和数据
        this.myChart.setOption({
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
              name: '测试值（mbar）',
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
    },

    btnClick() {
      this.destroy()
      this.isOpen1 = true

      let dataArray = this.recordData.data
      this.min = Math.min.apply(null, dataArray)
      this.max = Math.max.apply(null, dataArray)
      if (this.min == this.max) {
        this.isOpen1 == true
        this.$message({
          message: '请重新校验',
          center: true
        })
      } else {
        this.$store.dispatch('setMax', this.max - this.min)
        this.$router.push('/home/testmode/endurancemuscletest/index')
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
