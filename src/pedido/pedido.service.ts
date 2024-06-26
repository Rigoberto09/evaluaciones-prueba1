import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { pedidos } from '@prisma/client';
@Injectable()
export class PedidoService {
    constructor(private prisma: PrismaService) { }

    // async getPedido(): Promise<pedidos[]>{

    //     return this.prisma.pedidos.findMany()
    // }
    async getPedido(): Promise<pedidos[]> {
        const pedidos = await this.prisma.pedidos.findMany();
        if (pedidos.length === 0) {
            throw new NotFoundException('No se encontraron pedidos');
        }
        return pedidos;
    }
    //   async getPedidos(): Promise<any> {
    //     const pedidos = await this.prisma.pedidos.findMany();
    //     if (pedidos.length === 0) {
    //       return { message: 'No se encontraron pedidos' };
    //     }
    //     return pedidos;
    //   }

    async getPedidoId(code: number): Promise<pedidos> {
        try {
            const pedido = await this.prisma.pedidos.findUnique({
                where: {
                    code
                }
            });

            if (!pedido) {
                throw new NotFoundException('No se encontraron pedidos');
            }

            return pedido;
        } catch (error) {
            // Control de errors
            // console.error('Error al obtener pedido:', error);
            throw new InternalServerErrorException('Error al obtener pedido');
        }
    }

    async crearPedido(data: pedidos): Promise<pedidos> {
        return this.prisma.pedidos.create({
            data
        })
    }
    async actualizarPedido(code: number, data: pedidos): Promise<pedidos> {

        try {
            const pedido = await this.prisma.pedidos.update({
                where: {
                    code
                },
                data
            });

            if (!pedido) {
                throw new NotFoundException('No se actualizaron los pedidos');
            }

            return pedido;
        } catch (error) {
            // Control de errors
            // console.error('Error al actualizar pedido:', error);
            throw new InternalServerErrorException('Error al actualizar pedido');
        }
    }
    async eliminarPedidoId(code: number): Promise<pedidos> {
        try {
            const pedido = await this.prisma.pedidos.delete({
                where: {
                    code
                }
            })

            if (!pedido) {
                throw new NotFoundException('No se elimino el pedidos');
            }

            return pedido;
        } catch (error) {
            // Control de errors
            // console.error('Error al eliminar el pedido:', error);
            throw new InternalServerErrorException('Error al eliminar el pedido');
        }
    }
}
