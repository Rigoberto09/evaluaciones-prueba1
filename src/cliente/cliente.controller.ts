import { BadRequestException, Body, Controller, Delete, Get, InternalServerErrorException, Param, Post, Put } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { clientes } from '@prisma/client';

@Controller('cliente')
export class ClienteController {
    constructor(private readonly clienteService: ClienteService) { }

    @Get()
    async geClientes() {
        try {
            return this.clienteService.getCliente();
        } catch (error) {
            // console.error('Error al mostrar los cliente:', error);
            throw new InternalServerErrorException('No se pueden mostrar los clientes');
        }
    }

    @Post()
    async CreaCliente(@Body() data: clientes) {
        if (data.name.trim() !== '' && data.address.trim() !== '' && data.phone.trim() !== '') {


            try {
                return this.clienteService.crearCliente(data);
            } catch (error) {
                // console.error('Error al crear el cliente:', error);
                throw new InternalServerErrorException('No se puede crear el cliente');
            }
        } else {
            throw new BadRequestException('faltan datos');
        }
    }
    @Get(':CustomerCode')
    async regirtroUnico(@Param('CustomerCode') CustomerCode: string) {
        try {
            return this.clienteService.getClienteId(Number(CustomerCode))
        } catch (error) {
            // console.error('Error al mostrar un cliente:', error);
            throw new InternalServerErrorException('Tal parece que no se puede mostrar este cliente');
        }
    }

    @Delete(':CustomerCode')
    async eliminaCliente(@Param('CustomerCode') CustomerCode: string) {
        if (CustomerCode.trim() !== '') {
            try {
                await this.clienteService.eliminarClienteId(Number(CustomerCode));
                return { mensaje: 'Cliente eliminado correctamente' };
            } catch (error) {
                // Control de error al eliminar datos
                console.error('Error al eliminar cliente:', error);
                throw new InternalServerErrorException('No se pudo eliminar el cliente');
            }
        } else {
            throw new BadRequestException('Falta Id para eliminar');
        }
    }


    @Put(':CustomerCode')
    async actualizaCliente(@Param('CustomerCode') CustomerCode: string, @Body() data: clientes) {
        if (data.name.trim() !== '' && data.address.trim() !== '' && data.phone.trim() !== '' && CustomerCode.trim() !== '') {

            try {
                return this.clienteService.actualizarCliente(Number(CustomerCode), data);
            } catch (error) {
                // console.error('Error al actualizar el cliente:', error);
                throw new InternalServerErrorException('Tal parece que no se puede actualizar este cliente');
            }
        } else {
            throw new BadRequestException('faltan datos');

        }
    }


}
