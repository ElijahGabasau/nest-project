import { UserBaseResDto } from './user-base.res.dto';
declare const UserAdminResDto_base: import("@nestjs/common").Type<Pick<UserBaseResDto, "name" | "id" | "role">>;
export declare class UserAdminResDto extends UserAdminResDto_base {
}
export {};
