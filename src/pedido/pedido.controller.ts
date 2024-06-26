import { BadRequestException, Body, Controller, Delete, Get, InternalServerErrorException, Param, Post, Put } from '@nestjs/common';
import { pedidos } from '@prisma/client';
import { PedidoService } from './pedido.service';

@Controller('pedido')
export class PedidoController {
    constructor(private readonly pedidoService: PedidoService) { }

    @Get()
    async gePedidos() {
        try {
            return this.pedidoService.getPedido();
        } catch (error) {
            // console.error('Error al mostrar los pedido:', error);
            throw new InternalServerErrorException('No se pueden mostrar los pedidos');
        }
    }

    @Post()
    async CreaPedido(@Body() data: pedidos) {
        if (data.productcode.trim() !== '' && data.CustomerCode.trim() !== '' && data.quantity.trim() !== '' && data.SubTotal.trim() !== '' && data.Total.trim() !== '' && data.others.trim() !== '' && data.address.trim() !== '') {


            try {
                return this.pedidoService.crearPedido(data);
            } catch (error) {
                // console.error('Error al crear el pedido:', error);
                throw new InternalServerErrorException('No se puede crear el pedido');
            }
        } else {
            throw new BadRequestException('faltan datos');
        }
    }
    @Get(':code')
    async regirtroUnico(@Param('code') code: string) {
        try {
            return this.pedidoService.getPedidoId(Number(code))
        } catch (error) {
            // console.error('Error al mostrar un pedido:', error);
            throw new InternalServerErrorException('Tal parece que no se puede mostrar este pedido');
        }
    }

    @Delete(':code')
    async eliminaPedido(@Param('code') code: string) {
        if (code.trim() !== '') {
            try {
                await this.pedidoService.eliminarPedidoId(Number(code));
                return { mensaje: 'Pedido eliminado correctamente' };
            } catch (error) {
                // Control de error al eliminar datos
                console.error('Error al eliminar pedido:', error);
                throw new InternalServerErrorException('No se pudo eliminar el pedido');
            }
        } else {
            throw new BadRequestException('Falta Id para eliminar');
        }
    }


    @Put(':code')
    async actualizaPedido(@Param('code') code: string, @Body() data: pedidos) {
        if (data.productcode.trim() !== '' 
        && data.CustomerCode.trim() !== '' 
        && data.quantity.trim() !== ''
        && data.SubTotal.trim() !== '' 
        && data.Total.trim() !== '' 
        && data.others.trim() !== '' 
        && data.address.trim() !== '') {
            try {
                return this.pedidoService.actualizarPedido(Number(code), data);
            } catch (error) {
                // console.error('Error al actualizar el pedido:', error);
                throw new InternalServerErrorException('Tal parece que no se puede actualizar este pedido');
            }
        } else {
            throw new BadRequestException('faltan datos');

        }
    }
}
