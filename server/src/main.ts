import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

const PORT = process.env.PORT || 5000;
(async () => {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ credentials: true, origin: process.env.CLIENT_URL });
  app.use(cookieParser());

  await app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
