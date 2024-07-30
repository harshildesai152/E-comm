const { json } = require("express");

class ApiFeatures{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }
    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i",
            },
        } : {};
       
        this.query = this.query.find({ ...keyword });
        return this;
    }
    filter(){
        const queryCopy={...this.queryStr}   //queryStr is passed as object
        
        //remove some filter for category
        const removeFields=["keyword","page","limit"];

        removeFields.forEach((key)=>delete queryCopy[key]);
        console.log(queryCopy)




        //filter for price and rating
        let queryStr = JSON.stringify(queryCopy);
        
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`)  //greater than ,greater than equval to,less than,less than equval to

        this.query=this.query.find(JSON.parse(queryStr));     // queryStr=>key=value
        console.log(queryStr)
        
        return this;


    }
    pagination(resultPerPage){
        const currentPage=Number(this.queryStr.page)  || 1;   //50 product - par page product 10 =remaing 40 product

        const skip=resultPerPage * (currentPage-1)    // 5(1-1)=0 product skip,, 5(2-1)=5 product skip  ,,5(3-1)=10 product skip and remaing product show in page

        this.query=this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}

module.exports=ApiFeatures