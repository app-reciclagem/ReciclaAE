import {
  MinLength,
  Matches,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
} from "class-validator";

export class User {
  @IsString()
  @IsNotEmpty()
  name: string;

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

  @IsString()
  @IsOptional()
  photo: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsNotEmpty()
  @IsBoolean()
  termosDeUso: boolean;

  @IsNotEmpty()
  @IsBoolean()
  politicaPrivacidade: boolean;
}
