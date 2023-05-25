// const processsheet = require('../230424读学员函数合集/尝试getsheet函数');

const readJSON = require('../230424读学员函数合集/读JSON函数')
const fs = require('fs');
const path = require('path');

const processsheet = require('../230424读学员函数合集/尝试getsheet函数');


const usertoken = 'u-2MtJBoLIR4jVeAKNAbreszk42inN049bMMG00gA006Lq'

// 这里读取到学员文件json咋读的
// 获得日期文件

const month = '5'
const directoryPath = './230511JSON-'+month+'月学员数据/c每个学员的时间表';
const directoryPath_ML = './230511JSON-'+month+'月学员数据/d神经网络原始文件'
const filelist = []
const filelist_ML = []
try {
  const files = fs.readdirSync(directoryPath);
  console.log("Files in directory:", files);

// Combine directory path and file name for each file
  files.forEach(file => {
    const file_path = path.join(directoryPath, file)
    
    const file_path_ML = path.join(directoryPath_ML, file)

    console.log(file_path)
    filelist.push(file_path);
    filelist_ML.push(file_path_ML);
  });
} catch (error) {
  console.error("Error reading directory:", error);
}
console.log(filelist_ML)

// 继续往下看,这个即用即丢的方法真好啊!以后多用,都用这个看文件夹
let n = 0
const filepath_xueyuan = []

const filepath_xueyuan_ML = []
while (n <filelist.length){
    
  console.log(filelist[n])
    
try {
    const files = fs.readdirSync(filelist[n]);
    console.log("Files in directory:", files);
  
  // Combine directory path and file name for each file
    files.forEach(file => {
      const file_path = path.join(filelist[n], file)
      console.log(file_path)
      filepath_xueyuan.push(file_path);

      
      const file_path_ML = path.join(filelist_ML[n], file)
      console.log(file_path_ML)
      filepath_xueyuan_ML.push(file_path_ML.replace(/\.[^/.]+$/, "") ); // 去除掉后缀名
    });  
  
  } catch (error) {
    console.error("Error reading directory:", error);
  }

  n++
}
console.log('找到了位置吗',filepath_xueyuan_ML) //这里已经找到了,

// 然后把[filepath_xueyuan_ML]里面的都创建文件夹
let p = 0
while(p<filepath_xueyuan_ML.length){
    const _outputFolder = filepath_xueyuan_ML[p]
    if (!fs.existsSync(_outputFolder)) {
    fs.mkdirSync(_outputFolder, { recursive: true });
}
    p++
}



// 开始读那里面每个时间表了
const DELAY_MS = 1000; // set the delay time in milliseconds, adjust as needed

(async () => {
    let q = 0;
    while (q < filepath_xueyuan.length) {
        try {
            const data = readJSON(filepath_xueyuan[q]);
            const filteredNamesArr = data.namesArr.filter(name => name.includes('时间表'));
            const filteredTokensArr = data.tokensArr.filter((_, index) => data.namesArr[index].includes('时间表'));

            console.log(filteredNamesArr);
            console.log(filteredTokensArr);

            let s = 0;
            while (s < filteredNamesArr.length) {
                try {
                    const spreadsheet_token = filteredTokensArr[s];
                    console.log(spreadsheet_token,'---------------!');
                    const singlesheet_output = path.join(filepath_xueyuan_ML[q],filteredNamesArr[s]+'.json')
                    
                    await processsheet(spreadsheet_token, usertoken, singlesheet_output);

                    s++;
                    await new Promise(resolve => setTimeout(resolve, DELAY_MS));
                } catch(error) {
                    console.log('这里可能是个空文件夹', error);
                    s++;
                    await new Promise(resolve => setTimeout(resolve, DELAY_MS));
                }
            }

        } catch(error) {
            console.log('这里可能是个空文件夹', error);
        }

        q++;
    }
})();


// console.log('..................',filteredNamesArr)





// getsheet准备写入这些文件夹


// // // 开始遍历文件夹的循环
// let m = 0;
// while (m <filelist.length){
//     const file_date =  filelist[m]
//     // .replace(/\.[^/.]+$/, "");
    
//     console.log('现在是这个日期:',file_date)
    

//     const folder_date= readJSON(directoryPath+ '/'+filelist[m])
//     const namelist = folder_date.namesArr
//     const tokenlist = folder_date.tokensArr

//     console.log(folder_date)
    

// // 找到输出文件
// let i = 0
// while (i< namelist.length){
//     const outputFolder = './230511JSON-3月学员数据'+'/c每个学员的时间表'+'/'+ file_date
    
    
//     const outputFile = namelist[i]+'.json'

//     if (!fs.existsSync(outputFolder)) {
//         fs.mkdirSync(outputFolder);
//     }

//     const outputfile_xueyuan = path.join(outputFolder, outputFile);
//     console.log('打印出来了到：'+outputfile_xueyuan)
//     feishureader(tokenlist[i],usertoken,outputfile_xueyuan)
//     i++;
// }
// // 下一步就是读遍历读那些同学的时间表   
//     m++
// }







// // 先把输出的文件夹创建好,然后到时候直接json文件放进去,这里多级建表,用了recursive,非常重要!!, { recursive: true }
// const _outputFolder = path.join('./230511JSON-3月学员数据/c神经网络原始文件', file_date,_filelist[n].replace(/\.[^/.]+$/, ""))
// if (!fs.existsSync(_outputFolder)) {
//     fs.mkdirSync(_outputFolder, { recursive: true });
// }



// (async () => {
//     // tokens 要从'230511JSON-3月学员数据\c每个学员的时间表\230404建表的学员'里面遍历日期,学员里面的名称判断查找,只找时间表,然后把对应的token取出来

//     // 放在'230511JSON-3月学员数据\d神经网络原始文件\230404建表的学员'里面的相应位置,循环创建文件夹,表格.放出来之后就可以进行分析了
//   const spreadsheet_tokens = filteredTokensArr

//   const output_files = filteredNamesArr

//   for (let i = 0; i < spreadsheet_tokens.length; i++) {
//     const spreadsheet_token = spreadsheet_tokens[i];
//     const usertoken = 'u-3O2FpJSpdf9WjGK.jZlLSIk42ilh04xHiwG055Q007Kb';
//     const singlesheet_output = output_files[i];

//     await processsheet(spreadsheet_token, usertoken, singlesheet_output);
//   }
// })();