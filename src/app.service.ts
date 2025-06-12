import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return {
      nombre: "Edson y Tos backends",

    };
  }
}