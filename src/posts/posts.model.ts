import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { User } from '../users/users.model'

export type PostDocument = HydratedDocument<Post>

@Schema({
	timestamps: true
})
export class Post {
	@Prop()
	title: string

	@Prop()
	description: string

	@Prop({ default: [] })
	medias: string[]

	@Prop({ default: 0 })
	likesCount: number

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
	user: string | mongoose.Types.ObjectId
}

export const PostSchema = SchemaFactory.createForClass(Post)
