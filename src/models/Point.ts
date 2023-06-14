import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class Point {
  @IsString()
  @IsOptional()
  id?: string

  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsNumber()
  @IsNotEmpty()
  latitude?: number;

  @IsNumber()
  @IsNotEmpty()
  longitude?: number;

  @IsString()
  @IsNotEmpty()
  tipoLixo? : string[];

  @IsString()
  @IsNotEmpty()
  city     ?: string;

  @IsString()
  @IsNotEmpty()
  state ?   :string ;

  @IsString()
  @IsOptional()
  photo?: string;

}
