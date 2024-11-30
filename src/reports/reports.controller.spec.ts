/* eslint-disable prettier/prettier */
// src/reports/reports.controller.spec.ts
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ReportsModule } from './reports.module';

describe('ReportsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ReportsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should generate revenue report', async () => {
    const response = await request(app.getHttpServer())
      .get('/reports/revenue')
      .expect(200);

    expect(response.body).toHaveProperty('totalRevenue');
    expect(typeof response.body.totalRevenue).toBe('number');
  });

  afterAll(async () => {
    await app.close();
  });
});
