import { Get, JsonController } from 'routing-controllers';
import { AppDataSource } from '../data-source';
import { Dependency } from '../entity/Dependency';

@JsonController()
export class DependencyController {
  @Get('/dependencyTree')
  getDependecyTree() {
    return AppDataSource.getTreeRepository(Dependency).findTrees();
  }
}

