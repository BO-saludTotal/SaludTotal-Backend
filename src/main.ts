import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';

import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'; // Importa

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector)),
    );
    
    
    //cors
    app.enableCors({
		origin: ['https://saludtotal-frontend.pages.dev'],
		methods:['GET','POST','PUT','DELETE'],
		credentials: true,
		});
    

    const port = process.env.PORT ?? 5000;
    
    await app.listen(port);
    
    console.log((`Backend is running on: http://localhost:${port}`);
    console.log(`Application is running on: http://localhost:${port}`);
  } catch (error) {
    console.error('Error durante el bootstrap:', error);
    process.exit(1);
  }
}
bootstrap();
