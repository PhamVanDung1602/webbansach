function formatNumber(x: number|undefined){
    if(x===undefined){
        return 0;
    }
    if(isNaN(x)){
        return 0;
    }
    // use toLocaleString method to format number
    return x.toLocaleString("vi-VN");
}

export default formatNumber;