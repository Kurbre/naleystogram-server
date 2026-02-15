import { Test, TestingModule } from '@nestjs/testing'
import { PostsController } from './posts.controller'
import { PostsService } from './posts.service'
import { getModelToken } from '@nestjs/mongoose'
import { Post } from './posts.model'
import { User } from '../users/users.model'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'

const post = {
	title: 'Тестовый пост',
	description: 'Lorem ipsum',
	medias: [],
	likesCount: 0,
	user: '698e1eb04bd2b8b083038018',
	_id: '69922abb46dc1fb696b0dc37',
	createdAt: '2026-02-15T20:21:15.438Z',
	updatedAt: '2026-02-15T20:21:15.438Z',
	__v: 0
}

describe('PostsController', () => {
	let controller: PostsController
	let service: PostsService

	beforeEach(async () => {
		const mockPostModel = {
			create: jest.fn().mockResolvedValue(post)
		}

		const mockUserModel = {
			findById: jest.fn().mockResolvedValue({
				posts: [],
				save: jest.fn().mockResolvedValue({})
			})
		}

		const module: TestingModule = await Test.createTestingModule({
			controllers: [PostsController],
			providers: [
				PostsService,
				{
					provide: getModelToken(Post.name),
					useValue: mockPostModel
				},
				{
					provide: getModelToken(User.name),
					useValue: mockUserModel
				},
				{
					provide: JwtService,
					useValue: {
						signAsync: jest.fn().mockResolvedValue('mock-token')
					}
				},
				{
					provide: UsersService,
					useValue: {
						findById: jest.fn()
					}
				}
			]
		}).compile()

		controller = module.get<PostsController>(PostsController)
		service = module.get<PostsService>(PostsService)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})

	it('shoukd be successfuly created post', async () => {
		const dto = {
			title: post.title,
			description: post.description
		}
		const res = await service.create(dto, post.user)

		return expect(res).toEqual(post)
	})
})
