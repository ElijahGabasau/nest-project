import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { RoleEnum } from '../../../common/enums/role.enum';
import { MechanicID } from '../../../common/types/entity-ids.type';
import { MechanicEntity } from '../../../database/entities/mechanic.entity';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';
import { CarShowroomRepository } from '../../repository/services/car-showroom.repository';
import { MechanicRepository } from '../../repository/services/mechanic.repository';
import { ListMechanicQueryDto } from '../models/dto/req/list-mechanic-query.dto';
import { MechanicsBaseReqDto } from '../models/dto/req/mechanics-base.req.dto';
import { MechanicsUpdateReqDto } from '../models/dto/req/mechanics-update.req.dto';

@Injectable()
export class MechanicsService {
  constructor(
    private readonly mechanicRepository: MechanicRepository,
    private readonly carShowroomRepository: CarShowroomRepository,
  ) {}

  public async create(
    userData: IUserData,
    dto: MechanicsBaseReqDto,
  ): Promise<MechanicEntity> {
    await this.isEmailExist(dto.email);
    const carShowroom = await this.carShowroomRepository.findOneBy({
      user_id: userData.userId,
    });
    if (!carShowroom) {
      throw new ConflictException(
        'You cannot create mechanic without showroom',
      );
    }
    const newMechanic = await this.mechanicRepository.save(
      this.mechanicRepository.create({
        ...dto,
        user_id: userData.userId,
        carShowroom_id: carShowroom.id,
        role: RoleEnum.SHOWROOM_MECHANIC,
      }),
    );
    const mechanicWithShowroom = await this.mechanicRepository.findOne({
      where: { id: newMechanic.id },
      relations: ['carShowroom'],
    });

    return mechanicWithShowroom;
  }

  public async update(
    userData: IUserData,
    dto: MechanicsUpdateReqDto,
    mechanicId: MechanicID,
  ): Promise<MechanicEntity> {
    const mechanic = await this.mechanicRepository.findOneBy({
      id: mechanicId,
      user_id: userData.userId,
    });
    if (!mechanic) {
      throw new BadRequestException(
        'Mechanic not found or is not yours mechanic',
      );
    }
    mechanic.experienceInYears = dto.experienceInYears;
    mechanic.phone = dto.phone;
    const updatedMechanic = await this.mechanicRepository.save(mechanic);

    const mechanicWithShowroom = await this.mechanicRepository.findOne({
      where: { id: updatedMechanic.id },
      relations: ['carShowroom'],
    });

    return mechanicWithShowroom;
  }

  public async getAll(
    query: ListMechanicQueryDto,
  ): Promise<[MechanicEntity[], number]> {
    return await this.mechanicRepository.findAllBy(query);
  }

  public async getMyMechanic(
    userData: IUserData,
    mechanicId: MechanicID,
  ): Promise<MechanicEntity> {
    const mechanic = await this.mechanicRepository.findOneBy({
      id: mechanicId,
      user_id: userData.userId,
    });
    if (!mechanic) {
      throw new BadRequestException(
        'Mechanic not found or is not yours mechanic',
      );
    }
    const mechanicWithShowroom = await this.mechanicRepository.findOne({
      where: { id: mechanic.id },
      relations: ['carShowroom'],
    });

    return mechanicWithShowroom;
  }

  public async getById(mechanicId: MechanicID): Promise<MechanicEntity> {
    const mechanic = await this.mechanicRepository.findOneBy({
      id: mechanicId,
    });
    if (!mechanic) {
      throw new BadRequestException('Mechanic not found');
    }
    const mechanicWithShowroom = await this.mechanicRepository.findOne({
      where: { id: mechanic.id },
      relations: ['carShowroom'],
    });

    return mechanicWithShowroom;
  }

  public async deleteMyMechanic(
    userData: IUserData,
    mechanicId: MechanicID,
  ): Promise<void> {
    const mechanic = await this.mechanicRepository.findOneBy({
      id: mechanicId,
      user_id: userData.userId,
    });
    if (!mechanic) {
      throw new BadRequestException(
        'Mechanic not found or is not yours mechanic',
      );
    }
    await this.mechanicRepository.remove(mechanic);
  }

  public async deleteById(mechanicId: MechanicID): Promise<void> {
    const mechanic = await this.mechanicRepository.findOneBy({
      id: mechanicId,
    });
    if (!mechanic) {
      throw new BadRequestException('Mechanic not found');
    }
    await this.mechanicRepository.remove(mechanic);
  }

  private async isEmailExist(email: string) {
    const mechanic = await this.mechanicRepository.findOneBy({ email });
    if (mechanic) {
      throw new ConflictException('Email already exist');
    }
  }
}
