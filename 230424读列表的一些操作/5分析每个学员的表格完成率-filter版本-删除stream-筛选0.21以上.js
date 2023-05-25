const { Console } = require('console');
const countBlankCells = require('../230424读学员函数合集/判断mainsheet完成率含时间函数（满7天版本） 函数')

const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

// Define a function to process each file
function processFile(path) {
  return countBlankCells(path).then(completeness => {
    if (completeness > 0.21) {
      console.log(`Completeness for ${path} is ${completeness}`);

      // Copy the JSON file to the new directory
      const fileName = path.split('\\').pop(); // extract the file name from the path
      const destinationPath = './230511JSON-'+month_number+'月学员数据/f筛选的学员完成率/' + fileName; // update to your destination path
      fs.copyFileSync(path, destinationPath);

      return { path, completeness, copied: true }; // add a flag to indicate if the file was copied successfully
    } else {
      return { path, completeness, copied: false };
    }
  }).catch(err => {
    console.error(`Error processing ${path}: ${err}`);
    return { path, completeness: null, copied: false }; // Return null completeness and false copied flag if there was an error
  });
}

const month_number = '5'
const directory_root = './230511JSON-'+month_number+'月学员数据'
const directoryPath = directory_root + '/d神经网络原始文件';
const filelist = []
try {
  const files = fs.readdirSync(directoryPath);

  files.forEach(file => {
    const file_path = path.join(directoryPath, file)
    filelist.push(file_path);
  });
} catch (error) {
  console.error("Error reading directory:", error);
}
console.log(filelist,'找一找日期阿！！！！！！！')

let n = 0
const filepath_xueyuan = []
while (n <filelist.length){
    try {
    const files = fs.readdirSync(filelist[n]);

    files.forEach(file => {
      const file_path = path.join(filelist[n], file)

      filepath_xueyuan.push(file_path);

      }); 
  } catch (error) {
    console.error("Error reading directory:", error);
  }

  n++ 
}

console.log('子文件------------------',filepath_xueyuan)


let k = 0
allspreadsheet_path = []
const XlsxPopulate = require('xlsx-populate'); 
while (k < filepath_xueyuan.length){
    try {
        const files = fs.readdirSync(filepath_xueyuan[k]);
        console.log("Files in directory:", files);

        files.forEach(file => {

          const file_path = path.join(filepath_xueyuan[k], file)

          allspreadsheet_path.push(file_path);
        });  


        const csv_file = directory_root +'/f筛选的学员完成率/' + '时间表完成率-筛选.xlsx'
        const workbook = XLSX.readFile(csv_file);

        function processFilesByDate(date_want) {
          const filesToProcess = allspreadsheet_path.filter(file => (
            file.includes(date_want)
          ));
        
          Promise.all(filesToProcess.map(processFile)).then(results => {
            console.log(results, '这是一个合集嘛？？？？？？？？？？？？')
        
        
            // Check if worksheet exists or create new one if it doesn't
            let worksheet = workbook.Sheets[date_want];
            if (!worksheet) {
              worksheet = {};
            }
        

            // Convert the new data to a worksheet object and merge with the existing sheet
            const newWorksheet = XLSX.utils.json_to_sheet(results);
            XLSX.utils.book_append_sheet(workbook, newWorksheet, date_want);

            // Write the updated workbook back to file
            XLSX.writeFile(workbook, csv_file);
          }).catch(err => {
            console.error(`Error processing files: ${err}`);
          });
        }

        // Loop through all dates in filelist (skip first two elements that are not dates)
        for (let i = 2; i < filelist.length; i++) {
          const parts = filelist[i].split('\\');
          let date_want = parts[2];
          if (date_want.includes('【待缴费】')) {
            date_want = '待缴费，有pass卡资格';
          }
          processFilesByDate(date_want);
        }

      } catch (error) {
        console.error("Error reading directory:", error);
      }
      
      k++
}