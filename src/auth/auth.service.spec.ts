import { UsersService } from '../users/users.service'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { v4 as uuidv4 } from 'uuid'
import { Test, TestingModule } from '@nestjs/testing'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

const user = {
	_id: uuidv4(),
	login: 'dfgdfgdfggdf',
	email: 'gdfdfg@gmail.com',
	phoneNumber: '+380951267890',
	createdAt: '2026-02-12T18:40:48.402Z',
	updatedAt: '2026-02-12T18:40:48.402Z',
	__v: 0
}

const dto: LoginDto = {
	login: user.email,
	password: 'test123'
}

describe('Auth service', () => {
	let service: AuthService
	let usersService: UsersService
	let jwtService: JwtService
	let configService: ConfigService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{
					provide: UsersService,
					useValue: {
						create: jest.fn().mockResolvedValue(user),
						findUserSelectedPassword: jest.fn().mockResolvedValue(user),
						findUser: jest.fn().mockResolvedValue(user),
						findById: jest.fn().mockResolvedValue(user),
						findByIdNoValidation: jest.fn().mockResolvedValue(user)
					}
				},
				{
					provide: JwtService,
					useValue: {
						signAsync: jest.fn().mockResolvedValue('mock-token')
					}
				},
				{
					provide: ConfigService,
					useValue: {
						getOrThrow: jest.fn().mockResolvedValue(''),
						get: jest.fn().mockResolvedValue('')
					}
				}
			]
		}).compile()

		service = module.get<AuthService>(AuthService)
		usersService = module.get<UsersService>(UsersService)
		jwtService = module.get<JwtService>(JwtService)
		configService = module.get<ConfigService>(ConfigService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	it('should generated jwt token', async () => {
		const token = await jwtService.signAsync(user._id)
		expect(token).toEqual('mock-token')
	})

	it('should generated jwt token', async () => {
		const token = await jwtService.signAsync(user._id)
		expect(token).toEqual('mock-token')
	})
})
