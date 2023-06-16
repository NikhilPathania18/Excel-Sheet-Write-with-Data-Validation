import ExcelJS from 'exceljs'
const workbook = new ExcelJS.Workbook();
workbook.xlsx.readFile('output.xlsx')
  .then(() => {
    const worksheet = workbook.getWorksheet('Sheet 1'); // Replace 'Sheet1' with your actual sheet name

    const cell = worksheet.getCell('A1'); // Replace 'A1' with the desired cell address

    // Read the cell value
    const cellValue = cell.value;

    // Read the cell data validation properties
    const dataValidation = cell.dataValidation;

    if (dataValidation) {
        console.log('Validation',dataValidation)
      const formula1 = dataValidation.formula1;
      const formula2 = dataValidation.formula2;
      const type = dataValidation.type;

      console.log('Cell Value:', cellValue);
      console.log('Data Validation Type:', type);
      console.log('Data Validation Formula 1:', formula1);
      console.log('Data Validation Formula 2:', formula2);
    } else {
      console.log('No Data Validation found in the cell.');
    }
  })
  .catch((error) => {
    console.error('Error occurred:', error);
  });
