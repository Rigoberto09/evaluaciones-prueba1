import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ProductoService],
  controllers: [ProductoController],
  imports:[PrismaModule]
})
export class ProductoModule {}
