import { Module } from '@nestjs/common';
import { ClienteModule } from './cliente/cliente.module';
import { ProductoModule } from './producto/producto.module';
import { PedidoModule } from './pedido/pedido.module';

@Module({
  imports: [ClienteModule,ProductoModule,PedidoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
