// 先读出来日期，输出
// 再从日期里面读出来下面的学员名单，输出json
// 遍历学员里面的时间表（判断一下），并且返还完成率
// 遍历时间表的过程种，还要返还读取的时间表的具体内容，方便神经网络的训练


// 230525更新，需要设置一个等待，不然访问服务器太频繁，会报错。。。。

const feishureader  = require('../230424读学员函数合集/访问文件夹并返回JSON函数')

// 先读出来日期，输出
const usertoken = 'u-2MtJBoLIR4jVeAKNAbreszk42inN049bMMG00gA006Lq'
const month_number = '5'
const outpufile_alldates = './230511JSON-'+month_number+'月学员数据/a日期文件夹/230511尝试.json'
feishureader('fldcnYbmY9Wa5jeR8Jjnd1LpnJd',usertoken, outpufile_alldates)  // 在每个月开头用,可以用个if判断一下是否存在


// 再从日期里面读出来下面的学员名单，输出json
const readJSON = require('../230424读学员函数合集/读JSON函数')
console.log(readJSON(outpufile_alldates))
const namesArr_date = readJSON(outpufile_alldates).namesArr 
const tokensArr_date = readJSON(outpufile_alldates).tokensArr 

// 写一个循环，把参数传进去 // 使用 while 遍历列表
let i = 0;
while (i < tokensArr_date.length) {
console.log("Name:", namesArr_date[i]);
console.log("Token:", tokensArr_date[i]);

// 使用函数
feishureader(tokensArr_date[i],usertoken,'./230511JSON-'+month_number+'月学员数据/b单个学员文件夹/'+namesArr_date[i]+'.json')
i++;
}


// 再准备先直接输出各个表格
