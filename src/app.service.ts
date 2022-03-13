import { Injectable } from '@nestjs/common';
import path from 'path';
import axios from 'axios';
import fs from 'fs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async downloadFile(fileUrl, downloadFolder): Promise<void> {
    // Get the file name
    // const fileName = path.basename(fileUrl);

    // The path of the downloaded file on our machine
    // const localFilePath = path.resolve(
    //   __dirname,
    //   downloadFolder,
    //   'example.mp4',
    // );
    // try {
    //   const response = await axios({
    //     method: 'GET',
    //     url: fileUrl,
    //     responseType: 'stream',
    //   });

    //   const w = response.data.pipe(fs.createWriteStream(localFilePath));
    //   w.on('finish', () => {
    //     console.log('Successfully downloaded file!');
    //   });
    // } catch (err) {
    //   throw new Error(err);
    // }

    const url = 'https://unsplash.com/photos/AaEQmoufHLk/download?force=true';
    const path_ = path.resolve(__dirname, 'media', 'video.mp4');

    const response = await axios({
      method: 'GET',
      url: url,
      responseType: 'stream',
    });

    response.data.pipe(fs.createWriteStream(path_));

    return new Promise((resolve, reject) => {
      response.data.on('end', () => {
        resolve();
      });

      response.data.on('error', (err) => {
        reject(err);
      });
    });
  }
}
