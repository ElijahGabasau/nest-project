import { UserBaseResDto } from './user-base.res.dto';
declare const UserShortResDto_base: import("@nestjs/common").Type<Pick<UserBaseResDto, "name" | "id" | "email" | "role">>;
export declare class UserShortResDto extends UserShortResDto_base {
}
export {};
