import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { clientes } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClienteService {
    constructor(private prisma: PrismaService) { }

    // async getCliente(): Promise<clientes[]>{

    //     return this.prisma.clientes.findMany()
    // }
    async getCliente(): Promise<clientes[]> {
        const clientes = await this.prisma.clientes.findMany();
        if (clientes.length === 0) {
            throw new NotFoundException('No se encontraron clientes');
        }
        return clientes;
    }
    //   async getClientes(): Promise<any> {
    //     const clientes = await this.prisma.clientes.findMany();
    //     if (clientes.length === 0) {
    //       return { message: 'No se encontraron clientes' };
    //     }
    //     return clientes;
    //   }

    async getClienteId(CustomerCode: number): Promise<clientes> {
        try {
            const cliente = await this.prisma.clientes.findUnique({
                where: {
                    CustomerCode
                }
            });

            if (!cliente) {
                throw new NotFoundException('No se encontraron clientes');
            }

            return cliente;
        } catch (error) {
            // Control de errors
            // console.error('Error al obtener cliente:', error);
            throw new InternalServerErrorException('Error al obtener cliente');
        }
    }

    async crearCliente(data: clientes): Promise<clientes> {
        return this.prisma.clientes.create({
            data
        })
    }
    async actualizarCliente(CustomerCode: number, data: clientes): Promise<clientes> {

        try {
            const cliente = await this.prisma.clientes.update({
                where: {
                    CustomerCode
                },
                data
            });

            if (!cliente) {
                throw new NotFoundException('No se actualizaron los clientes');
            }

            return cliente;
        } catch (error) {
            // Control de errors
            // console.error('Error al actualizar cliente:', error);
            throw new InternalServerErrorException('Error al actualizar cliente');
        }
    }
    async eliminarClienteId(CustomerCode: number): Promise<clientes> {
        try {
            const cliente = await this.prisma.clientes.delete({
                where: {
                    CustomerCode
                }
            })

            if (!cliente) {
                throw new NotFoundException('No se elimino el clientes');
            }

            return cliente;
        } catch (error) {
            // Control de errors
            // console.error('Error al eliminar el cliente:', error);
            throw new InternalServerErrorException('Error al eliminar el cliente');
        }
    }
}
