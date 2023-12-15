import { Get, JsonController, Param } from 'routing-controllers';
import { AppDataSource } from '@/data-source';
import { Dependency } from '@/entity/Dependency';

@JsonController()
export class DependencyController {
  @Get('/dependencyTree')
  getTree() {
    return AppDataSource.getTreeRepository(Dependency).findTrees();
  }

  @Get('/dependencyTree/:id')
  async getOneTree(@Param('id') id: number) {
    const parent = await AppDataSource.getRepository(Dependency).findOneBy({ id });
    return AppDataSource.getTreeRepository(Dependency).findDescendantsTree(parent);
  }
}

