import { Body, BodyParam, Delete, Get, JsonController, OnUndefined, Param, Post } from 'routing-controllers';
import { AppDataSource } from '@/data-source';
import { Dependency } from '@/entity/Dependency';

@JsonController()
export class DependencyController {
  @Get('/dependencyTree')
  async getTree() {
    return AppDataSource.getTreeRepository(Dependency).findTrees();
  }

  @Get('/dependencyTree/:id')
  @OnUndefined(204)
  async getOneTree(@Param('id') id: number) {
    const parent = await AppDataSource.getRepository(Dependency).findOneBy({ id });
    if (!parent) return;
    return AppDataSource.getTreeRepository(Dependency).findDescendantsTree(parent);
  }

  @Post('/dependency')
  async save(@Body() dependency: Dependency, @BodyParam('parentId') parentId?: number) {
    dependency.dependent = await AppDataSource.getRepository(Dependency).findOneBy({ id: parentId ?? 0 });
    return AppDataSource.manager.save(dependency);
  }

  @Delete('/dependency/:id')
  @OnUndefined(204)
  async remove(@Param('id') id: number) {
    const dep = await AppDataSource.getRepository(Dependency).findOneBy({ id });
    if (!dep) return;
    return AppDataSource.manager.remove(dep);
  }
}

