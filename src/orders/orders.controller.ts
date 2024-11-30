/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // Create a new order
  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({
    status: 201,
    description: 'The order has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, invalid data.',
  })
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  // Get all orders
  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({
    status: 200,
    description: 'The list of orders has been successfully retrieved.',
  })
  async findAll() {
    return this.ordersService.findAll();
  }

  // Get an order by ID
  @Get(':id')
  @ApiOperation({ summary: 'Get an order by ID' })
  @ApiResponse({
    status: 200,
    description: 'The order has been successfully retrieved.',
  })
  async findOne(@Param('id') id: number) {
    return this.ordersService.findOne(id);
  }

  // Update an order by ID
  @Patch(':id')
  @ApiOperation({ summary: 'Update an order by ID' })
  @ApiResponse({
    status: 200,
    description: 'The order has been successfully updated.',
  })
  async update(
    @Param('id') id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.update(id, updateOrderDto);
  }

  // Delete an order by ID
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order by ID' })
  @ApiResponse({
    status: 200,
    description: 'The order has been successfully deleted.',
  })
  async remove(@Param('id') id: number) {
    return this.ordersService.remove(id);
  }
}
