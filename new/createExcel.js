import ExcelJS from 'exceljs'

const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet("Sheet 1");

worksheet.addRow(["Name", "Email", "Phone", "Age", "Subject"]);

worksheet.columns = [
  { width: 25 },
  { width: 25 },
  { width: 25 },
  {},
  { width: 25 },
];

for (let row = 1; row <= 10; row++) {
  worksheet.getCell(`A${row}`).dataValidation = {
    type: "custom",
    showErrorMessage: true,
    allowBlank: true,
    formulae: [
      `=AND(LEN(A${row}) < 41,ISNUMBER(SUMPRODUCT(FIND(MID(A${row},ROW(INDIRECT("1:"&LEN(A${row}))),1),"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ "))))`
    ],
    errorStyle: "error",
    errorTitle: "Name",
    error: "Name should contain only alphabets",
  };
}

for (let row = 1; row <= 10; row++) {
  worksheet.getCell(`B${row}`).dataValidation = {
    type: "custom",
    showErrorMessage: true,
    allowBlank: true,
    formulae: [
      `=AND(LEN(B1)>0, ISNUMBER(SEARCH("@", B1)), ISNUMBER(SEARCH(".", B1, SEARCH("@", B1)+2)), ISERROR(FIND(" ", B1)))
    `,
    ],
    errorStyle: "error",
    errorTitle: "Email",
    error: "Please provide a valid email",
  };
}

for (let row = 1; row <= 10; row++) {
  worksheet.getCell(`C${row}`).dataValidation = {
    type: "whole",
    operator: "between",
    showErrorMessage: true,
    formulae: [1000000000, 9999999999],
    errorStyle: "error",
    errorTitle: "Phone",
    error: "Please enter a valid 10 digit phone number",
  };
}

for (let row = 1; row <= 10; row++) {
  worksheet.getCell(`D${row}`).dataValidation = {
    type: "whole",
    allowBlank: true,
    operator: "greaterThanOrEqual",
    showErrorMessage: true,
    formulae: [18],
    errorStyle: "error",
    errorTitle: "Age",
    error: "Age must be greater than or equal to 18",
  };
}

for (let row = 1; row <= 10; row++) {
  worksheet.getCell(`E${row}`).dataValidation = {
    type: "list",
    allowBlank: true,
    formulae: ['"Maths, Science, English"'],
    showErrorMessage: true,
    errorStyle: "error",
    errorTitle: "Subject",
    error: "Invalid data",
  };
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