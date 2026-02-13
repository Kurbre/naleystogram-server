import { Request, Response } from 'express'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { Test, TestingModule } from '@nestjs/testing'
import { v4 as uuidv4 } from 'uuid'
import { NotFoundException, UnauthorizedException } from '@nestjs/common'
import { User } from 'src/users/users.model'

const user = {
	_id: uuidv4(),
	login: 'dfgdfgdfggdf',
	email: 'gdfdfg@gmail.com',
	phoneNumber: '+380951267890',
	createdAt: '2026-02-12T18:40:48.402Z',
	updatedAt: '2026-02-12T18:40:48.402Z',
	__v: 0
}

describe('AuthController', () => {
	let controller: AuthController
	let service: AuthService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [
				{
					provide: AuthService,
					useValue: {
						login: jest.fn().mockResolvedValue(user),
						register: jest.fn().mockResolvedValue(user),
						logout: jest
							.fn()
							.mockResolvedValue({ message: 'Вы вышли из аккаунта.' })
					}
				}
			]
		}).compile()

		controller = module.get<AuthController>(AuthController)
		service = module.get<AuthService>(AuthService)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})

	it('should login user', async () => {
		const dto = { email: user.email, password: '123123' }

		const req = { session: {} } as Request

		const result = await controller.login(dto, req)

		expect(service.login).toHaveBeenCalledWith(dto, req)
		expect(result).toEqual(user)
	})
})
