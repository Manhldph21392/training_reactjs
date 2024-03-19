export interface IUser {
    name: string;
    email: string;
    password: string;
    avatar: string;
    
}
export interface AuthToken {
    accessToken: string;
    tokenType: string;
    expiresIn: number; // Thời gian hết hạn của token, có thể là timestamp hoặc số giây
    // Các trường khác nếu cần
  }