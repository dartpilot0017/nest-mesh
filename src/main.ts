/* eslint-disable prettier/prettier */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from './response.interceptor';
import { CustomExceptionFilter } from './custom-error.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set global prefix to /mesh/api
  app.setGlobalPrefix('mesh/api');

  // Enable global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip unknown properties
      forbidNonWhitelisted: true, // Throw errors for unknown properties
      transform: true, // Automatically transform payloads to match DTO classes
    }),
  );

  // Apply the global response interceptor
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new CustomExceptionFilter());

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Driveway Service API') // Set the title of your API documentation
    .setDescription('API documentation for the Driveway Service') // Description
    .setVersion('1.0') // Version of your API
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'access-token',
    ) // Adds the Bearer token authorization option
    .build();

  // Create Swagger document
  const document = SwaggerModule.createDocument(app, config);

  // Setup Swagger UI
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // Keeps the token after refresh
    },
  }); // Swagger UI will be available at '/api'

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
