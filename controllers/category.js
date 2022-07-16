const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Category = require('../models/category');

const categoryGet =  async (req = request , res = response) => {

    const category = await Category.find({ status: true })

    res.json({
        data: category
    });
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