export interface UserModel {
  email: string;
  mobile: string;
  password: string;
  ConfirmPassword: string;
  first_name: string;
  last_name: string;
  phone: string;
  role: string;
  company_name?: string;
  city?: string;
  area?: string;
  trade_licence?: string;
  type?: number;
}


export  class TokenModel{
  refreshToken: string;
}

