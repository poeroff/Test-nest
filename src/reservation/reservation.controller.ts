import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

import { AuthGuard } from 'src/guard/auth.guard';
import { Serialze } from 'src/interceptors/serialize.interceptor';
import { Reservationdto } from './dto/reservation';

@UseGuards(AuthGuard)
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @Serialze(Reservationdto)
  reservation(@Body() createReservationDto: CreateReservationDto, @Req() request) {
    return this.reservationService.create(createReservationDto , request.user.id);
  }

  @Delete("/cancel")
  async cancelreservation(@Body() createReservationDto: CreateReservationDto, @Req() request){
    const cancel = await this.reservationService.cancel(createReservationDto , request.user.id)
    return cancel
  }

  @Get("/check")
  check(@Req() request){
    return this.reservationService.check(request.user.id);
  }
}
