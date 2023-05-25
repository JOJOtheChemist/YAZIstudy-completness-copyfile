// 最后封装成函数
// 先判断datetime是周几,设置完成率的上限
function getWeekday() {
    const today = new Date(); // get current date
    const dayOfWeek = today.getDay(); // get day of week (0-6)
    return dayOfWeek;
  }
  const dayOfWeek = getWeekday()
  console.log(dayOfWeek);


// 遍历mainsheet的rangelist,看里面有多少19,再除以总数,就是完成率. 范围里面,列数分别为预计\实际\心情. 只看预计\实际里面
fs = require('fs')
fs.readFile('时间表爬出来的数据!!!!!.json', (err, data) => {
    if (err) throw err;
    const jsonData = JSON.parse(data);
    const daylength = jsonData[0].length
    const tillweekdaylength = daylength*(dayOfWeek+1)*2
    
    console.log(`the full time block number is :${tillweekdaylength}`)

    // Loop through the array i
    let count = 0;
    
    for (let i = 0; i <= (dayOfWeek+1)*3; i += 3) { // 这个地方是三倍啊,要注意
        console.log(`----------Counting to ${daylength} for i=${i}:`);

        //////////////////
        ////////////////

        
        // Loop from 0 to 45
        for (let j = 0; j < daylength; j++) { // 遍历应该是dayofWeek的三倍啊
        console.log(j);
        console.log('this is 预计完成value',jsonData[i][j])
        console.log('this is 实际完成value',jsonData[i+1][j])
        console.log('this is 心情value',jsonData[i+2][j])
        if (jsonData[i][j][0]==19) {//三列里面只要有19就加进去
            count++;
        }
        if (jsonData[i+1][j][0]==19) {//三列里面只要有19就加进去
            count++;
        }
        }
        console.log(`--midterm--Counting to timeblock = ${daylength} until weekday${i/3}, the blankcount=${count}: `)
        i += 3
    }
    console.log(`--------FINAL: Counting to timeblock = ${daylength} until weekday${dayOfWeek +1}, the FINAL blankcount=${count}: `)
    
    // 打印完成率
    const completness = 1 - count/tillweekdaylength
    console.log(`截止到今天,表格完成率是:${completness}`)
    
})

