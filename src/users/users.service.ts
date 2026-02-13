import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './users.model'
import { Model } from 'mongoose'
import { hash } from 'argon2'

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<User>
	) {}

	async create(dto: CreateUserDto) {
		const tempUser = await this.userModel.findOne({
			$or: [
				{ email: dto.email },
				{ login: dto.login },
				{ phoneNumber: dto.phoneNumber }
			]
		})
		if (tempUser)
			throw new BadRequestException(
				'Пользователь с такими данными уже существует'
			)

		const hashPassword = await hash(dto.password)

		return await this.userModel.create({
			...dto,
			password: hashPassword
		})
	}

	async findUserSelectedPassword(searchValue: {
		email?: string
		login?: string
		phoneNumber?: string
	}) {
		const user = await this.userModel
			.findOne({
				$or: [
					{ email: searchValue.email },
					{ login: searchValue.login },
					{ phoneNumber: searchValue.phoneNumber }
				]
			})
			.select('password')
			.exec()
		if (!user) throw new NotFoundException('Пользователь не найден')

		return user
	}

	async findUser(searchValue: {
		email?: string
		login?: string
		phoneNumber?: string
	}) {
		const user = await this.userModel
			.findOne({
				$or: [
					{ email: searchValue.email },
					{ login: searchValue.login },
					{ phoneNumber: searchValue.phoneNumber }
				]
			})
			.exec()
		if (!user) throw new NotFoundException('Пользователь не найден')

		return user
	}
}
