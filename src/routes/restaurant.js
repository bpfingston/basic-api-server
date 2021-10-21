'use strict';

const express = require('express');
const router = express.Router();
const { restaurant } = require('../models/restaurant');
const validator = require('../middleware/validator');

router.get('/restaurant', async (req, res) => {
  let restaurantData = await restaurant.findAll();
  res.send(restaurantData);
});

router.get('/restaurant/:id', async (req, res) => {
  let id = +req.params.id;
  let restaurantData = await restaurant.findOne(id);
  res.send(restaurantData);
});

router.post('./restaurant', validator, async (req, res) => {
  const newRestaurant = {
    title: req.params.title,
    typeOfFood: req.params.typeOfFood,
  };
  res.status(201).send(newRestaurant);
});
//Make a custom validator for ID
router.put('./restaurant/:id', validator, async (req, res) => {
    const id = +req.params.id;
    let foundRestaurant = await restaurant.findOne({
        where: {id},
    });
    let updatedRestaurant = await foundRestaurant.update(
        req.body,
    );
    req.status(200).send(updatedRestaurant);
});

router.delete('./restaurant/:id', async (req, res) => {
    const id = +req.params.id;
    await restaurant.destroy({
        where: {
            id: id,
        },
    });
    res.status(204).send('restaurant deleted');
});

module.exports = router;