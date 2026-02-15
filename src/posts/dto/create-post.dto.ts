import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreatePostDto {
	@IsString({ message: 'Навазние должно быть строкой.' })
	@IsNotEmpty({ message: 'Навазние не должно быть пустым.' })
	title: string

	@IsString({ message: 'Описание должно быть строкой.' })
	@IsNotEmpty({ message: 'Описание не должно быть пустым.' })
	description: string

	@IsString({ message: 'Описание должно быть строкой.' })
	@IsOptional()
	medias?: string[]
}
