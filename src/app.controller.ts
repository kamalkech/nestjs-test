import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import * as bcrypt from 'bcrypt';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async home(): Promise<string> {
    return this.appService.getHello();
  }

  @Get('/hello')
  async getHello(): Promise<string> {
    return 'Hello World!';
    const iv = randomBytes(16);
    const password = 'Password used to generate key';

    // The key length is dependent on the algorithm.
    // In this case for aes256, it is 32 bytes.
    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);

    const textToEncrypt = 'Nest';
    const encryptedText = Buffer.concat([
      cipher.update(textToEncrypt),
      cipher.final(),
    ]);
    console.log('encryptedText', encryptedText);

    // const saltOrRounds = 10;
    // const password = 'random_password';
    // const hash = await bcrypt.hash(password, saltOrRounds);
    // console.log('hash', hash);

    return this.appService.getHello();
  }

  @Get('/download')
  async download(): Promise<any> {
    // const IMAGE_URL =
    //   'https://www.kindacode.com/wp-content/uploads/2021/01/test.jpg';
    // downloadFile(IMAGE_URL, 'download');

    const VIDEO_URL =
      'https://www.kindacode.com/wp-content/uploads/2021/01/example.mp4';
    await this.appService.downloadFile(VIDEO_URL, 'download');
  }
}
