import { MechanicEntity } from '../../../database/entities/mechanic.entity';
import { MechanicsBaseResDto } from '../models/dto/res/mechanics-base.res.dto';

export class MechanicMapper {
  public static toResDto(mechanic: MechanicEntity): MechanicsBaseResDto {
    return {
      id: mechanic.id,
      role: mechanic.role,
      name: mechanic.name,
      email: mechanic.email,
      phone: mechanic.phone,
      experienceInYears: mechanic.experienceInYears,
    };
  }
}
