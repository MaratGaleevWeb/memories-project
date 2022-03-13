import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { join, resolve } from 'path';
import { unlink, writeFile } from 'fs';

import { InternalException } from '../utils/exceptions/internal.exception';

@Injectable()
export class FilesService {
  private filePath: string = resolve(__dirname, '..', 'static');

  async createFile({ buffer }: Express.Multer.File): Promise<string> {
    const fileName = uuidv4() + '.jpg';

    writeFile(join(this.filePath, fileName), buffer, (e) => {
      if (e) throw new InternalException();
    });
    return fileName;
  }

  async updateFile(oldFileName: string, { buffer }: Express.Multer.File): Promise<string> {
    const fileName = uuidv4() + '.jpg';

    unlink(join(this.filePath, oldFileName), (e) => {
      if (e) throw new InternalException();
    });
    writeFile(join(this.filePath, fileName), buffer, (e) => {
      if (e) throw new InternalException();
    });

    return fileName;
  }

  async deleteFile(fileName: string): Promise<void> {
    unlink(join(this.filePath, fileName), (e) => {
      if (e) throw new InternalException();
    });
  }
}
