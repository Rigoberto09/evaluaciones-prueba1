import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ClienteService],
  controllers: [ClienteController],
  imports: [PrismaModule]
})
export class ClienteModule { }