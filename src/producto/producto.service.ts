import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Productos } from '@prisma/client';
@Injectable()
export class ProductoService {
    constructor(private prisma: PrismaService) { }

    // async getProducto(): Promise<Productos[]>{

    //     return this.prisma.productos.findMany()
    // }
    async getProducto(): Promise<Productos[]> {
        const Productos = await this.prisma.productos.findMany();
        if (Productos.length === 0) {
            throw new NotFoundException('No se encontraron Productos');
        }
        return Productos;
    }
    //   async getProductos(): Promise<any> {
    //     const Productos = await this.prisma.productos.findMany();
    //     if (Productos.length === 0) {
    //       return { message: 'No se encontraron Productos' };
    //     }
    //     return Productos;
    //   }

    async getProductoId(productcode: number): Promise<Productos> {
        try {
            const Producto = await this.prisma.productos.findUnique({
                where: {
                    productcode
                }
            });

            if (!Producto) {
                throw new NotFoundException('No se encontraron Productos');
            }

            return Producto;
        } catch (error) {
            // Control de errors
            // console.error('Error al obtener Producto:', error);
            throw new InternalServerErrorException('Error al obtener Producto');
        }
    }

    async crearProducto(data: Productos): Promise<Productos> {
        return this.prisma.productos.create({
            data
        })
    }
    async actualizarProducto(productcode: number, data: Productos): Promise<Productos> {

        try {
            const Producto = await this.prisma.productos.update({
                where: {
                    productcode
                },
                data
            });

            if (!Producto) {
                throw new NotFoundException('No se actualizaron los Productos');
            }

            return Producto;
        } catch (error) {
            // Control de errors
            // console.error('Error al actualizar Producto:', error);
            throw new InternalServerErrorException('Error al actualizar Producto');
        }
    }
    async eliminarProductoId(productcode: number): Promise<Productos> {
        try {
            const Producto = await this.prisma.productos.delete({
                where: {
                    productcode
                }
            })

            if (!Producto) {
                throw new NotFoundException('No se elimino el Productos');
            }

            return Producto;
        } catch (error) {
            // Control de errors
            // console.error('Error al eliminar el Producto:', error);
            throw new InternalServerErrorException('Error al eliminar el Producto');
        }
    }
}
