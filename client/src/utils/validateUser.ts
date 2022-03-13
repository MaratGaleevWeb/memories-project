export default function validateUser<
  T extends { email: string; password: string; confirmPassword?: string },
  Errors extends { [P in keyof T]?: string },
>({ email, password, confirmPassword }: T): Errors {
  const errors = {} as Errors;

  if (
    !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email,
    )
  ) {
    errors.email = 'Email must be valid';
  }

  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
    errors.password =
      'Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number';
  }

  if (confirmPassword && confirmPassword !== password) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
}
