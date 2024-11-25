import { ConflictException, Injectable } from '@nestjs/common';

import { CarShowroomID } from '../../../common/types/entity-ids.type';
import { CarShowroomEntity } from '../../../database/entities/car-showroom.entity';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';
import { CarShowroomRepository } from '../../repository/services/car-showroom.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { CarShowroomBaseReqDto } from '../models/dto/req/car-showroom-base.req.dto';
import { CarShowroomUpdateReqDto } from '../models/dto/req/car-showroom-update.req.dto';
import { ListCarShowroomQueryDto } from '../models/dto/req/list-car-showroom-query.dto';

@Injectable()
export class CarShowroomService {
  constructor(
    private readonly carShowroomRepository: CarShowroomRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async create(
    userData: IUserData,
    dto: CarShowroomBaseReqDto,
  ): Promise<CarShowroomEntity> {
    await this.userRepository.update(userData.userId, { isHaveSalon: true });
    return await this.carShowroomRepository.save(
      this.carShowroomRepository.create({
        ...dto,
        user_id: userData.userId,
      }),
    );
  }

  public async updateMyShowroom(
    userData: IUserData,
    dto: CarShowroomUpdateReqDto,
  ): Promise<CarShowroomEntity> {
    const carShowroom = await this.carShowroomRepository.findOneBy({
      user_id: userData.userId,
    });
    if (!carShowroom) {
      throw new ConflictException('You do not have a showroom');
    }
    carShowroom.description = dto.description;
    carShowroom.phone = dto.phone;
    return await this.carShowroomRepository.save(carShowroom);
  }

  public async deleteMyShowroom(userData: IUserData): Promise<void> {
    const carShowroom = await this.carShowroomRepository.findOneBy({
      user_id: userData.userId,
    });
    if (!carShowroom) {
      throw new ConflictException('You do not have a showroom to delete');
    }
    await this.userRepository.update(userData.userId, { isHaveSalon: false });
    await this.carShowroomRepository.remove(carShowroom);
  }

  public async getMyShowRoom(userData: IUserData): Promise<CarShowroomEntity> {
    return await this.carShowroomRepository.findOneBy({
      user_id: userData.userId,
    });
  }

  public async findAll(
    query: ListCarShowroomQueryDto,
  ): Promise<[CarShowroomEntity[], number]> {
    return await this.carShowroomRepository.findAll(query);
  }

  public async getShowroom(showroomId: CarShowroomID) {
    const showroom = await this.carShowroomRepository.findOneBy({
      id: showroomId,
    });
    if (!showroom) {
      throw new ConflictException('Showroom not found');
    }
    return showroom;
  }

  public async deleteShowroom(showroomId: CarShowroomID) {
    const showroom = await this.carShowroomRepository.findOneBy({
      id: showroomId,
    });
    if (!showroom) {
      throw new ConflictException('Showroom not found');
    }
    await this.userRepository.update(showroom.user_id, { isHaveSalon: false });
    await this.carShowroomRepository.remove(showroom);
  }
}
