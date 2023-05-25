const readfolder = require('./从JSON读学员文件夹函数')
const feishureader = require('./访问文件夹并返回JSON函数')


// const TimeSheetList = readfolder('学员文件夹.json').tokensArr
// const dateList = readfolder('日期名单.json').tokensArr
const tokensArr = readfolder('hiii.json').tokensArr
const namesArr = readfolder('hiii.json').namesArr

// console.log(TimeSheetList)
// console.log(dateList)

// 写一个循环，把参数传进去 // 使用 while 遍历列表
let i = 0;
while (i < tokensArr.length) {
// console.log("Name:", namesArr[i]);
console.log("Token:", tokensArr[i]);

//使用函数
feishureader(tokensArr[i],'u-0wu_jBN4d21qBcmZkXuEByk42UTh04b3MwG014A007Ku',namesArr[i]+'.json')
i++;
}
