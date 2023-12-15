import { Body, Get, JsonController, Param, Post } from 'routing-controllers';
import { AppDataSource } from '@/data-source';
import { User } from '@/entity/User';

@JsonController()
export class UserController {
  @Get('/user')
  get() {
    return AppDataSource.getTreeRepository(User).find({
      relations: {
        packages: true,
      },
    });
  }

  @Get('/user/:id')
  getOne(@Param('id') id: number) {
    return AppDataSource.getTreeRepository(User).findOne({
      relations: {
        packages: true,
      },
      where: { id }
    });
  }

  @Post('/user')
  async save(@Body() user: User) {
    return AppDataSource.manager.save(user);
  }
}

