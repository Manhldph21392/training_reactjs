export interface ILoginParams{
    email: string;
    password: string;
    rememberMe: boolean;
}

export interface ILoginValidation{
    email: string;
    password: string;
}

export enum EGender {
    Male = "male",
    Female = "female",
    Other = "other",
  }
  
  export interface IUser {
    id: number;
    email: string;
    name: string;
    gender: EGender;
    avatar: string | null;
    region: number;
    state: number;
    description: string | null;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface IAuthState {
    user: IUser | null;
    loading: boolean;
    error: string | null;
  }
  
  // Get Current User -------------------------------------
  export interface IGetCurrentUserResponse {
    message: string;
    error: boolean;
    code: number;
    data: IUser & { token: string };
  }
  export interface IRegisterPayload {
    email: string;
    password: string;
    repeatPassword: string;
    name: string;
    gender: EGender;
    region: number;
    state: number;
  }
  export interface IRegisterResponse {
    message: string;
    error: boolean;
    code: number;
    data: IUser & { token: string };
  }
  