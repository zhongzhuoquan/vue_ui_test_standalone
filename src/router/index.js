/*
 * @Author      : 钟焯权
 * @Date        : 2020-11-03 17:19:57
 * @LastEditTime: 2021-01-14 16:44:26
 * @Description :
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/admin/home.vue'),
    children: [
      {
        path: '/admin/index',
        name: 'index',
        component: () => import('@/views/admin/index.vue')
      },
      {
        path: '/admin/userlist',
        name: 'userlist',
        component: () => import('@/views/admin/userList.vue')
      },
      {
        path: '/admin/trainrecord',
        name: 'trainRecord',
        component: () => import('@/views/admin/trainRecord.vue')
      },
      {
        path: '/admin/trainlongrecord',
        name: 'trainlongrecord',
        component: () => import('@/views/admin/trainLongRecord.vue')
      },
      {
        path: '/admin/adminmessage',
        name: 'adminMessage',
        component: () => import('@/views/admin/adminMessage.vue')
      },
      {
        path: '/admin/checkTest',
        name: 'checkTest',
        component: () => import('@/views/admin/checkTest.vue')
      },
    ]
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/user/home.vue'),
    children: [
      {
        path: '/home/index',
        name: 'index',
        component: () => import('@/views/user/pages/Index/index.vue')
      },
      {
        path: '/home/actionmode/index',
        name: 'index',
        component: () => import('@/views/user/pages/ActionMode/index.vue')
      },
      {
        path: '/home/actionmode/test/index',
        name: 'index',
        component: () => import('@/views/user/pages/ActionMode/pages/index.vue')
      },
      {
        path: '/home/testmode/index',
        name: 'index',
        component: () => import('@/views/user/pages/TestMode/index.vue')
      },
      {
        path: '/home/testmode/endurancemuscletest/index',
        name: 'index',
        component: () =>
          import('@/views/user/pages/TestMode/EnduranceMuscleTest/index.vue')
      },
      {
        path: '/home/testmode/testrecord/index',
        name: 'index',
        component: () =>
          import('@/views/user/pages/TestMode/TestRecord/index.vue')
      },
      {
        path: '/home/trainingmode/freetest/index',
        name: 'index',
        component: () =>
          import('@/views/user/pages/TrainingMode/FreeTest/index.vue')
      },
      {
        path: '/home/trainingmode/freetest/pages/index',
        name: 'index',
        component: () =>
          import('@/views/user/pages/TrainingMode/FreeTest/pages/index.vue')
      },
      {
        path: '/home/trainingmode/freetest/pages/test',
        name: 'index',
        component: () =>
          import('@/views/user/pages/TrainingMode/FreeTest/pages/test.vue')
      },
      {
        path: '/home/trainingmode/basictestofslowmuscle/index',
        name: 'index',
        component: () =>
          import(
            '@/views/user/pages/TrainingMode/BasicTestOfSlowMuscle/index.vue'
          )
      },
      {
        path: '/home/trainingmode/basictestofslowmuscle/pages/index',
        name: 'index',
        component: () =>
          import(
            '@/views/user/pages/TrainingMode/BasicTestOfSlowMuscle/pages/index.vue'
          )
      },
      {
        path: '/home/trainingmode/basictestofslowmuscle/pages/test',
        name: 'index',
        component: () =>
          import(
            '@/views/user/pages/TrainingMode/BasicTestOfSlowMuscle/pages/test.vue'
          )
      },

      {
        path: '/home/trainingmode/slowmusclecoordinationtest/index',
        name: 'index',
        component: () =>
          import(
            '@/views/user/pages/TrainingMode/SlowMuscleCoordinationTest/index.vue'
          )
      },
      {
        path: '/home/trainingmode/slowmusclecoordinationtest/pages/index',
        name: 'index',
        component: () =>
          import(
            '@/views/user/pages/TrainingMode/SlowMuscleCoordinationTest/pages/index.vue'
          )
      },
      {
        path: '/home/trainingmode/slowmusclecoordinationtest/pages/test',
        name: 'index',
        component: () =>
          import(
            '@/views/user/pages/TrainingMode/SlowMuscleCoordinationTest/pages/test.vue'
          )
      },
      {
        path: '/home/trainingmode/advancedtestofslowmuscle/index',
        name: 'index',
        component: () =>
          import(
            '@/views/user/pages/TrainingMode/AdvancedTestOfSlowMuscle/index.vue'
          )
      },
      {
        path: '/home/trainingmode/advancedtestofslowmuscle/pages/index',
        name: 'index',
        component: () =>
          import(
            '@/views/user/pages/TrainingMode/AdvancedTestOfSlowMuscle/pages/index.vue'
          )
      },
      {
        path: '/home/trainingmode/advancedtestofslowmuscle/pages/test',
        name: 'index',
        component: () =>
          import(
            '@/views/user/pages/TrainingMode/AdvancedTestOfSlowMuscle/pages/test'
          )
      },
      {
        path: '/home/trainingmode/fastmusclecoordinationtest/index',
        name: 'index',
        component: () =>
          import(
            '@/views/user/pages/TrainingMode/FastMuscleCoordinationTest/index.vue'
          )
      },
      {
        path: '/home/trainingmode/fastmusclecoordinationtest/pages/index',
        name: 'index',
        component: () =>
          import(
            '@/views/user/pages/TrainingMode/FastMuscleCoordinationTest/pages/index.vue'
          )
      },
      {
        path: '/home/trainingmode/fastmusclecoordinationtest/pages/test',
        name: 'index',
        component: () =>
          import(
            '@/views/user/pages/TrainingMode/FastMuscleCoordinationTest/pages/test.vue'
          )
      },
      {
        path: '/home/trainingmode/advancedfastmuscletest/index',
        name: 'index',
        component: () =>
          import(
            '@/views/user/pages/TrainingMode/AdvancedFastMuscleTest/index.vue'
          )
      },
      {
        path: '/home/trainingmode/advancedfastmuscletest/pages/index',
        name: 'index',
        component: () =>
          import(
            '@/views/user/pages/TrainingMode/AdvancedFastMuscleTest/pages/index.vue'
          )
      },
      {
        path: '/home/trainingmode/advancedfastmuscletest/pages/test',
        name: 'index',
        component: () =>
          import(
            '@/views/user/pages/TrainingMode/AdvancedFastMuscleTest/pages/test.vue'
          )
      },
      {
        path: '/home/trainingmode/comprehensivetesta/index',
        name: 'index',
        component: () =>
          import('@/views/user/pages/TrainingMode/ComprehensiveTestA/index.vue')
      },
      {
        path: '/home/trainingmode/comprehensivetesta/pages/index',
        name: 'index',
        component: () =>
          import(
            '@/views/user/pages/TrainingMode/ComprehensiveTestA/pages/index.vue'
          )
      },
      {
        path: '/home/trainingmode/comprehensivetesta/pages/test',
        name: 'index',
        component: () =>
          import(
            '@/views/user/pages/TrainingMode/ComprehensiveTestA/pages/test.vue'
          )
      },
      {
        path: '/home/trainingmode/comprehensivetestb/index',
        name: 'index',
        component: () =>
          import('@/views/user/pages/TrainingMode/ComprehensiveTestB/index.vue')
      },
      {
        path: '/home/trainingmode/comprehensivetestb/pages/index',
        name: 'index',
        component: () =>
          import(
            '@/views/user/pages/TrainingMode/ComprehensiveTestB/pages/index.vue'
          )
      },
      {
        path: '/home/trainingmode/comprehensivetestb/pages/test',
        name: 'index',
        component: () =>
          import(
            '@/views/user/pages/TrainingMode/ComprehensiveTestB/pages/test.vue'
          )
      },
      {
        path: '/home/trainingmode/trainRecord/index',
        name: 'index',
        component: () =>
          import('@/views/user/pages/TrainingMode/TrainingRecord/index.vue')
      },
      {
        path: '/home/trainingmode/trainingLongRecord/index',
        name: 'index',
        component: () =>
          import('@/views/user/pages/TrainingMode/TrainingLongRecord/index.vue')
      },
      {
        path: '/home/personalinformation/index',
        name: 'index',
        component: () =>
          import('@/views/user/pages/PersonalInformation/index.vue')
      },
      {
        path: '/home/checkTest/index',
        name: 'index',
        component: () => import('@/views/user/pages/CheckTest/index.vue')
      },
      {
        path: '/home/checkTest/index2',
        name: 'index',
        component: () => import('@/views/user/pages/CheckTest/index2.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
