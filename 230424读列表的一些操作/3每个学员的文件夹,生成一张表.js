
// 就是开始异步访问所有的表格了,读到真正的数据,才把JSON文件写出去 

// 遍历学员的文件夹，判断是不是时间表
const readJSON = require('../230424读学员函数合集/读JSON函数')
const feishureader = require('../230424读学员函数合集/访问文件夹并返回JSON函数')
const fs = require('fs');
const path = require('path');


const usertoken = 'u-2MtJBoLIR4jVeAKNAbreszk42inN049bMMG00gA006Lq'
const month_number = '5'
// 获得日期文件

const directory_root = './230511JSON-'+month_number+'月学员数据'
const directoryPath = directory_root + '/b单个学员文件夹/';
const filelist = []
try {
  const files = fs.readdirSync(directoryPath);
  console.log("Files in directory:", files);
  filelist.push(...files)  // 这个。。。很有用，直接不用array套array了
} catch (error) {
  console.error("Error reading directory:", error);
}


// 开始遍历文件夹的循环
let m = 0;
while (m <filelist.length){
    const file_date =  filelist[m].replace(/\.[^/.]+$/, "");
    
    console.log('现在是这个日期:',file_date)
    

    const folder_date= readJSON( directoryPath + filelist[m])
    const namelist = folder_date.namesArr
    const tokenlist = folder_date.tokensArr

    console.log(namelist)
    

// 找到输出文件
let i = 0
while (i< namelist.length){
    const path = require('path');
    const outputFolder = directory_root+'/c每个学员的时间表'+'/'+ file_date
    
    
    const outputFile = namelist[i]+'.json'

    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder);
    }

    const outputfile_xueyuan = path.join(outputFolder, outputFile);
    console.log('打印出来了到：'+outputfile_xueyuan)
    feishureader(tokenlist[i],usertoken,outputfile_xueyuan)
    i++;
}
// 下一步就是读遍历读那些同学的时间表   
    m++
}



