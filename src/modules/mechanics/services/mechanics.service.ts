import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { MechanicID } from '../../../common/types/entity-ids.type';
import { MechanicEntity } from '../../../database/entities/mechanic.entity';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';
import { MechanicRepository } from '../../repository/services/mechanic.repository';
import { MechanicsBaseReqDto } from '../models/dto/req/mechanics-base.req.dto';
import { MechanicsUpdateReqDto } from '../models/dto/req/mechanics-update.req.dto';

@Injectable()
export class MechanicsService {
  constructor(private readonly mechanicRepository: MechanicRepository) {}

  public async create(
    userData: IUserData,
    dto: MechanicsBaseReqDto,
  ): Promise<MechanicEntity> {
    console.log(userData);
    await this.isEmailExist(dto.email);
    return await this.mechanicRepository.save(
      this.mechanicRepository.create({
        ...dto,
        user_id: userData.userId,
      }),
    );
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
      throw new ConflictException(
        'Mechanic not found or is not yours mechanic',
      );
    }
    mechanic.experienceInYears = dto.experienceInYears;
    mechanic.phone = dto.phone;
    return await this.mechanicRepository.save(mechanic);
  }

  public async get() {
    return 'This action returns a user';
  }

  public async getAll() {
    return 'This action returns all users';
  }

  public async delete() {
    return 'This action removes a user';
  }

  public async getMechanics() {
    return 'This action returns all mechanics';
  }

  private async isEmailExist(email: string) {
    const mechanic = await this.mechanicRepository.findOneBy({ email });
    if (mechanic) {
      throw new ConflictException('Email already exist');
    }
  }
}
