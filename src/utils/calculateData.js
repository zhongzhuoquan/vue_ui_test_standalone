

/*
 * @Author      : 钟焯权
 * @Date        : 2020-11-23 14:04:12
 * @LastEditTime: 2020-11-23 16:47:55
 * @Description :
 */
export function calculateData(standardArray, testArray) {
  const scoreArray = []
  let score = 0
  for (let i = 0; i < testArray.length; i++) {
    if (standardArray[i] == testArray[i]) {
      scoreArray[i] = 100
      continue
    }
    if (
      standardArray[i] * 0.99 < testArray[i] &&
      testArray[i] < standardArray[i] * 1.01
    ) {
      scoreArray[i] = 95
      continue;
    }
    if (
      standardArray[i] * 0.98 < testArray[i] &&
      testArray[i] < standardArray[i] * 1.02
    ) {
      scoreArray[i] = 90
      continue;
    }
    if (
      standardArray[i] * 0.97 < testArray[i] &&
      testArray[i] < standardArray[i] * 1.03
    ) {
      scoreArray[i] = 85
      continue;
    }
    if (
      standardArray[i] * 0.96 < testArray[i] &&
      testArray[i] < standardArray[i] * 1.04
    ) {
      scoreArray[i] = 75
      continue;
    }
    if (
      standardArray[i] * 0.95 < testArray[i] &&
      testArray[i] < standardArray[i] * 1.05
    ) {
      scoreArray[i] = 60
      continue;
    }
    if (
      standardArray[i] * 0.925 < testArray[i] &&
      testArray[i] < standardArray[i] * 1.075
    ) {
      scoreArray[i] = 30
      continue;
    }
    else{
      scoreArray[i] = 0
    }
  }

  return scoreArray
}
