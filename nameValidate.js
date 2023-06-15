export const validateName = async(name) => {
    for( i=0;i<name.length;i++){
        if(!(name[i]>='a'&&name[i]<='z')&&!(name[i]>='A'&&name[i]<='Z'))
        return false;
    }
    return true;
}