import { IsString, IsNotEmpty } from 'class-validator';

export default class GoogleAccessTokenDto {
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}
