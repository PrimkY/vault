import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {

  const VAULT_PORT = process.env.VAULT_PORT;
  const app = await NestFactory.create(AppModule);
  await app.listen(VAULT_PORT, () => console.log(`Vault service started on port ${VAULT_PORT}`));

}
start();
