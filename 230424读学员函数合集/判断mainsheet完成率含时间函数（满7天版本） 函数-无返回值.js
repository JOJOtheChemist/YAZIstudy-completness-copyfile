

// Define the countBlankCells function
function countBlankCells(filepath) {

        // Define getWeekday function
    function getWeekday() {
        const today = new Date(); // get current date
        const dayOfWeek = 6; // get day of week (0-6)，在这里设计成满天的
        return dayOfWeek;
    }
        
    const dayOfWeek = getWeekday()
    // console.log(dayOfWeek);


    fs = require('fs')
    
    let final_number = []
    fs.readFile(filepath, (err, data) => {
    if (err) throw err;
    const jsonData = JSON.parse(data);
    const daylength = jsonData[0].length
    const tillweekdaylength = daylength*(dayOfWeek+1)*2

    
    
    // console.log(`the full time block number is :${tillweekdaylength}`)

    // Loop through the array i
    let count = 0;
    
    for (let i = 0; i < (dayOfWeek+1)*3; i += 3) { // 这个地方是三倍啊,要注意
        // console.log(`----------Counting to dayblocks of ${daylength} for i=${i}:`);
        


        // Loop from 0 to 45
        for (let j = 0; j < daylength; j++) { // 遍历应该是dayofWeek的三倍啊
        // console.log(j);
        // console.log('this is 预计完成value',jsonData[i][j])
        // console.log('this is 实际完成value',jsonData[i+1][j])
        // console.log('this is 心情value',jsonData[i+2][j])
        if (jsonData[i][j][0]==19) {//三列里面只要有19就加进去
            count++;
        }
        if (jsonData[i+1][j][0]==19) {//三列里面只要有19就加进去
            count++;
        }
        }
        // console.log(`--midterm--Counting to timeblock = ${daylength} until weekday${i/3 + 1}, the blankcount=${count}: `)
        
    }
    // console.log(`--------FINAL: Counting to timeblock = ${daylength} until weekday${dayOfWeek +1}, the FINAL blankcount=${count}: `)
    
    // 打印完成率
    const completness = 1 - count/tillweekdaylength
    console.log(`截止到今天,${filepath}表格完成率是:${completness}`)  
    resolve(completness)
}

)

    

    // Return the completeness value
    // return completness
}

// Export the countBlankCells function
module.exports = countBlankCells