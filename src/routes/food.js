'use strict';

const express = require('express');
const router = express.Router();
const { food }  = require('../models');
const validator = require('../middleware/validator');

router.get('/food', async (req, res) => {
  let foodData = await food.findAll();
  res.send(foodData);
});

router.get('/food/:id', async (req, res) => {
  let id = +req.params.id;
  let foodData = await food.findOne(id);
  res.send(foodData);
});

router.post('./food', validator, async (req, res) => {
  const newFood = {
    Title: req.params.title,
    typeOfFood: req.params.typeOfFood,
  };
  res.status(201).send(newFood);
});
//Make a custom validator for ID
router.put('./food/:id', validator, async (req, res) => {
    const id = +req.params.id;
    let foundFood = await food.findOne({
        where: {id},
    });
    let updateFood = await foundFood.update(
        req.body,
    );
    res.status(200).send(updateFood);
});

router.delete('./food/:id', async (req, res) => {
    const id = +req.params.id;
    await food.destroy({
        where: {
            id: id,
        },
    });
    res.status(204).send('food deleted');
});

module.exports = router;