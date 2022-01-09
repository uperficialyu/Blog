const arr12 = [
  {date: '2021-12-01', startTime: '08:09', endtime: '22.01', week: '周三' },
  {date: '2021-12-02', startTime: '09:45', endtime: '22.04', week: '周四' },
  {date: '2021-12-03', startTime: '09:36', endtime: '19.41', week: '周五' },
  {date: '2021-12-03', startTime: '09:36', endtime: '19.41', week: '周五' },
  {date: '2021-12-05', startTime: '10:37', endtime: '20.41', week: '周日假期加班' },
  {date: '2021-12-06', startTime: '08:47', endtime: '22.33', week: '周一' },
  {date: '2021-12-07', startTime: '09:14', endtime: '21.32', week: '周二' },
  {date: '2021-12-08', startTime: '08:49', endtime: '19.20', week: '周三' },
  {date: '2021-12-09', startTime: '08:44', endtime: '01.01', week: '周四' },
  {date: '2021-12-10', startTime: '06:12', endtime: '18.18', week: '周五' },
  {date: '2021-12-13', startTime: '09:55', endtime: '19.12', week: '周一' },
  {date: '2021-12-14', startTime: '08:32', endtime: '00.09', week: '周二' },
  {date: '2021-12-15', startTime: '13:17', endtime: '19.13', week: '周三' },
  {date: '2021-12-16', startTime: '08:19', endtime: '18.08', week: '周四' },
  {date: '2021-12-17', startTime: '08:47', endtime: '22.37', week: '周五' },
  {date: '2021-12-18', startTime: '12:49', endtime: '17.10', week: '周六假期加班' },
  {date: '2021-12-20', startTime: '08:34', endtime: '20.28', week: '周一' },
  {date: '2021-12-22', startTime: '08:57', endtime: '20.39', week: '周三' },
  {date: '2021-12-23', startTime: '08:47', endtime: '22.03', week: '周四' },
  {date: '2021-12-24', startTime: '13:16', endtime: '18.26', week: '周五' },
  {date: '2021-12-27', startTime: '08:44', endtime: '22.13', week: '周一' },
  {date: '2021-12-28', startTime: '09:53', endtime: '22.20', week: '周二' },
  {date: '2021-12-29', startTime: '09:41', endtime: '19.02', week: '周三' },
  {date: '2021-12-30', startTime: '08:43', endtime: '18.25', week: '周四' },
  {date: '2021-12-31', startTime: '08:44', endtime: '18.26', week: '周五' },
];

let nummore22 = 0;
let numless19 = 0;
let nummore0 = 0;
let holiday = 0;

arr12.forEach(item => {
  const endList = item.endtime.split('.');
  const end1 = Number(endList[0]);
  if(end1 >= 22) {
    nummore22 ++;
  } else if(end1 == 18 ) {
    numless19 ++;
  } else if(end1 >22 || end1 < 6) {
    nummore0 ++
  } else if(item.week.includes('加班')) {
    holiday ++;
  }
});

console.log('22点以后下班', nummore22);
console.log('7点前下班', numless19);
console.log('凌晨下班', nummore0);
console.log('节日日加班', holiday);