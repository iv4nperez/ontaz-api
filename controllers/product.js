const { response, request } = require('express');
const { Product } = require('../models');
const { redisInstance } = require('../redis/redis')

const productGetByService =  async (req = request , res = response) => {

    try {
        const { serviceId } = req.params;
        // const productsCache = await redisInstance.get(`products/${serviceId}`);
        // if( productsCache ){
        //     return res.json(JSON.parse(productsCache));
        // }

        const products = await Product.find({ status: true, service: serviceId })

        // await redisInstance.set(`products/${serviceId}`, JSON.stringify({ data: products} ));
        res.json({
            data: products
        });

    } catch (error) {
        console.log(error)
    }
}


const productPost =  async (req = request , res = response) => {

    const {
        serviceId,
        title,
        urlImg,
        price,
        description
    } = req.body;


    const product = new Product({ 
        service: serviceId,
        title,
        urlImg,
        price,
        description
    });

    await product.save()

    res.json({
        data: product,
        status: "success",
    });
}


module.exports = {
    productGetByService,
    productPost
}