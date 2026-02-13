import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

export class LoginDto {
	@IsEmail({}, { message: 'Email не валидный' })
	@IsString({ message: 'Email должен быть строкой' })
	@IsOptional()
	email?: string

	@IsString({ message: 'Пароль должен быть строкой' })
	@MinLength(6, { message: 'Пароль должен быть не меньше 6 символов' })
	@MaxLength(32, { message: 'Пароль должен быть не больше 32 символов' })
	@IsOptional()
	password: string

	@IsString({ message: 'Логин должен быть строкой' })
	@IsOptional()
	login?: string

	@IsString({ message: 'Номер телефона должен быть строкой' })
	@IsOptional()
	phoneNumber?: string
}
