<template>
  <div class="login_container">
    <div class="login_box">
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <el-form-item prop="name">
          <el-input
            class="login_item"
            v-model="loginForm.name"
            prefix-icon="el-icon-user-solid"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            class="login_item"
            v-model="loginForm.password"
            type="password"
            prefix-icon="el-icon-lock"
            placeholder="请输入登录密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
          <el-button type="info" @click="dialogFormVisible = true"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- 模态框 -->
    <el-dialog
      append-to-body
      title="注册"
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="dialogFormRef"
        :rules="dialogFormRules"
        :model="dialogForm"
        label-width="0px"
      >
        <el-form-item prop="dname" label="用户名" :label-width="formLabelWidth">
          <el-input
            v-model="dialogForm.dname"
            prefix-icon="el-icon-user-solid"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="dsex" label="性别" :label-width="formLabelWidth">
          <el-select v-model="dialogForm.dsex" placeholder="请选择">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="dyear" label="出生年" :label-width="formLabelWidth">
          <el-date-picker
            v-model="dialogForm.dyear"
            type="year"
            placeholder="选择年"
            value-format="yyyy"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          prop="dpassword"
          label="密码"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="dialogForm.dpassword"
            type="password"
            prefix-icon="el-icon-lock"
            placeholder="请输入登录密码"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="drpassword"
          label="重复密码"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="dialogForm.drpassword"
            type="password"
            prefix-icon="el-icon-lock"
            placeholder="请重新输入密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" :plain="true" @click="register"
          >注 册</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { findUserName, addUser, findUser } from '@/api/dexie.js'
import { fsWrite } from '@/api/fs.js'
export default {
  name: 'login',
  data() {
    return {
      //模态框
      formLabelWidth: '120px',
      dialogFormVisible: false,
      dialogForm: {
        dname: '',
        dpassword: '',
        drpassword: '',
        dsex: '',
        dyear: '',
        devicesId: localStorage.getItem('devicesId')
      },
      //登录表单数据
      loginForm: {
        name: '',
        password: '',
        devicesId: localStorage.getItem('devicesId')
      },
      //登录验证规则
      loginFormRules: {
        name: [
          { required: true, message: '请输入用户名', tigger: 'blur' },
          { min: 3, max: 10, message: '长度在3到10个字符之间', tigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', tigger: 'blur' },
          { min: 4, max: 15, message: '长度在4到15个字符之间', tigger: 'blur' }
        ]
      },
      dialogFormRules: {
        dname: [
          { required: true, message: '请输入用户名', tigger: 'blur' },
          { min: 3, max: 10, message: '长度在3到10个字符之间', tigger: 'blur' }
        ],
        dsex: [{ required: true, message: '请选择性别' }],
        dyear: [{ required: true, message: '请选择出生年' }],
        dpassword: [
          { required: true, message: '请输入登录密码', tigger: 'blur' },
          { min: 4, max: 15, message: '长度在4到15个字符之间', tigger: 'blur' }
        ],
        drpassword: [
          { required: true, message: '请重新输入密码', tigger: 'blur' },
          { min: 4, max: 15, message: '长度在4到15个字符之间', tigger: 'blur' }
        ]
      }
    }
  },
  created() {},
  methods: {
    //限制训练次数
    resetLoginForm() {
      this.$message.success({ message: '重置完成', center: true })
      this.$refs.loginFormRef.resetFields()
    },
    //登录
    login() {
      const rLoading = this.openLoading()
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) {
          rLoading.close()
          return
        } else {
          var res = await findUser(this.loginForm.name, this.loginForm.password)
          if (res['status'] == 1) {
            if (res.data['status'] == 1) {
              localStorage.setItem('username', this.loginForm.name)
              this.$message.success({
                message: '管理员登录成功',
                center: true
              })
              rLoading.close()
              this.$store.dispatch('setAdminSearchUsername', '')
              this.$router.push('/admin/index')
            } else {
              localStorage.setItem('username', this.loginForm.name)
              this.$message.success({
                message: '登录成功',
                center: true
              })
              rLoading.close()
              this.$router.push('/home/index')
            }
          } else {
            rLoading.close()
            this.$message.error({
              message: '账号或者密码错误',
              center: true
            })
          }
        }
      })
    },

    //注册
    register() {
      const rLoading = this.openLoading()
      this.$refs.dialogFormRef.validate(async valid => {
        if (!valid) {
          rLoading.close()
          return
        } else {
          var userName = await findUserName(this.dialogForm.dname)
          console.log(userName)
          if (userName != null) {
            rLoading.close()
            this.$message.error({
              message: '用户名已经存在',
              center: true
            })
            rLoading.close()
            return
          }
          if (this.dialogForm.dpassword != this.dialogForm.drpassword) {
            this.$message.error({
              message: '密码不一致',
              center: true
            })
            rLoading.close()
            return
          }
          var addUser_status = await addUser(
            this.dialogForm.dname,
            this.dialogForm.dpassword,
            this.dialogForm.dsex,
            this.dialogForm.dyear,
            this.$moment().format('YYYY-MM-DD HH:mm:ss')
          )
          console.log(addUser_status)
          if (addUser_status == 1) {
            var res = await findUser(
              this.dialogForm.dname,
              this.dialogForm.dpassword
            )
            if (res['status'] == 1) {
              localStorage.setItem('username', this.dialogForm.dname)
              this.$message.success({
                message: '注册并登录成功',
                center: true
              })
              rLoading.close()
              this.$router.push('/home/index')
            } else {
              rLoading.close()
              this.$message.error({
                message: '登录失败',
                center: true
              })
            }
          } else {
            this.$message.error({
              message: '注册失败',
              center: true
            })
            rLoading.close()
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  width: 100%;
  height: 97%;
  background-image: url('../../assets/image/background.jpg');
  background-size: cover;
}
.login_item {
  border-color: rgb(31, 31, 31);
}
.login_box {
  width: 450px;
  height: 250px;
  // background-color: rgb(255, 255, 255);
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -20%);
}
.btns {
  display: flex;
  justify-content: center;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
