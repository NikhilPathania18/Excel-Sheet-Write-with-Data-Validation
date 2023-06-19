import * as validation from "./validation.js";
import mandatoryFields from "./mandatoryFields.js";
import ExcelJS from "exceljs";

function nextChar(c, inc) {
  return String.fromCharCode(c.charCodeAt(0) + inc);
}

const style = {
  font: {
    name: 'Arial Black',
    color: { argb: 'FFFF0000' },
    family: 2,
    italic: true
  },
  protection: {
    locked: false,
    lockedText: false
  }
}


const workbook = new ExcelJS.Workbook();

const DataValidation = []

workbook.xlsx.readFile("input.xlsx").then(() => {
  var worksheet = workbook.getWorksheet("Sheet 1");
  const maxRow = worksheet.actualRowCount;
  const maxCol = worksheet.actualColumnCount;
  console.log(maxRow,maxCol)

  for(let col = 1;col<=maxCol;col++){
    const cell = worksheet.getRow(1).getCell(col)
    const dataVal = cell.dataValidation
    if(dataVal){
      DataValidation.push(dataVal)
    }
  }

  for (let row = 2; row <= maxRow; row++) {
    for (let col = 1; col <= maxCol; col++) {


      
      const cell = worksheet.getCell(`${nextChar("A", col - 1)}${row}`)
      const isTypeDate = worksheet.getCell(`${nextChar("A", col - 1)}${1}`).dataValidation.type=='date'
      // const isTypeDate = worksheet.getCell(`${nextChar("A", col - 1)}${1}`).value.startsWith('Date')
      // if(isTypeDate){
      //   cell.numFmt='dd/mm/yyyy'
      // }
      
      const value = worksheet.getRow(row).getCell(col).value;
      const headerValue = worksheet.getRow(1).getCell(col).toString();

      const isMandatory = mandatoryFields.has(headerValue)

      let isValid = validation.validate(DataValidation[col-1],isMandatory,value)
      
      if (!isValid) {
          const head_validation =worksheet.getCell(`${nextChar("A", col - 1)}${1}`).dataValidation
          cell.dataValidation={
              type: head_validation.type,
              showErrorMessage: head_validation.showErrorMessage,
              allowBlank: head_validation.allowBlank,
              formulae: head_validation.formulae,
              errorStyle: head_validation.errorStyle,
              errorTitle: head_validation.errorTitle,
              error: head_validation.error
          }

          cell.note = {
            texts: [
              {'font': {'size': 12, 'color': {'argb': 'FFFF6600'}, 'name': 'Calibri', 'scheme': 'minor'}, 'text': cell.dataValidation.error}
            ],
            margins: {
              insetmode: 'custom',
              inset: [0.25, 0.25, 0.35, 0.35]
            },
            editAs: 'twoCells',
          }

          if(isTypeDate&&value){
            cell.value = `${value.getMonth()+1}/${value.getDay()}/${value.getFullYear()}`
            // cell.value = `${value.getDate()}/${value.getMonth()+1}/${value.getFullYear()}`
          }

          
          cell.style=style
    }
  }
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
});
