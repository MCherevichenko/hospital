import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle("Hospital")
  .setDescription("The hospital api")
  .setVersion("1.0")
  .addBearerAuth()
  .build();

  const PORT = process.env.PORT;
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(PORT, () => {console.log(`Server started on ${PORT} port`);
  });
}
bootstrap();
