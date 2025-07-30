export interface UserRegister {
  username: string;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface ApiResponse {
  success: boolean;
  data?: {
    id_user: string;
    username: string;
    email: string;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
  };
  token: string; 
  message: string;
}