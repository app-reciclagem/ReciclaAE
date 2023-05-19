import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserRequest {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  role: string;
}
