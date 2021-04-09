/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/*
 * @Description: 优秀模板示例数据
 * @Author: jinguoqiang
 * @Date: 2020-04-26 19:14:14
 * @LastEditors: jinguoqiang
 * @LastEditTime: 2020年10月30日17:38:50
 */

export const GameSyncTypeEnum = {
  SYNC: '1',
  DISTRIBUTE: '2',
  BOTH: '3'
}
export const GradeEnum = {
  ONE: 1,
  TWO: 2,
  THREE: 3
}

export const CourseStepEnum = {
  NORMLAL: '1', // 课中作答
  CONCENTRATION: '2', // 专注力游戏
  BIG_GAME: '3' // 大游戏
}

export const AuthorEnum = {
  JGQ: '小明',
  CGC: '小红',
  WQD: '珍妮',
  HJS: '项羽',
  XJT: '小王子'
}

export const SubjectEnum = {
  Math: '数学',
  Chinese: '语文'
}
export const sampleData = [
  {
    name: 'helloworld1',
    title: '场景1',
    description: '第一个场景',
    grade: [GradeEnum.ONE, GradeEnum.TWO, GradeEnum.THREE],
    tip: CourseStepEnum.NORMLAL,
    subject: SubjectEnum.Math,
    author: AuthorEnum.JGQ,
    type: GameSyncTypeEnum.BOTH
  },
  {
    name: 'helloworld2',
    title: '场景2',
    description: '第二个场景',
    grade: [GradeEnum.ONE, GradeEnum.TWO, GradeEnum.THREE],
    tip: CourseStepEnum.NORMLAL,
    subject: SubjectEnum.Math,
    author: AuthorEnum.JGQ,
    type: GameSyncTypeEnum.BOTH
  },
]
