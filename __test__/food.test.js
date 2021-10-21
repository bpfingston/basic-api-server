'use strict';

const {db, food} = require('../src/models');
const app = require('../src/server');
const supertest = require('supertest');
const request = supertest(app.app);


beforeAll(async () => await db.sync());
afterAll(async () => await db.drop());

describe('Testing food model', () => {
  it('should throw a 201, if successful POST', async () => {
    const response = await food.create({
      title:'Pizza',
      typeOfFood:'Cheese',
    });
    expect(response.id).toBe(1);
    expect(response.title).toEqual('Pizza');
    expect(response.typeOfFood).toEqual('Cheese');
  });

  it('should throw a 200, if successful GET', async () => {
    const response = await request.get('/food');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

  it('should throw a 200, if successful GET by ID', async () => {
    const response = await request.get('/food?id=1');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

  it('should throw a 200, if successful UPDATE', async () => {
    const FoodId = await food.findOne({where: {id: 1}});
    const foundFood = await FoodId.update({
      title:'Pizza',
      typeOfFood:'Cheese',
    });
    expect(foundFood.id).toEqual(1);
  });

  it('should throw a 204, if successful DESTROY', async () =>{
    const updateFood = await food.findOne({where: {id: 1}});
    const foundFood = await updateFood.destroy({
      title:'Pizza',
      typeOfFood:'Cheese',
    });
    expect(foundFood.id).toEqual(undefined);
    expect(foundFood.text).toBe('food deleted');
  });

});