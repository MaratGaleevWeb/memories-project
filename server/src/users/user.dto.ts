import { IsNotEmpty, Matches } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'FirstName must not be empty' })
  readonly firstName: string;

  @IsNotEmpty({ message: 'LastName must not be empty' })
  readonly lastName: string;

  @Matches(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    { message: 'Email must be valid' },
  )
  readonly email: string;

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      'Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number',
  })
  readonly password: string;

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      'Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number',
  })
  readonly confirmPassword: string;
}

export class LoginUserDto {
  @IsNotEmpty({ message: 'Email must not be empty' })
  readonly email: string;

  @IsNotEmpty({ message: 'Password must not be empty' })
  readonly password: string;
}
