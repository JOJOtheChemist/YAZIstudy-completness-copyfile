//获得很多日期，然后再继续访问这些文件夹，获得日期里面的学员文件夹

const fs = require('fs');
const iconv = require('iconv-lite');

function namelist(foldername){
    // 读取 JSON 文件
    const jsonData = fs.readFileSync(foldername , 'utf-8');
    // 解析成 JavaScript 对象
    const dataObj = JSON.parse(jsonData);

    console.log(dataObj.data.files[0])
    console.log(dataObj.data.files[0].name)

    console.log(dataObj.data.files[0].token)

    console.log(dataObj.data.files.length)

    // 提取 "name" 属性并放入数组中
    const namesArr = [];
    const tokensArr = []

    for (let i = 0; i < dataObj.data.files.length; i++) {
    namesArr.push(dataObj.data.files[i].name);
    tokensArr.push(dataObj.data.files[i].token);
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

module.exports = namelist

