/*
 * @Author      : 钟焯权
 * @Date        : 2020-11-23 14:04:12
 * @LastEditTime: 2020-12-19 09:55:40
 * @Description :
 */
export function calculateData(standardArray, testArray) {
  const scoreArray_relax = [] //放松数组
  let score_relax = null //放松分数
  const scoreArray_keep = [] //保持数组
  let score_keep = null //保持分数
  const scoreArray_shrink = [] //收缩速率数组
  let score_shrink = null //收缩速率分数
  const scoreArray_loosen = [] //逐渐放松数组
  let score_loosen = null //逐渐放松分数
  const scoreArray_shrink_rate = [] //收缩速率数组
  let score_shrink_rate = null //收缩速率分数
  const scoreArray_height = [] //收缩高度数组
  const array_height = []
  let score_height = null //高度分数
  let data = []
  //放松部分
  for (let i = 0; i <= 14; i++) {
    if (
      standardArray[i] - 1 < testArray[i] &&
      testArray[i] < standardArray[i] + 1
    ) {
      scoreArray_relax.push(100)
      continue
    }
    if (
      standardArray[i] - 3 < testArray[i] &&
      testArray[i] < standardArray[i] + 3
    ) {
      scoreArray_relax.push(95)
      continue
    }
    if (
      standardArray[i] - 4.5 < testArray[i] &&
      testArray[i] < standardArray[i] + 4.5
    ) {
      scoreArray_relax.push(90)
      continue
    }
    if (
      standardArray[i] - 7 < testArray[i] &&
      testArray[i] < standardArray[i] + 7
    ) {
      scoreArray_relax.push(80)
      continue
    }
    if (
      standardArray[i] - 8 < testArray[i] &&
      testArray[i] < standardArray[i] + 8
    ) {
      scoreArray_relax.push(70)
      continue
    }
    if (
      standardArray[i] - 9 < testArray[i] &&
      testArray[i] < standardArray[i] + 9
    ) {
      scoreArray_relax.push(60)
      continue
    }
    if (
      standardArray[i] - 10 < testArray[i] &&
      testArray[i] < standardArray[i] + 10
    ) {
      scoreArray_relax.push(50)
      continue
    } else {
      scoreArray_relax.push(0)
    }
  }

  for (let i = 30; i <= 44; i++) {
    if (
      standardArray[i] - 1 < testArray[i] &&
      testArray[i] < standardArray[i] + 1
    ) {
      scoreArray_relax.push(100)
      continue
    }
    if (
      standardArray[i] - 3 < testArray[i] &&
      testArray[i] < standardArray[i] + 3
    ) {
      scoreArray_relax.push(95)
      continue
    }
    if (
      standardArray[i] - 4.5 < testArray[i] &&
      testArray[i] < standardArray[i] + 4.5
    ) {
      scoreArray_relax.push(90)
      continue
    }
    if (
      standardArray[i] - 7 < testArray[i] &&
      testArray[i] < standardArray[i] + 7
    ) {
      scoreArray_relax.push(80)
      continue
    }
    if (
      standardArray[i] - 8 < testArray[i] &&
      testArray[i] < standardArray[i] + 8
    ) {
      scoreArray_relax.push(70)
      continue
    }
    if (
      standardArray[i] - 9 < testArray[i] &&
      testArray[i] < standardArray[i] + 9
    ) {
      scoreArray_relax.push(60)
      continue
    }
    if (
      standardArray[i] - 10 < testArray[i] &&
      testArray[i] < standardArray[i] + 10
    ) {
      scoreArray_relax.push(50)
      continue
    } else {
      scoreArray_relax.push(0)
    }
  }

  for (let i = 60; i <= 74; i++) {
    if (
      standardArray[i] - 1 < testArray[i] &&
      testArray[i] < standardArray[i] + 1
    ) {
      scoreArray_relax.push(100)
      continue
    }
    if (
      standardArray[i] - 3 < testArray[i] &&
      testArray[i] < standardArray[i] + 3
    ) {
      scoreArray_relax.push(95)
      continue
    }
    if (
      standardArray[i] - 4.5 < testArray[i] &&
      testArray[i] < standardArray[i] + 4.5
    ) {
      scoreArray_relax.push(90)
      continue
    }
    if (
      standardArray[i] - 7 < testArray[i] &&
      testArray[i] < standardArray[i] + 7
    ) {
      scoreArray_relax.push(80)
      continue
    }
    if (
      standardArray[i] - 8 < testArray[i] &&
      testArray[i] < standardArray[i] + 8
    ) {
      scoreArray_relax.push(70)
      continue
    }
    if (
      standardArray[i] - 9 < testArray[i] &&
      testArray[i] < standardArray[i] + 9
    ) {
      scoreArray_relax.push(60)
      continue
    }
    if (
      standardArray[i] - 10 < testArray[i] &&
      testArray[i] < standardArray[i] + 10
    ) {
      scoreArray_relax.push(50)
      continue
    } else {
      scoreArray_relax.push(0)
    }
  }

  for (let i = 90; i <= 104; i++) {
    if (
      standardArray[i] - 1 < testArray[i] &&
      testArray[i] < standardArray[i] + 1
    ) {
      scoreArray_relax.push(100)
      continue
    }
    if (
      standardArray[i] - 3 < testArray[i] &&
      testArray[i] < standardArray[i] + 3
    ) {
      scoreArray_relax.push(95)
      continue
    }
    if (
      standardArray[i] - 4.5 < testArray[i] &&
      testArray[i] < standardArray[i] + 4.5
    ) {
      scoreArray_relax.push(90)
      continue
    }
    if (
      standardArray[i] - 7 < testArray[i] &&
      testArray[i] < standardArray[i] + 7
    ) {
      scoreArray_relax.push(80)
      continue
    }
    if (
      standardArray[i] - 8 < testArray[i] &&
      testArray[i] < standardArray[i] + 8
    ) {
      scoreArray_relax.push(70)
      continue
    }
    if (
      standardArray[i] - 9 < testArray[i] &&
      testArray[i] < standardArray[i] + 9
    ) {
      scoreArray_relax.push(60)
      continue
    }
    if (
      standardArray[i] - 10 < testArray[i] &&
      testArray[i] < standardArray[i] + 10
    ) {
      scoreArray_relax.push(50)
      continue
    } else {
      scoreArray_relax.push(0)
    }
  }
  for (let i = 120; i <= 134; i++) {
    if (
      standardArray[i] - 1 < testArray[i] &&
      testArray[i] < standardArray[i] + 1
    ) {
      scoreArray_relax.push(100)
      continue
    }
    if (
      standardArray[i] - 3 < testArray[i] &&
      testArray[i] < standardArray[i] + 3
    ) {
      scoreArray_relax.push(95)
      continue
    }
    if (
      standardArray[i] - 4.5 < testArray[i] &&
      testArray[i] < standardArray[i] + 4.5
    ) {
      scoreArray_relax.push(90)
      continue
    }
    if (
      standardArray[i] - 7 < testArray[i] &&
      testArray[i] < standardArray[i] + 7
    ) {
      scoreArray_relax.push(80)
      continue
    }
    if (
      standardArray[i] - 8 < testArray[i] &&
      testArray[i] < standardArray[i] + 8
    ) {
      scoreArray_relax.push(70)
      continue
    }
    if (
      standardArray[i] - 9 < testArray[i] &&
      testArray[i] < standardArray[i] + 9
    ) {
      scoreArray_relax.push(60)
      continue
    }
    if (
      standardArray[i] - 10 < testArray[i] &&
      testArray[i] < standardArray[i] + 10
    ) {
      scoreArray_relax.push(50)
      continue
    } else {
      scoreArray_relax.push(0)
    }
  }
  for (let i = 150; i <= 179; i++) {
    if (
      standardArray[i] - 1 < testArray[i] &&
      testArray[i] < standardArray[i] + 1
    ) {
      scoreArray_relax.push(100)
      continue
    }
    if (
      standardArray[i] - 3 < testArray[i] &&
      testArray[i] < standardArray[i] + 3
    ) {
      scoreArray_relax.push(95)
      continue
    }
    if (
      standardArray[i] - 4.5 < testArray[i] &&
      testArray[i] < standardArray[i] + 4.5
    ) {
      scoreArray_relax.push(90)
      continue
    }
    if (
      standardArray[i] - 7 < testArray[i] &&
      testArray[i] < standardArray[i] + 7
    ) {
      scoreArray_relax.push(80)
      continue
    }
    if (
      standardArray[i] - 8 < testArray[i] &&
      testArray[i] < standardArray[i] + 8
    ) {
      scoreArray_relax.push(70)
      continue
    }
    if (
      standardArray[i] - 9 < testArray[i] &&
      testArray[i] < standardArray[i] + 9
    ) {
      scoreArray_relax.push(60)
      continue
    }
    if (
      standardArray[i] - 10 < testArray[i] &&
      testArray[i] < standardArray[i] + 10
    ) {
      scoreArray_relax.push(50)
      continue
    } else {
      scoreArray_relax.push(0)
    }
  }
  for (let i = 0; i < scoreArray_relax.length; i++) {
    score_relax = scoreArray_relax[i] + score_relax
  }
  score_relax = (score_relax / scoreArray_relax.length).toFixed(2)
  //放松部分
  //收缩速率部分
  for (let i = 14; i <= 22; i++) {
    if (
      standardArray[i] - 5 < testArray[i] &&
      testArray[i] < standardArray[i] + 5
    ) {
      scoreArray_shrink_rate.push(100)
      continue
    }
    if (
      standardArray[i] - 7 < testArray[i] &&
      testArray[i] < standardArray[i] + 7
    ) {
      scoreArray_shrink_rate.push(95)
      continue
    }
    if (
      standardArray[i] - 10 < testArray[i] &&
      testArray[i] < standardArray[i] + 10
    ) {
      scoreArray_shrink_rate.push(90)
      continue
    }
    if (
      standardArray[i] - 12 < testArray[i] &&
      testArray[i] < standardArray[i] + 12
    ) {
      scoreArray_shrink_rate.push(80)
      continue
    }
    if (
      standardArray[i] - 15 < testArray[i] &&
      testArray[i] < standardArray[i] + 15
    ) {
      scoreArray_shrink_rate.push(70)
      continue
    }
    if (
      standardArray[i] - 20 < testArray[i] &&
      testArray[i] < standardArray[i] + 20
    ) {
      scoreArray_shrink_rate.push(60)
      continue
    }
    if (testArray[i] > 30 && testArray[i] <= 30) {
      scoreArray_shrink_rate.push(50)
      continue
    } else {
      scoreArray_shrink_rate.push(0)
    }
  }
  for (let i = 44; i <= 52; i++) {
    if (
      standardArray[i] - 5 < testArray[i] &&
      testArray[i] < standardArray[i] + 5
    ) {
      scoreArray_shrink_rate.push(100)
      continue
    }
    if (
      standardArray[i] - 7 < testArray[i] &&
      testArray[i] < standardArray[i] + 7
    ) {
      scoreArray_shrink_rate.push(95)
      continue
    }
    if (
      standardArray[i] - 10 < testArray[i] &&
      testArray[i] < standardArray[i] + 10
    ) {
      scoreArray_shrink_rate.push(90)
      continue
    }
    if (
      standardArray[i] - 12 < testArray[i] &&
      testArray[i] < standardArray[i] + 12
    ) {
      scoreArray_shrink_rate.push(80)
      continue
    }
    if (
      standardArray[i] - 15 < testArray[i] &&
      testArray[i] < standardArray[i] + 15
    ) {
      scoreArray_shrink_rate.push(70)
      continue
    }
    if (
      standardArray[i] - 20 < testArray[i] &&
      testArray[i] < standardArray[i] + 20
    ) {
      scoreArray_shrink_rate.push(60)
      continue
    }
    if (testArray[i] > 30 && testArray[i] <= 30) {
      scoreArray_shrink_rate.push(50)
      continue
    } else {
      scoreArray_shrink_rate.push(0)
    }
  }
  for (let i = 74; i <= 82; i++) {
    if (
      standardArray[i] - 5 < testArray[i] &&
      testArray[i] < standardArray[i] + 5
    ) {
      scoreArray_shrink_rate.push(100)
      continue
    }
    if (
      standardArray[i] - 7 < testArray[i] &&
      testArray[i] < standardArray[i] + 7
    ) {
      scoreArray_shrink_rate.push(95)
      continue
    }
    if (
      standardArray[i] - 10 < testArray[i] &&
      testArray[i] < standardArray[i] + 10
    ) {
      scoreArray_shrink_rate.push(90)
      continue
    }
    if (
      standardArray[i] - 12 < testArray[i] &&
      testArray[i] < standardArray[i] + 12
    ) {
      scoreArray_shrink_rate.push(80)
      continue
    }
    if (
      standardArray[i] - 15 < testArray[i] &&
      testArray[i] < standardArray[i] + 15
    ) {
      scoreArray_shrink_rate.push(70)
      continue
    }
    if (
      standardArray[i] - 20 < testArray[i] &&
      testArray[i] < standardArray[i] + 20
    ) {
      scoreArray_shrink_rate.push(60)
      continue
    }
    if (testArray[i] > 30 && testArray[i] <= 30) {
      scoreArray_shrink_rate.push(50)
      continue
    } else {
      scoreArray_shrink_rate.push(0)
    }
  }
  for (let i = 104; i <= 112; i++) {
    if (
      standardArray[i] - 5 < testArray[i] &&
      testArray[i] < standardArray[i] + 5
    ) {
      scoreArray_shrink_rate.push(100)
      continue
    }
    if (
      standardArray[i] - 7 < testArray[i] &&
      testArray[i] < standardArray[i] + 7
    ) {
      scoreArray_shrink_rate.push(95)
      continue
    }
    if (
      standardArray[i] - 10 < testArray[i] &&
      testArray[i] < standardArray[i] + 10
    ) {
      scoreArray_shrink_rate.push(90)
      continue
    }
    if (
      standardArray[i] - 12 < testArray[i] &&
      testArray[i] < standardArray[i] + 12
    ) {
      scoreArray_shrink_rate.push(80)
      continue
    }
    if (
      standardArray[i] - 15 < testArray[i] &&
      testArray[i] < standardArray[i] + 15
    ) {
      scoreArray_shrink_rate.push(70)
      continue
    }
    if (
      standardArray[i] - 20 < testArray[i] &&
      testArray[i] < standardArray[i] + 20
    ) {
      scoreArray_shrink_rate.push(60)
      continue
    }
    if (testArray[i] > 30 && testArray[i] <= 30) {
      scoreArray_shrink_rate.push(50)
      continue
    } else {
      scoreArray_shrink_rate.push(0)
    }
  }
  for (let i = 134; i <= 142; i++) {
    if (
      standardArray[i] - 5 < testArray[i] &&
      testArray[i] < standardArray[i] + 5
    ) {
      scoreArray_shrink_rate.push(100)
      continue
    }
    if (
      standardArray[i] - 7 < testArray[i] &&
      testArray[i] < standardArray[i] + 7
    ) {
      scoreArray_shrink_rate.push(95)
      continue
    }
    if (
      standardArray[i] - 10 < testArray[i] &&
      testArray[i] < standardArray[i] + 10
    ) {
      scoreArray_shrink_rate.push(90)
      continue
    }
    if (
      standardArray[i] - 12 < testArray[i] &&
      testArray[i] < standardArray[i] + 12
    ) {
      scoreArray_shrink_rate.push(80)
      continue
    }
    if (
      standardArray[i] - 15 < testArray[i] &&
      testArray[i] < standardArray[i] + 15
    ) {
      scoreArray_shrink_rate.push(70)
      continue
    }
    if (
      standardArray[i] - 20 < testArray[i] &&
      testArray[i] < standardArray[i] + 20
    ) {
      scoreArray_shrink_rate.push(60)
      continue
    }
    if (testArray[i] > 30 && testArray[i] <= 30) {
      scoreArray_shrink_rate.push(50)
      continue
    } else {
      scoreArray_shrink_rate.push(0)
    }
  }
  for (let i = 0; i < scoreArray_shrink_rate.length; i++) {
    score_shrink_rate = scoreArray_shrink_rate[i] + score_shrink_rate
  }
  score_shrink_rate = (
    score_shrink_rate / scoreArray_shrink_rate.length
  ).toFixed(2)
  //收缩速率部分

  //收缩高度
  array_height.push(Math.max.apply(null, testArray.slice(15, 29)))
  array_height.push(Math.max.apply(null, testArray.slice(45, 59)))
  array_height.push(Math.max.apply(null, testArray.slice(75, 89)))
  array_height.push(Math.max.apply(null, testArray.slice(105, 119)))
  array_height.push(Math.max.apply(null, testArray.slice(135, 149)))
  for (let i = 0; i < array_height.length; i++) {
    if (array_height[i] >= 100) {
      scoreArray_height.push(100)
      continue
    }
    if (array_height[i]<= 0) {
      scoreArray_height.push(0)
      continue
    } else {
      scoreArray_height.push(array_height[i])
    }
  }
  for (let i = 0; i < scoreArray_height.length; i++) {
    score_height = scoreArray_height[i] + score_height
  }
  score_height = (score_height / scoreArray_height.length).toFixed(2)
  //收缩高度
  data = [
    score_relax,
    score_keep,
    score_shrink,
    score_loosen,
    score_shrink_rate,
    score_height
  ]
  return data
}
