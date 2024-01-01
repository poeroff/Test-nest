import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from 'src/seat/entities/seat.entity';
import { Reservation } from './entities/reservation.entity';
import { Auth } from 'src/auth/entities/auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports : [TypeOrmModule.forFeature([Seat, Reservation, Auth]),JwtModule.registerAsync({ useFactory: (config: ConfigService) => ({secret: config.get<string>('JWT_SECRET_KEY')}), inject: [ConfigService],})],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
