import { BaseAuthReqDto } from './base-auth.req.dto';
declare const SignInReqDto_base: import("@nestjs/common").Type<Pick<BaseAuthReqDto, "email" | "password">>;
export declare class SignInReqDto extends SignInReqDto_base {
}
export {};
