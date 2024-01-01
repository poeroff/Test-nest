import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';

import _ from "lodash"

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { Seat } from 'src/seat/entities/seat.entity';
import { Auth } from 'src/auth/entities/auth.entity';



@Injectable()
export class ReservationService {
  constructor(@InjectRepository(Seat) private seatRepository: Repository<Seat>, @InjectRepository(Auth) private AuthRepository: Repository<Auth>, @InjectRepository(Reservation) private reservationRepository: Repository<Reservation>) { }
  async create(createReservationDto: CreateReservationDto, id: number) {
    const seat = await this.seatRepository.findOne({ where: createReservationDto })
    if (seat.seat_use) {
      throw new NotAcceptableException("이미 예약된 좌석입니다")
    }
    const user = await this.AuthRepository.findOne({ where: { id: id } })
    if (seat.price > user.Point) {
      throw new NotAcceptableException("잔액이 부족합니다")
    }
   
    seat.seat_use = true;
    user.Point = user.Point - seat.price
    const reservation = this.reservationRepository.create({ userId: user.id, postId: seat.postId, seatId: seat.id })
    
    await this.reservationRepository.save(reservation)
    await this.seatRepository.save(seat)
    await this.AuthRepository.save(user);
    return seat
  }
  async cancel(createReservationDto: CreateReservationDto, id: number) {
    const seat = await this.seatRepository.findOne({ where: createReservationDto })
    const reservation = await this.reservationRepository.findOne({ where: { seatId: seat.id } })

    if (reservation === null) {
      throw new NotFoundException("예약된 좌석을 찾을수 없습니다")
    }
    await this.reservationRepository.delete({ seatId: seat.id })
    const user = await this.AuthRepository.findOne({ where: { id: id } })
    seat.seat_use = false;
    user.Point = user.Point + seat.price 
    await this.seatRepository.save(seat)
    await this.AuthRepository.save(user);
    return { state: 200, message: "sucess" }
  }

  async check(id: number) {
    
    const reservation = await this.reservationRepository.find({ where: { userId: id } })
   
    if (reservation.length === 0) {
      throw new NotFoundException("예메한 기록이 없습니다")
    }
    return await this.seatRepository.findOne({ where: { id: reservation[0].seatId } })

  }
}