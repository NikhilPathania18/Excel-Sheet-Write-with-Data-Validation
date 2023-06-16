var fields = new Map();

const getDate = () => {
    const date = new Date
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return [year,month,day]
}
getDate();
const currDate = getDate();

fields.set('Asset Name',{
    validation:{
        type: "textLength",
        operator: 'lessThan',
        formulae: [50],
        showErrorMessage: true,
        allowBlank: true,
        errorStyle: "error",
        errorTitle: "Name Error",
        error: "Asset Name should contain less than 50 characters",
    },
    width: 15
})

fields.set('Description',{
    validation:{
        type: "textLength",
        operator: 'lessThanOrEqual',
        formulae: [50],
        showErrorMessage: true,
        allowBlank: true,
        errorStyle: "error",
        errorTitle: "Description Error",
        error: "Description should contain less than 50 characters",
    },
    width: 35
})



fields.set('Amount',{
    validation: {
        type: "decimal",
        operator: 'greaterThanOrEqual',
        formulae: [0],
        showErrorMessage: true,
        allowBlank: true,
        errorStyle: "error",
        errorTitle: "Amount Error",
        error: "Amount should be greater than or equal to zero",
    },
    width: 10

})

fields.set('Class Of Asset',{
    validation:{
        type: "list",
        formulae: ['"Land, Build, Motor Vehicles"'],
        showErrorMessage: true,
        allowBlank: true,
        errorStyle: "error",
        errorTitle: "Asset Type Error",
        error: "Invalid Asset Class",
    },
    width: 20
})

fields.set('Date Put To Use (MM/DD/YYYY)',{
    validation:{
        type: "date",
        operator: "lessThanOrEqual",
        formulae: [new Date(currDate[0],currDate[1],currDate[2]+1)],
        showErrorMessage: true,
        allowBlank: true,
        errorStyle: "error",
        errorTitle: "Invalid Date",
        error: `Please enter Date less than ${currDate[1]}/${currDate[2]}/${currDate[0]}`,
    },
    width: 28
})

fields.set('Location',{
    validation:{
        type: "textLength",
        operator: "lessThanOrEqual",
        formulae: [50],
        showErrorMessage: true,
        allowBlank: true,
        errorStyle: "error",
        errorTitle: "Location Error",
        error: "Location should not exceed 50 characters",
    },
    width: 25
})



export default fields;
