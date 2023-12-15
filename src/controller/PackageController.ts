import { Body, BodyParam, Delete, Get, JsonController, OnUndefined, Param, Post } from 'routing-controllers';
import { AppDataSource } from '@/data-source';
import { Package } from '@/entity/Package';
import { User } from '@/entity/User';
import { PackageDependency } from '@/entity/PackageDependency';
import { Dependency } from '@/entity/Dependency';
import { EntityManager } from 'typeorm';

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
  async save(@Body() pckg: Package, @BodyParam('userId') userId?: number, @BodyParam('dependencyIds') dependencyIds?: number[]) {
    pckg.user = await AppDataSource.getRepository(User).findOneBy({ id: userId ?? 0 });
    
    // @TODO: Associate dependencies when creating a package
    // AppDataSource.transaction(async (entityManager: EntityManager) => {
    //   for (const dependencyId of dependencyIds) {
    //     const packageDep = new PackageDependency();
    //     packageDep.package = pckg;
    //     packageDep.dependency = await AppDataSource.getRepository(Dependency).findOneBy({ id: dependencyId });
    //     entityManager.save(packageDep);
    //   }
    // });

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

