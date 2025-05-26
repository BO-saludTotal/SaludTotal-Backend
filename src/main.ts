import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';

async function bootstrap() {
  try {
    //await AppDataSource.initialize(); 

    const app = await NestFactory.create(AppModule);
    await app.listen(process.env.PORT ?? 3000);
    console.log(`Application is running on: ${await app.getUrl()}`);

  } catch(error){
    console.log('Error durante el bootstrap:', error);
  }
}
bootstrap();