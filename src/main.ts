import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './data-source';
import { User } from './entity/user';
import { error } from 'console';



async function bootstrap() {
<<<<<<< HEAD
  const app = await NestFactory.create(AppModule);
  await app.listen(5000);
=======
  try {
    await AppDataSource.initialize()

    const app = await NestFactory.create(AppModule);
    await app.listen(process.env.PORT ?? 3000);
    
  } catch(error){
    console.log(error)
  }

  
>>>>>>> 185aefe (api)
}
bootstrap();
