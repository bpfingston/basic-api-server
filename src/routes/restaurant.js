'use strict';

const express = require('express');
const router = express.Router();
const { restaurant } = require('../models');
const validator = require('../middleware/validator');

router.get('/restaurant', async (req, res) => {
  let restaurantData = await restaurant.findAll();
  res.status(200).send(restaurantData);
});

router.get('/restaurant/:id', async (req, res) => {
  let id = +req.params.id;
  let restaurantData = await restaurant.findOne({where:{id}});
  res.send(restaurantData);
});

router.post('/restaurant', async (req, res) => {
  const newRestaurant = await restaurant.create({
    title: req.body.title,
    typeOfFood: req.body.typeOfFood,
  });
  res.status(201).send(newRestaurant);
});

//Make a custom validator for ID
router.put('/restaurant/:id', async (req, res) => {
    const id = +req.params.id;
    let foundRestaurant = await restaurant.findOne({
        where: {id},
    });
    let updatedRestaurant = await foundRestaurant.update(
        req.body,
    );
    res.status(200).send(updatedRestaurant);
});

router.delete('/restaurant/:id', async (req, res) => {
    const id = +req.params.id;
    await restaurant.destroy({
        where: {
            id: id,
        },
    });
    res.status(204).send('restaurant deleted');
});

module.exports = router;