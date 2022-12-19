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

    const services = await Service.find({ category: categoryId, status: true })

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


const serviceDelByIdService = async (req = response, res = response) => {
    try {
        const { id } = req.params;
        const servicesDelete = await Service.findByIdAndUpdate(id, { status: false }, { new:true })

        res.json({
            data: servicesDelete,
            msg: 'Registro eliminado correctamente'
        });
    } catch (error) {
        res.json({
            data: {},
            msg: 'Ha ocurrido un error - code[ND01]'
        });
    }
}
// code[ND01] = No se pudo eliminar
module.exports = {
    serviceGet,
    servicePost,
    serviceGetByCategory,
    serviceGetByUID,
    serviceDelByIdService
}