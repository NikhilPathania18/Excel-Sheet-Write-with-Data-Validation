import * as validation from "./validation.js";
import ExcelJS from "exceljs";

function nextChar(c, inc) {
  return String.fromCharCode(c.charCodeAt(0) + inc);
}

const style = {
  font: {
    name: 'Arial Black',
    color: { argb: 'FFFF0000' },
    family: 2,
    // size: 10,
    italic: true
  },
  protection: {
    locked: false,
    lockedText: false
  }
}


const subjectList = ["English", "Maths", "Science"];

const workbook = new ExcelJS.Workbook();

const DataValidation = []

workbook.xlsx.readFile("input.xlsx").then(() => {
  var worksheet = workbook.getWorksheet("Sheet 1");
  const maxRow = worksheet.actualRowCount;
  const maxCol = worksheet.actualColumnCount;

  for(let col = 1;col<=maxCol;col++){
    const cell = worksheet.getRow(1).getCell(col)
    const dataVal = cell.dataValidation
    if(dataVal){
      DataValidation.push(dataVal.errorTitle)
    }
  }

  // DataValidation.forEach(element => {
  //   console.log(element)
    
  // });

  for (let row = 2; row <= maxRow; row++) {
    for (let col = 1; col <= maxCol; col++) {
      

      const value = worksheet.getRow(row).getCell(col).toString();
      let isValid = false;
      const typeOfValidation=DataValidation[col-1];
      // console.log(typeOfValidation)

      switch (typeOfValidation) {
        case "Name":
          isValid = validation.checkName(value);
          break;

        case "Email":
          isValid = validation.checkEmail(value);
          break;

        case "Phone":
          isValid = validation.checkPhone(value);
          break;

        case "Age":
          isValid = validation.checkAge(value);
          break;

        case "Subject":
          isValid = validation.checkSubject(value, subjectList);
          break;

        default:
          break;
      }
      
      


      if (!isValid) {


        if(col==1){

        const head_validation =worksheet.getCell(`A${1}`).dataValidation
        worksheet.getCell(`A${row}`).dataValidation={
          type: head_validation.type,
          showErrorMessage: head_validation.showErrorMessage,
          allowBlank: head_validation.allowBlank,
          formulae: [
            `=AND(LEN(A${row}) < 41,ISNUMBER(SUMPRODUCT(FIND(MID(A${row},ROW(INDIRECT("1:"&LEN(A${row}))),1),"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ "))))`,'0'
          ],
          // formulae: head_validation.formulae,
          errorStyle: head_validation.errorStyle,
          errorTitle: head_validation.errorTitle,
          showInputMessage: true,
          promptTitle: "Invalid Name",
          prompt: "Please enter a valid name"
        }
        worksheet.getCell(`${nextChar("A", col - 1)}${row}`).style=style
        }

        else{

        const head_validation =worksheet.getCell(`${nextChar("A", col - 1)}${1}`).dataValidation
          worksheet.getCell(`${nextChar("A", col - 1)}${row}`).dataValidation={
            type: head_validation.type,
            showErrorMessage: head_validation.showErrorMessage,
            allowBlank: head_validation.allowBlank,
            formulae: head_validation.formulae,
            errorStyle: head_validation.errorStyle,
            errorTitle: head_validation.errorTitle,
            showInputMessage: true,
            promptTitle: head_validation.errorTitle,
            prompt: head_validation.error
        }

        worksheet.getCell(`${nextChar("A", col - 1)}${row}`).style=style
      }
    }
  }
}


  worksheet.getColumn("A").protection = { locked: false, lockText: false };
  worksheet.getColumn("B").protection = { locked: false, lockText: false };
  worksheet.getColumn("C").protection = { locked: false, lockText: false };
  worksheet.getColumn("D").protection = { locked: false, lockText: false };
  worksheet.getColumn("E").protection = { locked: false, lockText: false };
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
