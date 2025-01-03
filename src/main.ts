import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Ecossistema Lion')
    .setDescription('API do Ecossistema Lion')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // Configuração de validação global
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Habilitar CORS, se necessário
  app.enableCors();

  // Inicializar a aplicação
  await app.init();

  // Iniciar o servidor
  const port = process.env.PORT || 5959;
  await app.listen(port, () => {
    console.log(`🚀 API rodando em http://localhost:${port}`);
    console.log(`📚 Swagger em http://localhost:${port}/api-docs`);
  });
  server.all('*', (req, res) => res.status(404).send('Rota não encontrada'));
}

bootstrap();
