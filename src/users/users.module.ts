import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './users.model'
import { Post, PostSchema } from '../posts/posts.model'

@Module({
	controllers: [UsersController],
	providers: [UsersService],
	imports: [
		MongooseModule.forFeature([
			{ name: User.name, schema: UserSchema },
			{ name: Post.name, schema: PostSchema }
		])
	],
	exports: [UsersService]
})
export class UsersModule {}
