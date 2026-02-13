import { Controller, Get } from '@nestjs/common'
import { UsersService } from './users.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { GetUser } from './decorators/users.decorator'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Auth()
	@Get('get-profile')
	getProfile(@GetUser('id') userId: string) {
		return this.usersService.findById(userId)
	}
}
