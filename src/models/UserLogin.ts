import { IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class UserLogin {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
    message: "password too weak",
  })
  password: string;
}
