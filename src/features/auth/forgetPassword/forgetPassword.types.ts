export interface TokenType {
  emailId: string;
  mobile: string;
  token: string;
  tokenIdentify: string;
}

export enum ForgetPasswordPhase {
  EnterUserId,
  VerifyOTP,
  Success,
}