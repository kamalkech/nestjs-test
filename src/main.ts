import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as csurf from 'csurf';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const secret = csurf.tokens.secretSync();
  // const token = csurf.create(secret)

  // console.log('secret', secret);

  // app.use(csurf());

  // const options = new DocumentBuilder()
  //   .setTitle('API example')
  //   .setDescription('The API description')
  //   .setVersion('1.0')
  //   .addTag('nestjs')
  //   .addBearerAuth()
  //   .build();

  // const swaggerDoc = SwaggerModule.createDocument(app, options);
  // SwaggerModule.setup('v1/api', app, swaggerDoc);

  const port = process.env.PORT;
  await app.listen(port);
}
bootstrap();
