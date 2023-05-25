

/// Define the countBlankCells function
function countBlankCells(filepath) {
    fs = require('fs')
  // Define getWeekday function
  function getWeekday() {
    const today = new Date(); // get current date
    const dayOfWeek = 6; // get day of week (0-6),在这里设计成满天的 
    return dayOfWeek;
  }

  const dayOfWeek = getWeekday();

  // Use a Promise to read the file and calculate completeness
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, (err, data) => {
      if (err) reject(err);
      try {
        const jsonData = JSON.parse(data);
        // Handle valid JSON data
        
      const daylength = jsonData[0].length;
      const tillweekdaylength = daylength * (dayOfWeek + 1) * 2;

      let count = 0;
      for (let i = 0; i < (dayOfWeek + 1) * 3; i += 3) {
        for (let j = 0; j < daylength; j++) {
          if (jsonData[i][j][0] == 19) {
            count++;
          }
          if (jsonData[i + 1][j][0] == 19) {
            count++;
          }
        }
      }

      const completness = 1 - count / tillweekdaylength;
      // console.log(`截止到今天,${filepath}表格完成率是:${completness}`);
      resolve(completness);
      } catch (error) {
        console.error(`Error parsing JSON: ${error}`);
        // Handle invalid JSON data
      }
      
    });
  });
}

// Export the countBlankCells function
module.exports = countBlankCells