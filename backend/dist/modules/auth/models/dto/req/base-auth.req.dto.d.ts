import { UserBaseReqDto } from '../../../../users/models/dto/req/user-base.req.dto';
declare const BaseAuthReqDto_base: import("@nestjs/common").Type<Pick<UserBaseReqDto, "name" | "email" | "phone" | "password">>;
export declare class BaseAuthReqDto extends BaseAuthReqDto_base {
}
export {};
