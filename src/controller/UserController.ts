import { Body, Delete, Get, JsonController, Post } from 'routing-controllers';
import { AppDataSource } from '@/data-source';
import { User } from '@/entity/User';

@JsonController()
export class UserController {
  @Post('/user')
  async save(@Body() user: User) {
    return AppDataSource.manager.save(user);
  }
}

