import { Injectable, NotFoundException } from '@nestjs/common'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Post } from './posts.model'
import { type MongoType } from 'src/utils/types/mongo-type'
import { User } from '../users/users.model'

@Injectable()
export class PostsService {
	constructor(
		@InjectModel(Post.name) private readonly postModel: Model<Post>,
		@InjectModel(User.name) private readonly userModel: Model<User>
	) {}

	async create(dto: CreatePostDto, userId: MongoType) {
		const post = await this.postModel.create({
			...dto,
			user: userId
		})

		const user = await this.userModel.findById(userId)
		if (!user) throw new NotFoundException('Пользователь не найден.')

		user.posts.push(post._id as any)
		await user.save()

		return post
	}

	async findAll() {
		return await this.postModel.find().populate('user').exec()
	}

	async findOne(id: string) {
		return `This action returns a #${id} post`
	}

	async update(id: string, dto: UpdatePostDto) {
		return `This action updates a #${id} post`
	}

	async remove(id: string) {
		return `This action removes a #${id} post`
	}
}
