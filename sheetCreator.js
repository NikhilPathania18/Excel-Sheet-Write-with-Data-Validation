import fields  from "./fields.js";
import inputFields from "./inputFields.js";
import ExcelJS  from 'exceljs'


//function to get next characters
function nextChar(c, inc) {
    return String.fromCharCode(c.charCodeAt(0) + inc);
  }


const workbook = new ExcelJS.Workbook()

const worksheet = workbook.addWorksheet('Sheet 1')


//add header row with required fields
worksheet.addRow(inputFields)
const maxCol = worksheet.actualColumnCount

//set width for each column
for(let col =1; col<= maxCol; col++){
  const column = worksheet.getColumn(nextChar('A',col-1))
  if(fields.get(inputFields[col-1]))
  column.width = fields.get(inputFields[col-1]).width
  else
  column.width = 0
}

for(let row =1; row<=10; row++){
    for(let col = 1;col<=maxCol;col++){
        const cell = worksheet.getCell(`${nextChar("A", col - 1)}${row}`)
        const dataValidation = fields.get(inputFields[col-1]).validation
        cell.dataValidation= dataValidation;
    }
}


for(let col=1 ;col<=maxCol;col++){
    worksheet.getColumn(nextChar('A',col-1)).protection = {locked: false, lockText : false}
}
worksheet.getRow(1).protection = {
  locked: true,
  lockText: true,
};


worksheet
  .protect("", { selectLockedCells: true, selectUnlockedCells: true })
  .then(() => {
    workbook.xlsx
      .writeFile("output.xlsx")
      .then(() => {
        console.log("Excel file created successfully!");
      })
      .catch((error) => {
        console.error("Error creating Excel file:", error);
      });
  });