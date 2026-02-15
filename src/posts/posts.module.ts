import { Module } from '@nestjs/common'
import { PostsService } from './posts.service'
import { PostsController } from './posts.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Post, PostSchema } from './posts.model'
import { UsersModule } from '../users/users.module'
import { User, UserSchema } from '../users/users.model'

@Module({
	controllers: [PostsController],
	providers: [PostsService],
	imports: [
		UsersModule,
		MongooseModule.forFeature([
			{ name: Post.name, schema: PostSchema },
			{ name: User.name, schema: UserSchema }
		])
	]
})
export class PostsModule {}
