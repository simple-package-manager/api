import { Body, BodyParam, Delete, Get, JsonController, OnUndefined, Param, Post } from 'routing-controllers';
import { AppDataSource } from '@/data-source';
import { Package } from '@/entity/Package';
import { User } from '@/entity/User';

@JsonController()
export class PackageController {
  @Get('/package')
  get() {
    return AppDataSource.getRepository(Package).find({
        relations: {
            user: true,
            directDependencies: true,
        }
    });
  }

  @Get('/package/:id')
  async getOne(@Param('id') id: number) {
    return await AppDataSource.getRepository(Package).findOne({
        relations: {
            user: true,
            directDependencies: true,
        },
        where: { id },
    });
  }

  @Post('/package')
  async save(@Body() pckg: Package, @BodyParam('userId') userId?: number) {
    pckg.user = await AppDataSource.getRepository(User).findOneBy({ id: userId ?? 0 });
    return AppDataSource.manager.save(pckg);
  }

  @Delete('/package/:id')
  @OnUndefined(204)
  async remove(@Param('id') id: number) {
    const pckg = await AppDataSource.getRepository(Package).findOneBy({ id });
    if (!pckg) return;
    return AppDataSource.manager.remove(pckg);
  }
}

