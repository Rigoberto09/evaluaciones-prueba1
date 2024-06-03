import { BadRequestException, Body, Controller, Delete, Get, InternalServerErrorException, Param, Post, Put } from '@nestjs/common';
import { Productos } from '@prisma/client';
import { ProductoService } from './producto.service';

@Controller('producto')
export class ProductoController {
    constructor(private readonly productoService: ProductoService) { }

    @Get()
    async geProducto() {
        try {
            return this.productoService.getProducto();
        } catch (error) {
            // console.error('Error al mostrar los producto:', error);
            throw new InternalServerErrorException('No se pueden mostrar los Productos');
        }
    }

    @Post()
    async Creaproducto(@Body() data: Productos) {
        if (data.name.trim() !== '' && data.price.trim() !== '' && data.unit.trim() !== '' && data.tax.trim() !== '') {


            try {
                return this.productoService.crearProducto(data);
            } catch (error) {
                // console.error('Error al crear el producto:', error);
                throw new InternalServerErrorException('No se puede crear el producto');
            }
        } else {
            throw new BadRequestException('faltan datos');
        }
    }
    @Get(':productcode')
    async regirtroUnico(@Param('productcode') productcode: string) {
        try {
            return this.productoService.getProductoId(Number(productcode))
        } catch (error) {
            // console.error('Error al mostrar un producto:', error);
            throw new InternalServerErrorException('Tal parece que no se puede mostrar este producto');
        }
    }

    @Delete(':productcode')
    async eliminaproducto(@Param('productcode') productcode: string) {
        if (productcode.trim() !== '') {
            try {
                await this.productoService.eliminarProductoId(Number(productcode));
                return { mensaje: 'producto eliminado correctamente' };
            } catch (error) {
                // Control de error al eliminar datos
                console.error('Error al eliminar producto:', error);
                throw new InternalServerErrorException('No se pudo eliminar el producto');
            }
        } else {
            throw new BadRequestException('Falta Id para eliminar');
        }
    }


    @Put(':productcode')
    async actualizaproducto(@Param('productcode') productcode: string, @Body() data: Productos) {
        if (data.name.trim() !== '' && data.price.trim() !== '' && data.unit.trim() !== '' && data.tax.trim() !== '') {

            try {
                return this.productoService.actualizarProducto(Number(productcode), data);
            } catch (error) {
                // console.error('Error al actualizar el producto:', error);
                throw new InternalServerErrorException('Tal parece que no se puede actualizar este producto');
            }
        } else {
            throw new BadRequestException('faltan datos');

        }
    }
}
