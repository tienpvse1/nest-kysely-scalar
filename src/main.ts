import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { AppModule } from './app.module';

declare global {
  interface BigInt {
    toJSON(): Number;
  }
}

BigInt.prototype.toJSON = function () {
  return Number(this);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Kysely demonstration')
    .setDescription('This app is aim for kysely demonstration')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  app.use(
    '/reference',
    apiReference({ theme: 'solarized', spec: { content: document } }),
  );
  await app.listen(3000, function () {
    console.log('App is running on http://localhost:3000/reference');
  });
}
bootstrap();
