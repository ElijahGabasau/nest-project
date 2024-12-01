import { UserBaseReqDto } from './user-base.req.dto';
declare const UserAdminBaseReqDto_base: import("@nestjs/common").Type<Pick<UserBaseReqDto, "name" | "email" | "password">>;
export declare class UserAdminBaseReqDto extends UserAdminBaseReqDto_base {
}
export {};
