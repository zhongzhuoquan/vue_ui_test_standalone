<!--
 * @Author      : 钟焯权
 * @Date        : 2020-11-16 17:34:06
 * @LastEditTime: 2021-01-13 13:50:28
 * @Description : 
-->
<template>
  <div id="personalInformation-app">
    <div id="personalInformation-logo">
      <img
        class="personalInformation-logo"
        :src="require('@/assets/image/logo.jpg')"
        alt=""
      />
    </div>
    <el-form
      id="personalInformation-form"
      ref="formRef"
      :rules="formRules"
      :model="form"
      label-width="80px"
    >
      <el-form-item prop="name" label="用户名">
        <el-input :disabled="true" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item prop="sex" label="性别">
        <el-select
          style="width:100%;"
          v-model="form.sex"
          placeholder="请选择性别"
        >
          <el-option label="男" value="0"></el-option>
          <el-option label="女" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="year" label="出生年">
        <el-col :span="11">
          <el-date-picker
            type="year"
            value-format="yyyy"
            placeholder="选择日期"
            v-model="form.year"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item prop="password" label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="changeInformation"
          >立即修改</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<style lang="scss">
#personalInformation-logo {
  margin-top: 10px;
  text-align: right;
  width: 100%;
  height: 50px;
}
.personalInformation-logo {
  width: 250px;
  height: 50px;
}
#personalInformation-app {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
}
#personalInformation-form {
  width: 50%;
  height: 100%;
  margin: 8%;
}
</style>
<script>
import { fsWrite } from '@/api/fs.js'
import { findUserMessage, updateUserMessage } from '@/api/dexie.js'
export default {
  name: 'personalinformation-index',
  data() {
    return {
      sendMessage: {
        name: localStorage.getItem('username'),
        devicesId: localStorage.getItem('devicesId')
      },
      form: {
        name: '',
        password: '',
        sex: '',
        year: '',
        devicesId: localStorage.getItem('devicesId')
      },
      formRules: {
        sex: [{ required: true, message: '请选择性别' }],
        year: [{ required: true, message: '请选择出生年' }],
        password: [
          { required: true, message: '请输入登录密码', tigger: 'blur' },
          { min: 4, max: 15, message: '长度在4到15个字符之间', tigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.GetInformation()
  },
  methods: {
    changeInformation() {
      const rLoading = this.openLoading()
      this.$refs.formRef.validate(async valid => {
        if (!valid) {
          rLoading.close()
          return
        } else {
          var res = await updateUserMessage(this.form)
          if (res['status'] == 1) {
            this.$message.success({
              message: '个人信息修改成功',
              center: true
            })
            rLoading.close()
          } else {
            this.$message.error({
              message: '个人信息修改失败',
              center: true
            })
            rLoading.close()
          }
        }
      })
    },
    async GetInformation() {
      const rLoading = this.openLoading()
      var res = await findUserMessage(this.sendMessage.name)
      console.log(res)
      if (res['status'] == 1) {
        rLoading.close()
        this.form.name = res.data['name']
        this.form.password = res.data['password']
        this.form.sex = res.data['sex']
        this.form.year = res.data['year']
      } else {
        this.$message.error({
          message: '个人信息查询失败',
          center: true
        })
        rLoading.close()
      }
    }
  }
}
</script>
