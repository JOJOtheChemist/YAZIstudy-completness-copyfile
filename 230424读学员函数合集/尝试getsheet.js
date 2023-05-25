// 就是开始异步访问所有的表格了,读到真正的数据,才把JSON文件写出去 
  const getSheet = require('./读spreadsheet得到sheet函数');
    
  (async () => {
    const spreadsheet_token = 'shtcnE5lKznq3Vgj0DGn4988ZqC'
    const usertoken = 'u-0cJqghNsJ1Cqxm3VCXATpKk40gRh04b3oMG0l0w007Hv'
    const getsheet = await getSheet(spreadsheet_token,usertoken );
    console.log('-------------------------')
    console.log(getsheet);
    token_mainsheet = getsheet[1];
    token_dashboard = getsheet[3];

    // 导入rangelist,加上token_mainsheet
    const rangelist = require('./生成range')

    const result_string= rangelist.map(item => token_mainsheet+'!'+item).join(',');
    console.log(result_string);


    //开始读里面的内容了,用get方法?
    const axios = require('axios');
    const url_sheet = 'https://open.feishu.cn/open-apis/sheets/v2/spreadsheets/'+spreadsheet_token+'/values_batch_get?ranges='+ result_string+'&valueRenderOption=ToString&dateTimeRenderOption=FormattedString'
    console.log('-------------------------!!!')
    console.log(url_sheet)
    
    // 发送get请求了
    axios.get(url_sheet
    , {
    headers: {
        'Authorization': 'Bearer'+ ' '+ usertoken
    },
    params: {
        valueRenderOption: 'ToString',
        dateTimeRenderOption: 'FormattedString'
    }
    }).then(res => {
        console.log('--------------!!!!!!!!!------');

    // 找到数据了,打印出来看看
    console.log(res.data.data.valueRanges[0].values);

    // 现在遍历,把周一-周日的数据放到一个新的json文件里面
    const fs = require('fs'); // 导入文件系统模块
    const list1 = res.data.data.valueRanges; // 要遍历的列表
    console.log(list1);
    const list2 = []; // 新列表，用于存放提取出来的元素
    for (let i = 0; i < list1.length; i++) {
      list2.push(list1[i].values); // 将遍历到的元素添加到新列表中
    }
    const data = JSON.stringify(list2); // 将列表数据转换为JSON格式
    fs.writeFile('彭琴w3!.json', data, err => { // 文件写入操作
      if (err) throw err;
      console.log('JSON数据已经保存到文件！');
    
      console.log(list2);
    //也放到csv文件里面
    // 将数据转换为CSV格式的字符串
    
    
    });
    
    }).catch(error => {
    console.error(error);
    });

  })();
