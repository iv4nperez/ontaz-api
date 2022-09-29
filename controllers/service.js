const { response, request } = require('express');
const { Service } = require('../models');
const { redisInstance } = require('../redis/redis')

const serviceGet =  async (req = request , res = response) => {
    const services = await Service.find()
    res.json({
        data: services
    });
}


const serviceGetByCategory =  async (req = request , res = response) => {
    const { categoryId } = req.params;

    // const serviceByCategoryCache = await redisInstance.get(`service/${ categoryId }`);
    // if( serviceByCategoryCache ){
    //     return res.json(JSON.parse(serviceByCategoryCache));
    // }

    const services = await Service.find({ category: categoryId })

    // await redisInstance.set(`service/${ categoryId }`, JSON.stringify({ data: services }));

    res.json({
        data: services
    });
}

const serviceGetByUID = async (req = response, res = response) => {
    const { userId } = req.params;
    const services = await Service.find({ userId: userId })

    res.json({
        data: services
    });
}



const servicePost =  async (req = request , res = response) => {

    const {
        categoryId,
        title,
        description,
        starts,
        urlImg,
        phone,
        whatsapp,
        location
    } = req.body;


    const service = new Service({
        category: categoryId,
        title,
        description,
        starts,
        urlImg,
        phone,
        whatsapp,
        location
    });

    await service.save()

    res.json({
        data: service,
        status: "success",
        message: "Registro guardado correctamente"
    });
}


module.exports = {
    serviceGet,
    servicePost,
    serviceGetByCategory,
    serviceGetByUID
}