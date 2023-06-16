const isChar = (ch) =>{
    return (ch>='A'&&ch<='Z')||(ch>='a'&&ch<='z')
}

const isNumber = (ch) =>{
    return (ch>='0'&&ch<='9')
}

export const checkName = (name) =>{
    const len = name.length;
    let isCharThere = false;
    for(let i=0;i<len;i++){
        if(!isChar(name[i])&&name[i]!=' ')  return false;
        if(isChar)  isCharThere=true;
    }
    return isCharThere;
}

export const checkEmail = (email) => {
    const len = email.length
    const split = email.split('@')
    if(split.length!=2) return false;
    const checkDot = split[1].split('.')
    if(checkDot.length!=2)  return false;
    if(checkDot[0]==0||checkDot[1]==0)  return false;

    return true;
}

export const checkPhone = (phone) => {
    const len = phone.length
    if(len!=10) return false;
    for(let i = 0 ;i<len;i++){
        if(!isNumber(phone[i])) return false;
    }
    return true;
}

export const checkAge = (age) => {
    if(age<'18')    return false;
    return true;
}

export const checkSubject = (subject,subjectList)=>{
    let flag = false;
    subjectList.forEach(sub => {
        if(sub==subject)    flag= true;
    });
    return flag;
}


export const checkWhole = (operator,formulae, value) => {
    switch(operator){
        case 'between': if(value>=formulae[0]&&value<=formulae[1])
                        return true;
                        break;
        case 'not between': if(!(value>=formulae[0]&&value<=formulae[1]))
                        return true;
                        break;
        case 'equal to': if(value==formulae[0])
                        return true;
                        break;
        case 'not equal to': if(value!=formulae[0])
                        return true;
                        break;
        case 'greater than': if(value>formulae[0])
                        return true;
                        break;
        case 'less than': if(value<formulae[0])
                        return true;
                        break;
        case 'greater than or equal to': if(value>=formulae[0])
                        return true;
                        break;
        case 'less than or equal to': if(value<=formulae[0])
                        return true;
                        break;
        default:    return false;
    }
    return false;
}

export const checkDecimal = (operator,formulae,value) => {
    switch(operator){
        case 'between': if(value>=formulae[0]&&value<=formulae[1])
                        return true;
                        break;
        case 'not between': if(!(value>=formulae[0]&&value<=formulae[1]))
                        return true;
                        break;
        case 'equal to': if(value==formulae[0])
                        return true;
                        break;
        case 'not equal to': if(value!=formulae[0])
                        return true;
                        break;
        case 'greater than': if(value>formulae[0])
                        return true;
                        break;
        case 'less than': if(value<formulae[0])
                        return true;
                        break;
        case 'greater than or equal to': if(value>=formulae[0])
                        return true;
                        break;
        case 'less than or equal to': if(value<=formulae[0])
                        return true;
                        break;
        default:    return false;
    }
    return false;
}

// export const checkDate = async(operator,formulae,value)=>{
//     let start,end

// }
export const validate = (dataValidation,value) => {
    switch(dataValidation.type){
        case 'whole' : return checkWhole(dataValidation.operator,dataValidation.formulae,value);
        case 'decimal': return checkDecimal(dataValidation.operator,dataValidation.formulae,value);
        default: return false;
    }
    return false;
}