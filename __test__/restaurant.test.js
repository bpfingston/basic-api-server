'use strict';

const {db, restaurant} = require('../src/models');
const app = require('../src/server');
const supertest = require('supertest');
const request = supertest(app.app);


beforeAll(async () => await db.sync());
afterAll(async () => await db.drop());

describe('Testing restaurant model', () => {
    it('should throw a 201, if successful POST', async () => {
      const response = await restaurant.create({
        title:'Dominos',
        typeOfFood:'Pizza',
      });
      expect(response.id).toBe(1);
      expect(response.title).toEqual('Dominos');
      expect(response.typeOfFood).toEqual('Pizza');
    });
  
    it('should throw a 200, if successful GET', async () => {
      const response = await request.get('/restaurant');
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
    });
  
    it('should throw a 200, if successful GET by ID', async () => {
      const response = await request.get('/restaurant?id=1');
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
    });
  
    it('should throw a 200, if successful UPDATE', async () => {
      const id = 1;
      const response = await request.update({
        where: {id: id},
        title:'Dominos',
        typeOfFood:'Pizza',
      });
      expect(response.id).toBe(1);
      expect(response.title).toEqual('Dominos');
      expect(response.typeOfFood).toEqual('Pizza');
    });
  
    // it('should throw a 204, if successful DESTROY', async () =>{
    //   const response = await restaurant.create({
    //     title:'Pizza',
    //     typeOfFood:'Cheese',
    //   });
    //   expect(response.id).toBe(1);
    //   expect(response.title).toEqual('Pizza');
    //   expect(response.typeOfFood).toEqual('Cheese');
    // });
  
  });