const fs = require('fs');
const iconv = require('iconv-lite');

function readJSON(foldername){
    // 读取 JSON 文件
    const jsonData = fs.readFileSync(foldername , 'utf-8');
    // 解析成 JavaScript 对象
    const dataObj = JSON.parse(jsonData);

    // 提取 "name" 属性并放入数组中
    const namesArr = [];
    const tokensArr = []

    for (let i = 0; i < dataObj.length; i++) {
    namesArr.push(dataObj[i].name);
    tokensArr.push(dataObj[i].token);
    }

    // 使用 while 遍历列表
    let i = 0;
    while (i < namesArr.length) {
    console.log("Name:", namesArr[i]);
    console.log("Token:", tokensArr[i]);
    i++;

    return{
        namesArr,
        tokensArr
    }
}}

module.exports = readJSON