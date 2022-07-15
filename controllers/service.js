const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Service = require('../models/service');

const serviceGet =  async (req = request , res = response) => {
    const services = await Service.find()
    res.json({
        data: services
    });
}


const servicePost =  async (req = request , res = response) => {

    const {
        title,
        description,
        starts,
        urlImg,
        phone,
        whatsapp,
        location
    } = req.body;


    const service = new Service({ 
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
    servicePost
}