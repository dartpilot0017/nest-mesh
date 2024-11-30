/* eslint-disable prettier/prettier */
// src/quotes/quotes.controller.spec.ts
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { QuotesModule } from './quotes.module';

describe('QuotesController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [QuotesModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create a quote', async () => {
    const response = await request(app.getHttpServer())
      .post('/quotes')
      .send({
        clientId: 1,
        propertyDetails: '123 Main Street, 500 sq ft',
        additionalNotes: 'Please complete by next week.',
        description: 'A detailed quote for the property at 123 Main Street.',
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.propertyDetails).toBe('123 Main Street, 500 sq ft');
  });

  it('should get all quotes for a client', async () => {
    const response = await request(app.getHttpServer())
      .get('/quotes/1') // Assuming clientId = 1
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0].propertyDetails).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });
});
