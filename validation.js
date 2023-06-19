const isChar = (ch) =>{
    return (ch>='A'&&ch<='Z')||(ch>='a'&&ch<='z')
}

const isNumber = (ch) =>{
    return (ch>='0'&&ch<='9')
}

// export const checkName = (name) =>{
//     const len = name.length;
//     let isCharThere = false;
//     for(let i=0;i<len;i++){
//         if(!isChar(name[i])&&name[i]!=' ')  return false;
//         if(isChar)  isCharThere=true;
//     }
//     return isCharThere;
// }

// export const checkEmail = (email) => {
//     const len = email.length
//     const split = email.split('@')
//     if(split.length!=2) return false;
//     const checkDot = split[1].split('.')
//     if(checkDot.length!=2)  return false;
//     if(checkDot[0]==0||checkDot[1]==0)  return false;

//     return true;
// }

// export const checkPhone = (phone) => {
//     const len = phone.length
//     if(len!=10) return false;
//     for(let i = 0 ;i<len;i++){
//         if(!isNumber(phone[i])) return false;
//     }
//     return true;
// }

// export const checkAge = (age) => {
//     if(age<'18')    return false;
//     return true;
// }

// export const checkSubject = (subject,subjectList)=>{
//     let flag = false;
//     subjectList.forEach(sub => {
//         if(sub==subject)    flag= true;
//     });
//     return flag;
// }


const checkWhole = (operator,formulae, value) => {
    switch(operator){
        case 'between': if(value>=formulae[0]&&value<=formulae[1])
                        return true;
                        break;
        case 'notBetween': if(!(value>=formulae[0]&&value<=formulae[1]))
                        return true;
                        break;
        case 'equalTo': if(value==formulae[0])
                        return true;
                        break;
        case 'notEqualTo': if(value!=formulae[0])
                        return true;
                        break;
        case 'greaterThan': if(value>formulae[0])
                        return true;
                        break;
        case 'lessThan': if(value<formulae[0])
                        return true;
                        break;
        case 'greaterThanOrEqual': if(value>=formulae[0])
                        return true;
                        break;
        case 'lessThanOrEqual': if(value<=formulae[0])
                        return true;
                        break;
        default:    return false;
    }
    return false;
}

const checkDecimal = (operator,formulae,value) => {
    switch(operator){
        case 'between': if(value>=formulae[0]&&value<=formulae[1])
                        return true;
                        break;
        case 'notBetween': if(!(value>=formulae[0]&&value<=formulae[1]))
                        return true;
                        break;
        case 'equal': if(value==formulae[0])
                        return true;
                        break;
        case 'notEqual': if(value!=formulae[0])
                        return true;
                        break;
        case 'greaterThan': if(value>formulae[0])
                        return true;
                        break;
        case 'lessThan': if(value<formulae[0])
                        return true;
                        break;
        case 'greaterThanOrEqual': if(value>=formulae[0])
                        return true;
                        break;
        case 'lessThanOrEqual': if(value<=formulae[0])
                        return true;
                        break;
        default:    return false;
    }
    return false;
}

const checkTextLength = (operator,formulae,value) => {
    const length = value.length
    switch (operator) {
        case 'between': if(length>=formulae[0]&&length<=formulae[1])
                        return true;
                        break;
        case 'notBetween': if(!(length>=formulae[0]&&length<=formulae[1]))
                        return true;
                        break;
        case 'equal': if(length==formulae[0])
                        return true;
                        break;
        case 'notEqual': if(length!=formulae[0])
                        return true;
                        break;
        case 'greaterThan': if(length>formulae[0])
                        return true;
                        break;
        case 'lessThan': if(length<formulae[0])
                        return true;
                        break;
        case 'greaterThanOrEqual': if(length>=formulae[0])
                        return true;
                        break;
        case 'lessThanOrEqual': if(length<=formulae[0])
                        return true;
                        break;
        default:    return false;
    }
}

const checkList = (formulae,value) => {
    let list = formulae[0]
    list = list.split('"')
    list = list[1].split(',')
    let flag = false;
    list.forEach(option => {
        console.log(option);
        if(option == value) flag= true;
    });
    return flag;
}


const checkDate = (operator,formulae,value) => {
    switch (operator) {
        case 'between': if(value>=formulae[0]&&value<=formulae[1])
                        return true;
                        break;
        case 'notBetween': if(!(value>=formulae[0]&&value<=formulae[1]))
                        return true;
                        break;
        case 'equal': if(value==formulae[0])
                        return true;
                        break;
        case 'notEqual': if(value!=formulae[0])
                        return true;
                        break;
        case 'greaterThan': if(value>formulae[0])
                        return true;
                        break;
        case 'lessThan': if(value<formulae[0])
                        return true;
                        break;
        case 'greaterThanOrEqual': if(value>=formulae[0])
                        return true;
                        break;
        case 'lessThanOrEqual': if(value<=formulae[0])
                        return true;
                        break;
        default:    return false;
    }
    return false
}

export const validate = (dataValidation,isMandatory,value) => {
    if(!value){
        if(isMandatory) return false;
        else    return true;
    }

    switch(dataValidation.type){
        case 'whole' : return checkWhole(dataValidation.operator,dataValidation.formulae,value);
        case 'decimal': return checkDecimal(dataValidation.operator,dataValidation.formulae,value);
        case 'textLength': return checkTextLength(dataValidation.operator,dataValidation.formulae,value)
        case 'list': return checkList(dataValidation.formulae,value)
        case 'date': return checkDate(dataValidation.operator,dataValidation.formulae,value)
        default: return false;
    }
}