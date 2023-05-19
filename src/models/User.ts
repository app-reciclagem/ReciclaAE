import { MinLength, Matches, IsNotEmpty, IsString } from "class-validator";

export class User {
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
