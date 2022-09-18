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
  {date: '2022-01-19', startTime: '09:35', endtime: '凌晨08.47', week: '周三' },
  {date: '2022-01-20', startTime: '08:39', endtime: '凌晨01.19', week: '周四' },
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
  {date: '2022-02-13', startTime: '10:15', endtime: '凌晨01.21', week: '周日假期加班' },
  {date: '2022-02-15', startTime: '08:24', endtime: '18.36', week: '周二' },
  {date: '2022-02-16', startTime: '08:49', endtime: '22.08', week: '周三' },
  {date: '2022-02-17', startTime: '09:22', endtime: '22.11', week: '周四' },
  {date: '2022-02-18', startTime: '09:20', endtime: '凌晨06.04', week: '周五' },
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

const arr5 = [
  {date: '2022-05-05', startTime: '08:51', endtime: '19.08', week: '周四' },
  {date: '2022-05-06', startTime: '08:45', endtime: '19.31', week: '周五' },
  {date: '2022-05-07', startTime: '08:49', endtime: '20.33', week: '周六假期加班' },
  {date: '2022-05-09', startTime: '13:21', endtime: '19.14', week: '周一' },
  {date: '2022-05-10', startTime: '12:38', endtime: '19.01', week: '周二' },
  {date: '2022-05-11', startTime: '08:33', endtime: '22.00', week: '周三' },
  {date: '2022-05-12', startTime: '09:43', endtime: '20.57', week: '周四' },
  {date: '2022-05-13', startTime: '13:13', endtime: '19.31', week: '周五' },
  {date: '2022-05-16', startTime: '08:55', endtime: '22.01', week: '周一' },
  {date: '2022-05-17', startTime: '09:49', endtime: '凌晨00.03', week: '周二' },
  {date: '2022-05-18', startTime: '13:16', endtime: '18.16', week: '周三' },
  {date: '2022-05-19', startTime: '08:55', endtime: '18.12', week: '周四' },
  {date: '2022-05-20', startTime: '08:59', endtime: '21.46', week: '周五' },
  {date: '2022-05-23', startTime: '08:52', endtime: '20.31', week: '周一' },
  {date: '2022-05-24', startTime: '08:58', endtime: '22.05', week: '周二' },
  {date: '2022-05-25', startTime: '09:38', endtime: '18.22', week: '周三' },
  {date: '2022-05-26', startTime: '08:40', endtime: '22.17', week: '周四' },
  {date: '2022-05-27', startTime: '09:38', endtime: '20.00', week: '周五' },
  {date: '2022-05-29', startTime: '16:54', endtime: '21.18', week: '周日假期加班' },
  {date: '2022-05-30', startTime: '08:51', endtime: '22.02', week: '周一' },
  {date: '2022-05-31', startTime: '09:42', endtime: '20.03', week: '周二' },
]

const arr6 = [
  {date: '2022-06-01', startTime: '01:00', endtime: '18.32', week: '周三' },
  {date: '2022-06-02', startTime: '08:24', endtime: '21.58', week: '周四' },
  {date: '2022-06-06', startTime: '08:31', endtime: '22.02', week: '周一' },
  {date: '2022-06-07', startTime: '09:36', endtime: '20.09', week: '周二' },
  {date: '2022-06-08', startTime: '08:42', endtime: '22.05', week: '周三' },
  {date: '2022-06-09', startTime: '09:37', endtime: '20.28', week: '周四' },
  {date: '2022-06-10', startTime: '08:45', endtime: '18.09', week: '周五' },
  {date: '2022-06-11', startTime: '15:39', endtime: '21.51', week: '周六假期加班' },
  {date: '2022-06-12', startTime: '10:31', endtime: '21.44', week: '周日假期加班' },
  {date: '2022-06-13', startTime: '08:45', endtime: '22.02', week: '周一' },
  {date: '2022-06-14', startTime: '09:47', endtime: '18.08', week: '周二' },
  {date: '2022-06-15', startTime: '08:43', endtime: '22.01', week: '周三' },
  {date: '2022-06-16', startTime: '09:37', endtime: '22.01', week: '周四' },
  {date: '2022-06-17', startTime: '13:11', endtime: '19.42', week: '周五' },
  {date: '2022-06-19', startTime: '10:38', endtime: '23.06', week: '周日假期加班' },
  {date: '2022-06-20', startTime: '09:23', endtime: '凌晨00.02', week: '周一' },
  {date: '2022-06-21', startTime: '09:35', endtime: '22.38', week: '周二' },
  {date: '2022-06-22', startTime: '13:08', endtime: '18.33', week: '周三' },
  {date: '2022-06-23', startTime: '08:40', endtime: '19.21', week: '周四' },
  {date: '2022-06-24', startTime: '08:39', endtime: '21.38', week: '周五' },
  {date: '2022-06-26', startTime: '07:36', endtime: '20.43', week: '周日假期加班' },
  {date: '2022-06-27', startTime: '08:40', endtime: '22.01', week: '周一' },
  {date: '2022-06-28', startTime: '09:33', endtime: '22.02', week: '周二' },
  {date: '2022-06-29', startTime: '09:35', endtime: '22.01', week: '周三' },
  {date: '2022-06-30', startTime: '09:36', endtime: '22.11', week: '周四' },
]

const arr7 = [
  {date: '2022-07-01', startTime: '09:40', endtime: '21.30', week: '周五' },
  {date: '2022-07-04', startTime: '08:33', endtime: '22.02', week: '周一' },
  {date: '2022-07-05', startTime: '09:35', endtime: '凌晨02.02', week: '周二' },
  {date: '2022-07-07', startTime: '08:20', endtime: '19.01', week: '周四' },
  {date: '2022-07-08', startTime: '08:43', endtime: '19.40', week: '周五' },
  {date: '2022-07-11', startTime: '08:31', endtime: '22.05', week: '周一' },
  {date: '2022-07-12', startTime: '09:30', endtime: '19.25', week: '周二' },
  {date: '2022-07-13', startTime: '19:59', endtime: '19.25', week: '周三' },
  {date: '2022-07-14', startTime: '13:02', endtime: '22.01', week: '周四' },
  {date: '2022-07-15', startTime: '09:30', endtime: '21.31', week: '周五' },
  {date: '2022-07-18', startTime: '08:35', endtime: '22.03', week: '周一' },
  {date: '2022-07-19', startTime: '09:43', endtime: '22.01', week: '周二' },
  {date: '2022-07-20', startTime: '09:29', endtime: '22.02', week: '周三' },
  {date: '2022-07-21', startTime: '09:30', endtime: '凌晨00.30', week: '周四' },
  {date: '2022-07-22', startTime: '09:29', endtime: '18.08', week: '周五' },
  {date: '2022-07-23', startTime: '08:36', endtime: '19.38', week: '周六假期加班' },
  {date: '2022-07-24', startTime: '05:16', endtime: '19.38', week: '周日假期加班' },
  {date: '2022-07-25', startTime: '08:31', endtime: '凌晨00.04', week: '周一' },
  {date: '2022-07-26', startTime: '09:35', endtime: '22.04', week: '周二' },
  {date: '2022-07-27', startTime: '09:24', endtime: '22.02', week: '周三' },
  {date: '2022-07-28', startTime: '09:38', endtime: '凌晨03.22', week: '周四' },
]

const arr8 = [
  {date: '2022-08-01', startTime: '07:07', endtime: '20.38', week: '周一' },
  {date: '2022-08-02', startTime: '07:23', endtime: '19.00', week: '周二' },
  {date: '2022-08-03', startTime: '06:59', endtime: '22.19', week: '周三' },
  {date: '2022-08-04', startTime: '08:57', endtime: '23.24', week: '周四' },
  {date: '2022-08-05', startTime: '07:20', endtime: '19.04', week: '周五' },
  {date: '2022-08-08', startTime: '07:04', endtime: '19.13', week: '周一' },
  {date: '2022-08-09', startTime: '07:19', endtime: '18.26', week: '周二' },
  {date: '2022-08-10', startTime: '07:23', endtime: '20.14', week: '周三' },
  {date: '2022-08-11', startTime: '07:32', endtime: '22.07', week: '周四' },
  {date: '2022-08-15', startTime: '06:59', endtime: '21.30', week: '周一' },
  {date: '2022-08-16', startTime: '08:13', endtime: '21.32', week: '周二' },
  {date: '2022-08-17', startTime: '07:24', endtime: '21.34', week: '周三' },
  {date: '2022-08-18', startTime: '07:40', endtime: '21.37', week: '周四' },
  {date: '2022-08-19', startTime: '08:02', endtime: '22.56', week: '周五' },
  {date: '2022-08-22', startTime: '07:37', endtime: '19.03', week: '周一' },
  {date: '2022-08-23', startTime: '07:01', endtime: '19.19', week: '周二' },
  {date: '2022-08-24', startTime: '07:38', endtime: '19.02', week: '周三' },
  {date: '2022-08-25', startTime: '08:21', endtime: '19.28', week: '周四' },
  {date: '2022-08-26', startTime: '08:19', endtime: '22.40', week: '周五' },
  {date: '2022-08-29', startTime: '07:33', endtime: '19.01', week: '周一' },
  {date: '2022-08-30', startTime: '08:23', endtime: '19.36', week: '周二' },
  {date: '2022-08-31', startTime: '07:21', endtime: '凌晨00.04', week: '周三' },
]

const arr9 = [
  {date: '2022-09-01', startTime: '03:30', endtime: '18.06', week: '周四' },
  {date: '2022-09-02', startTime: '08:15', endtime: '22.43', week: '周五' },
  {date: '2022-09-04', startTime: '08:46', endtime: '17.13', week: '周日假期加班' },
  {date: '2022-09-06', startTime: '08:38', endtime: '凌晨00.01', week: '周二' },
  {date: '2022-09-07', startTime: '07:26', endtime: '21.30', week: '周三' },
  {date: '2022-09-08', startTime: '08:34', endtime: '凌晨01.02', week: '周四' },
  {date: '2022-09-09', startTime: '04:27', endtime: '23.11', week: '周五' },
  {date: '2022-09-12', startTime: '08:31', endtime: '23.32', week: '周一中秋假期加班' },
  {date: '2022-09-13', startTime: '06:51', endtime: '凌晨00.16', week: '周二' },
  {date: '2022-09-14', startTime: '07:41', endtime: '22.00', week: '周三' },
  {date: '2022-09-15', startTime: '09:46', endtime: '22.01', week: '周四' },
  {date: '2022-09-16', startTime: '09:15', endtime: '23.46', week: '周五' },

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