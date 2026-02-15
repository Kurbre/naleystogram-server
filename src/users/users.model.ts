import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { Post } from 'src/posts/posts.model'

export type UserDocument = HydratedDocument<User>

@Schema({
	timestamps: true
})
export class User {
	@Prop({ unique: true })
	login: string

	@Prop({ unique: true })
	email: string

	@Prop({ unique: true })
	phoneNumber: string

	@Prop({ select: false })
	password: string

	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
	posts: Post[]
}

export const UserSchema = SchemaFactory.createForClass(User)
