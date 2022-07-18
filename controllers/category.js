const { response, request } = require('express');
const Category = require('../models/category');
const { redisInstance } = require('../redis/redis')

const categoryGet =  async (req = request , res = response) => {

    try {
        const categoriesCache = await redisInstance.get('categories');
        if( categoriesCache ){
            return res.json(JSON.parse(categoriesCache));
        }

        const category = await Category.find({ status: true })

        await redisInstance.set('categories', JSON.stringify({ data:category} ));
        res.json({
            data: category
        });

    } catch (error) {
        console.log(error)
    }
}


const categoryPost =  async (req = request , res = response) => {

    const {
        title,
        urlImg,
        color
    } = req.body;


    const category = new Category({ 
        title,
        urlImg,
        color
    });

    await category.save()

    res.json({
        data: category,
        status: "success",
    });
}


module.exports = {
    categoryGet,
    categoryPost
}