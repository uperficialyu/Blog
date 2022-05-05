const arr1 = [
  {date: '2022-01-03', startTime: '09:53', endtime: '18.08', week: '周一元旦假期加班' },
  {date: '2022-01-04', startTime: '08:37', endtime: '22.17', week: '周二' },
  {date: '2022-01-05', startTime: '09:23', endtime: '19.29', week: '周三' },
  {date: '2022-01-06', startTime: '08:43', endtime: '19.03', week: '周四' },
  {date: '2022-01-07', startTime: '13:17', endtime: '19.22', week: '周五' },
  {date: '2022-01-08', startTime: '10:32', endtime: '20.36', week: '周六假期加班' },
  {date: '2022-01-09', startTime: '10:24', endtime: '20.25', week: '周日假期加班' },
  {date: '2022-01-10', startTime: '08:30', endtime: '22.10', week: '周一' },
  {date: '2022-01-11', startTime: '09:40', endtime: '22.11', week: '周二' },
  {date: '2022-01-12', startTime: '09:33', endtime: '19.41', week: '周三' },
  {date: '2022-01-13', startTime: '08:47', endtime: '22.15', week: '周四' },
  {date: '2022-01-14', startTime: '09:43', endtime: '19.06', week: '周五' },
  {date: '2022-01-15', startTime: '09:17', endtime: '21.36', week: '周六假期加班' },
  {date: '2022-01-16', startTime: '12:18', endtime: '22.47', week: '周日假期加班' },
  {date: '2022-01-17', startTime: '08:47', endtime: '22.55', week: '周一' },
  {date: '2022-01-18', startTime: '11:55', endtime: '22.33', week: '周二' },
  {date: '2022-01-19', startTime: '09:35', endtime: '08.47', week: '周三' },
  {date: '2022-01-20', startTime: '08:39', endtime: '01.19', week: '周四' },
  {date: '2022-01-21', startTime: '09:38', endtime: '18.06', week: '周五' },
  {date: '2022-01-25', startTime: '08:20', endtime: '19.47', week: '周二' },
  {date: '2022-01-26', startTime: '08:33', endtime: '22.02', week: '周三' },
  {date: '2022-01-27', startTime: '12:10', endtime: '18.38', week: '周四' },
  {date: '2022-01-28', startTime: '08:24', endtime: '18.01', week: '周五' },
]

const arr2 = [
  {date: '2022-02-08', startTime: '07:59', endtime: '19.21', week: '周二' },
  {date: '2022-02-09', startTime: '08:38', endtime: '19.41', week: '周三' },
  {date: '2022-02-10', startTime: '09:21', endtime: '22.05', week: '周四' },
  {date: '2022-02-11', startTime: '09:35', endtime: '19.15', week: '周五' },
  {date: '2022-02-12', startTime: '10:44', endtime: '22.07', week: '周六假期加班' },
  {date: '2022-02-13', startTime: '10:15', endtime: '01.21', week: '周日假期加班' },
  {date: '2022-02-15', startTime: '08:24', endtime: '18.36', week: '周二' },
  {date: '2022-02-16', startTime: '08:49', endtime: '22.08', week: '周三' },
  {date: '2022-02-17', startTime: '09:22', endtime: '22.11', week: '周四' },
  {date: '2022-02-18', startTime: '09:20', endtime: '06.04', week: '周五' },
  {date: '2022-02-22', startTime: '08:33', endtime: '19.20', week: '周二' },
  {date: '2022-02-23', startTime: '08:42', endtime: '22.07', week: '周三' },
  {date: '2022-02-24', startTime: '08:53', endtime: '22.01', week: '周四' },
  {date: '2022-02-25', startTime: '09:41', endtime: '23.54', week: '周五' },
  {date: '2022-02-26', startTime: '11:17', endtime: '22.24', week: '周六假期加班' },
  {date: '2022-02-27', startTime: '11:43', endtime: '22.24', week: '周日假期加班' },
]

const arr4 = [
  {date: '2022-04-01', startTime: '08:38', endtime: '18.16', week: '周五' },
  {date: '2022-04-02', startTime: '08:27', endtime: '19.14', week: '周六假期补班' },
  {date: '2022-04-05', startTime: '08:27', endtime: '21.45', week: '清明加班' },
  {date: '2022-04-06', startTime: '08:41', endtime: '22.03', week: '周三' },
  {date: '2022-04-07', startTime: '09:43', endtime: '22.06', week: '周四' },
  {date: '2022-04-08', startTime: '09:51', endtime: '22.03', week: '周五' },
  {date: '2022-04-09', startTime: '09:55', endtime: '22.00', week: '周六假期加班' },
  {date: '2022-04-11', startTime: '13:08', endtime: '19.00', week: '周一' },
  {date: '2022-04-12', startTime: '13:02', endtime: '22.58', week: '周二' },
  {date: '2022-04-13', startTime: '09:34', endtime: '22.00', week: '周三' },
  {date: '2022-04-14', startTime: '09:35', endtime: '22.25', week: '周四' },
  {date: '2022-04-15', startTime: '09:48', endtime: '21.30', week: '周五' },
  {date: '2022-04-18', startTime: '08:48', endtime: '21.35', week: '周一' },
  {date: '2022-04-19', startTime: '13:17', endtime: '22.01', week: '周二' },
  {date: '2022-04-20', startTime: '09:39', endtime: '22.02', week: '周三' },
  {date: '2022-04-21', startTime: '09:46', endtime: '19.12', week: '周四' },
  {date: '2022-04-22', startTime: '06:25', endtime: '18.04', week: '周五' },
  {date: '2022-04-23', startTime: '10:48', endtime: '18.59', week: '周六假期加班' },
  {date: '2022-04-24', startTime: '08:44', endtime: '22.16', week: '周日假期补班' },
  {date: '2022-04-25', startTime: '09:29', endtime: '22.06', week: '周一' },
  {date: '2022-04-26', startTime: '09:41', endtime: '22.16', week: '周二' },
  {date: '2022-04-27', startTime: '09:41', endtime: '18.15', week: '周三' },
  {date: '2022-04-28', startTime: '07:36', endtime: '22.07', week: '周四' },
]

function workOvertime(arr) {
  let sum = 0;
  let sum1 = 0;
  arr.forEach(item => {
    if(item.endtime.includes('22.')) {
      sum++
    }
    if(item.week.includes('加班')) {
      sum1++
    }
  })
  console.log(`22点以后下班的天数为${sum}天`);
  console.log(`周末加班的天数为${sum1}天`);
}

workOvertime(arr4);