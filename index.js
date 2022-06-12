let obj = {
  caseType: 4,
  expect0b: "预期一",
  expect1b: "预期二",
  expect2b: "预期三",
  name: "标题",
  preconditions: "条件",
  productId: 82,
  requirementId: 21,
  stage: 4,
  step0a: "步骤一",
  step1a: "步骤二",
  step2a: "步骤三",
};

let obj1 = {
  caseType: 4,
  caseSteps: [
    { case: '步骤1', expect: '预期1' },
    { case: '步骤2', expect: '预期2' },
    { case: '步骤3', expect: '预期3' },
  ],
  name: "标题",
  preconditions: "条件",
  productId: 82,
  requirementId: 21,
  stage: 4,
};







// 正转
// let obj2 = {};
// let caseSteps = [];
// for(let i in obj) {
//   if(i.includes('expect')) {
//     if(!caseSteps[i.replace(/[^0-9]/ig,"")]) {
//       caseSteps[i.replace(/[^0-9]/ig,"")] = {};
//       caseSteps[i.replace(/[^0-9]/ig,"")].expect = obj[i];
//     } else {
//       caseSteps[i.replace(/[^0-9]/ig,"")].expect = obj[i];
//     }
//   }
//   if(i.includes('step')) {
//     if(!caseSteps[i.replace(/[^0-9]/ig,"")]) {
//       caseSteps[i.replace(/[^0-9]/ig,"")] = {};
//       caseSteps[i.replace(/[^0-9]/ig,"")].case = obj[i];
//     } else {
//       caseSteps[i.replace(/[^0-9]/ig,"")].case = obj[i];
//     }
//   }
// }
// obj2.caseType = obj.caseType;
// obj2.caseSteps = caseSteps;
// obj2.name = obj.name;
// obj2.preconditions = obj.preconditions;
// obj2.productId = obj.productId;
// obj2.requirementId = obj.requirementId;
// obj2.stage = obj.stage;
// console.log(obj2,'caseSteps')

// 反转
// let obj3 = {...obj1};
// delete obj3.caseSteps;
// obj1.caseSteps.forEach((item, index) => {
//   obj3[`expect${index}b`] = item.expect;
//   obj3[`case${index}a`] = item.case;
// });
// console.log(obj3)