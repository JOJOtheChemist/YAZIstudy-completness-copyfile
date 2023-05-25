const getSheet = require('./读spreadsheet得到sheet函数');
const fs = require('fs');
const axios = require('axios');

async function processsheet(spreadsheet_token, usertoken, singlesheet_output) {
  const getsheet = await getSheet(spreadsheet_token, usertoken);
  console.log('-------------------------');
  console.log(getsheet);
  
  const token_mainsheet = getsheet[1];
  const token_dashboard = getsheet[3];

  // 导入rangelist,加上token_mainsheet
  const rangelist = require('./生成range');
  const result_string= rangelist.map(item => `${token_mainsheet}!${item}`).join(',');
  console.log(result_string);

  //开始读里面的内容了,用get方法?
  const url_sheet = `https://open.feishu.cn/open-apis/sheets/v2/spreadsheets/${spreadsheet_token}/values_batch_get?ranges=${result_string}&valueRenderOption=ToString&dateTimeRenderOption=FormattedString`;
  console.log('-------------------------!!!');
  console.log(url_sheet);
    
  // 发送get请求了
  try {
    const res = await axios.get(url_sheet, {
      headers: {
        'Authorization': 'Bearer' + ' ' + usertoken
      },
      params: {
        valueRenderOption: 'ToString',
        dateTimeRenderOption: 'FormattedString'
      }
    });
  
    // 找到数据了,打印出来看看
    console.log(res.data.data.valueRanges[0].values);

    // 现在遍历,把周一-周日的数据放到一个新的json文件里面
    const list1 = res.data.data.valueRanges; // 要遍历的列表
    const list2 = []; // 新列表，用于存放提取出来的元素
    for (let i = 0; i < list1.length; i++) {
      list2.push(list1[i].values); // 将遍历到的元素添加到新列表中
    }

    // 把周一-周日单独写入一个新的json文件里面
    const data = JSON.stringify(list2); // 将列表数据转换为JSON格式
    fs.writeFile(singlesheet_output, data, err => { // 文件写入操作
      if (err) throw err;
      console.log('JSON数据已经保存到文件！');

      // 可以在这里将数据转换为CSV格式，然后再写入文件中
    });

  
  } catch (error) {
    console.error(error);
  
  }
}

module.exports = processsheet;