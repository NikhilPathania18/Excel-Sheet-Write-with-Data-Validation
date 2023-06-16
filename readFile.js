import ExcelJS from 'exceljs'

const workbook = new ExcelJS.Workbook()

workbook.xlsx.readFile("output.xlsx").then(() => {
    var worksheet = workbook.getWorksheet("Sheet 1");
    const maxRow = worksheet.actualRowCount;
    const maxCol = worksheet.actualColumnCount;

    const cell1 = worksheet.getCell('A2')
    const cell2 = worksheet.getCell('A3')

    console.log(cell1.dataValidation.formulae == cell2.dataValidation.formulae)
    console.log(cell1.dataValidation.formulae)
    console.log(cell2.dataValidation.formulae)
})  