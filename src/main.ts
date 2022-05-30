import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { UserService } from './user/user.service';

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

  const createAdmin = app.get(UserService);
  const admin = await createAdmin.findByName('admin');
  if(!admin) {
    await createAdmin.create({
      phone: process.env.ADMIN_PHONE,
      username: process.env.ADMIN_USER_NAME,
      password: process.env.ADMIN_PASSWORD
    });
  }
}
bootstrap();
