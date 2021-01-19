/*
 * @Author      : 钟焯权
 * @Date        : 2020-11-23 14:04:12
 * @LastEditTime: 2020-12-25 14:33:24
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
  for (let i = 0; i <= 20; i++) {
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
    }
    else {
      scoreArray_relax.push(0)
    }
  }
  for (let i = 120; i <= 139; i++) {
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
    }
    else {
      scoreArray_relax.push(0)
    }
  }
  for (let i = 171; i <= 179; i++) {
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
    }
    else {
      scoreArray_relax.push(0)
    }
  }
  for (let i = 211; i <= 229; i++) {
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
    }
    else {
      scoreArray_relax.push(0)
    }
  }
  for (let i = 0; i < scoreArray_relax.length; i++) {
    score_relax = scoreArray_relax[i] + score_relax
  }
  score_relax = (score_relax / scoreArray_relax.length).toFixed(2)
  //放松部分
  //保持部分
  for (let i = 60; i <= 80; i++) {
    if (
      standardArray[i] - 1 < testArray[i] &&
      testArray[i] < standardArray[i] + 1
    ) {
      scoreArray_keep.push(100)
      continue
    }
    if (
      standardArray[i] - 3 < testArray[i] &&
      testArray[i] < standardArray[i] + 3
    ) {
      scoreArray_keep.push(95)
      continue
    }
    if (
      standardArray[i] - 4.5 < testArray[i] &&
      testArray[i] < standardArray[i] + 4.5
    ) {
      scoreArray_keep.push(90)
      continue
    }
    if (
      standardArray[i] - 7 < testArray[i] &&
      testArray[i] < standardArray[i] + 7
    ) {
      scoreArray_keep.push(80)
      continue
    }
    if (
      standardArray[i] - 8 < testArray[i] &&
      testArray[i] < standardArray[i] + 8
    ) {
      scoreArray_keep.push(70)
      continue
    }
    if (
      standardArray[i] - 9 < testArray[i] &&
      testArray[i] < standardArray[i] + 9
    ) {
      scoreArray_keep.push(60)
      continue
    }
    if (
      standardArray[i] - 10 < testArray[i] &&
      testArray[i] < standardArray[i] + 10
    ) {
      scoreArray_keep.push(50)
      continue
    }
    else {
      scoreArray_keep.push(0)
    }
  }
  for (let i = 0; i < scoreArray_keep.length; i++) {
    score_keep = scoreArray_keep[i] + score_keep
  }
  score_keep = (
    score_keep / scoreArray_keep.length
  ).toFixed(2)
  //保持部分
  //收缩部分
  for (let i = 21; i <= 59; i++) {
    if (
      standardArray[i] - 1 < testArray[i] &&
      testArray[i] < standardArray[i] + 1
    ) {
      scoreArray_shrink.push(100)
      continue
    }
    if (
      standardArray[i] - 3 < testArray[i] &&
      testArray[i] < standardArray[i] + 3
    ) {
      scoreArray_shrink.push(95)
      continue
    }
    if (
      standardArray[i] - 4.5 < testArray[i] &&
      testArray[i] < standardArray[i] + 4.5
    ) {
      scoreArray_shrink.push(90)
      continue
    }
    if (
      standardArray[i] - 7 < testArray[i] &&
      testArray[i] < standardArray[i] + 7
    ) {
      scoreArray_shrink.push(80)
      continue
    }
    if (
      standardArray[i] - 8 < testArray[i] &&
      testArray[i] < standardArray[i] + 8
    ) {
      scoreArray_shrink.push(70)
      continue
    }
    if (
      standardArray[i] - 9 < testArray[i] &&
      testArray[i] < standardArray[i] + 9
    ) {
      scoreArray_shrink.push(60)
      continue
    }
    if (
      standardArray[i] - 10 < testArray[i] &&
      testArray[i] < standardArray[i] + 10
    ) {
      scoreArray_shrink.push(50)
      continue
    } else {
      scoreArray_shrink.push(0)
    }
  }
  for (let i = 140; i <= 155; i++) {
    if (
      standardArray[i] - 1 < testArray[i] &&
      testArray[i] < standardArray[i] + 1
    ) {
      scoreArray_shrink.push(100)
      continue
    }
    if (
      standardArray[i] - 3 < testArray[i] &&
      testArray[i] < standardArray[i] + 3
    ) {
      scoreArray_shrink.push(95)
      continue
    }
    if (
      standardArray[i] - 4.5 < testArray[i] &&
      testArray[i] < standardArray[i] + 4.5
    ) {
      scoreArray_shrink.push(90)
      continue
    }
    if (
      standardArray[i] - 7 < testArray[i] &&
      testArray[i] < standardArray[i] + 7
    ) {
      scoreArray_shrink.push(80)
      continue
    }
    if (
      standardArray[i] - 8 < testArray[i] &&
      testArray[i] < standardArray[i] + 8
    ) {
      scoreArray_shrink.push(70)
      continue
    }
    if (
      standardArray[i] - 9 < testArray[i] &&
      testArray[i] < standardArray[i] + 9
    ) {
      scoreArray_shrink.push(60)
      continue
    }
    if (
      standardArray[i] - 10 < testArray[i] &&
      testArray[i] < standardArray[i] + 10
    ) {
      scoreArray_shrink.push(50)
      continue
    } else {
      scoreArray_shrink.push(0)
    }
  }
  for (let i = 180; i <= 195; i++) {
    if (
      standardArray[i] - 1 < testArray[i] &&
      testArray[i] < standardArray[i] + 1
    ) {
      scoreArray_shrink.push(100)
      continue
    }
    if (
      standardArray[i] - 3 < testArray[i] &&
      testArray[i] < standardArray[i] + 3
    ) {
      scoreArray_shrink.push(95)
      continue
    }
    if (
      standardArray[i] - 4.5 < testArray[i] &&
      testArray[i] < standardArray[i] + 4.5
    ) {
      scoreArray_shrink.push(90)
      continue
    }
    if (
      standardArray[i] - 7 < testArray[i] &&
      testArray[i] < standardArray[i] + 7
    ) {
      scoreArray_shrink.push(80)
      continue
    }
    if (
      standardArray[i] - 8 < testArray[i] &&
      testArray[i] < standardArray[i] + 8
    ) {
      scoreArray_shrink.push(70)
      continue
    }
    if (
      standardArray[i] - 9 < testArray[i] &&
      testArray[i] < standardArray[i] + 9
    ) {
      scoreArray_shrink.push(60)
      continue
    }
    if (
      standardArray[i] - 10 < testArray[i] &&
      testArray[i] < standardArray[i] + 10
    ) {
      scoreArray_shrink.push(50)
      continue
    } else {
      scoreArray_shrink.push(0)
    }
  }
  for (let i = 0; i < scoreArray_shrink.length; i++) {
    score_shrink = scoreArray_shrink[i] + score_shrink
  }
  score_shrink = (
    score_shrink / scoreArray_shrink.length
  ).toFixed(2)
  //收缩速率部分

  //逐渐放松
  for (let i = 81; i <= 119; i++) {
    if (
      standardArray[i] - 1 < testArray[i] &&
      testArray[i] < standardArray[i] + 1
    ) {
      scoreArray_loosen.push(100)
      continue
    }
    if (
      standardArray[i] - 3 < testArray[i] &&
      testArray[i] < standardArray[i] + 3
    ) {
      scoreArray_loosen.push(95)
      continue
    }
    if (
      standardArray[i] - 4.5 < testArray[i] &&
      testArray[i] < standardArray[i] + 4.5
    ) {
      scoreArray_loosen.push(90)
      continue
    }
    if (
      standardArray[i] - 7 < testArray[i] &&
      testArray[i] < standardArray[i] + 7
    ) {
      scoreArray_loosen.push(80)
      continue
    }
    if (
      standardArray[i] - 8 < testArray[i] &&
      testArray[i] < standardArray[i] + 8
    ) {
      scoreArray_loosen.push(70)
      continue
    }
    if (
      standardArray[i] - 9 < testArray[i] &&
      testArray[i] < standardArray[i] + 9
    ) {
      scoreArray_loosen.push(60)
      continue
    }
    if (
      standardArray[i] - 10 < testArray[i] &&
      testArray[i] < standardArray[i] + 10
    ) {
      scoreArray_loosen.push(50)
      continue
    }
    else {
      scoreArray_loosen.push(0)
    }
  }
  for (let i = 156; i <= 170; i++) {
    if (
      standardArray[i] - 1 < testArray[i] &&
      testArray[i] < standardArray[i] + 1
    ) {
      scoreArray_loosen.push(100)
      continue
    }
    if (
      standardArray[i] - 3 < testArray[i] &&
      testArray[i] < standardArray[i] + 3
    ) {
      scoreArray_loosen.push(95)
      continue
    }
    if (
      standardArray[i] - 4.5 < testArray[i] &&
      testArray[i] < standardArray[i] + 4.5
    ) {
      scoreArray_loosen.push(90)
      continue
    }
    if (
      standardArray[i] - 7 < testArray[i] &&
      testArray[i] < standardArray[i] + 7
    ) {
      scoreArray_loosen.push(80)
      continue
    }
    if (
      standardArray[i] - 8 < testArray[i] &&
      testArray[i] < standardArray[i] + 8
    ) {
      scoreArray_loosen.push(70)
      continue
    }
    if (
      standardArray[i] - 9 < testArray[i] &&
      testArray[i] < standardArray[i] + 9
    ) {
      scoreArray_loosen.push(60)
      continue
    }
    if (
      standardArray[i] - 10 < testArray[i] &&
      testArray[i] < standardArray[i] + 10
    ) {
      scoreArray_loosen.push(50)
      continue
    }
    else {
      scoreArray_loosen.push(0)
    }
  }
  for (let i = 196; i <= 210; i++) {
    if (
      standardArray[i] - 1 < testArray[i] &&
      testArray[i] < standardArray[i] + 1
    ) {
      scoreArray_loosen.push(100)
      continue
    }
    if (
      standardArray[i] - 3 < testArray[i] &&
      testArray[i] < standardArray[i] + 3
    ) {
      scoreArray_loosen.push(95)
      continue
    }
    if (
      standardArray[i] - 4.5 < testArray[i] &&
      testArray[i] < standardArray[i] + 4.5
    ) {
      scoreArray_loosen.push(90)
      continue
    }
    if (
      standardArray[i] - 7 < testArray[i] &&
      testArray[i] < standardArray[i] + 7
    ) {
      scoreArray_loosen.push(80)
      continue
    }
    if (
      standardArray[i] - 8 < testArray[i] &&
      testArray[i] < standardArray[i] + 8
    ) {
      scoreArray_loosen.push(70)
      continue
    }
    if (
      standardArray[i] - 9 < testArray[i] &&
      testArray[i] < standardArray[i] + 9
    ) {
      scoreArray_loosen.push(60)
      continue
    }
    if (
      standardArray[i] - 10 < testArray[i] &&
      testArray[i] < standardArray[i] + 10
    ) {
      scoreArray_loosen.push(50)
      continue
    }
    else {
      scoreArray_loosen.push(0)
    }
  }
  for (let i = 0; i < scoreArray_loosen.length; i++) {
    score_loosen = scoreArray_loosen[i] + score_loosen
  }
  score_loosen = (
    score_loosen / scoreArray_loosen.length
  ).toFixed(2)
  //逐渐放松
  data = [score_relax , score_keep , score_shrink , score_loosen , score_shrink_rate , score_height]
  return data
}
