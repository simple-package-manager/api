import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeDependencyPackageDependencyRelationship1702669052567 implements MigrationInterface {
    name = 'ChangeDependencyPackageDependencyRelationship1702669052567'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dependency" ADD CONSTRAINT "UQ_680cf463a8da7a9eea873cd28c6" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "package_dependency" DROP CONSTRAINT "FK_170f76122d19fc6070a1e0997fe"`);
        await queryRunner.query(`ALTER TABLE "package_dependency" DROP CONSTRAINT "REL_170f76122d19fc6070a1e0997f"`);
        await queryRunner.query(`ALTER TABLE "package_dependency" ADD CONSTRAINT "FK_170f76122d19fc6070a1e0997fe" FOREIGN KEY ("dependencyId") REFERENCES "dependency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "package_dependency" DROP CONSTRAINT "FK_170f76122d19fc6070a1e0997fe"`);
        await queryRunner.query(`ALTER TABLE "package_dependency" ADD CONSTRAINT "REL_170f76122d19fc6070a1e0997f" UNIQUE ("dependencyId")`);
        await queryRunner.query(`ALTER TABLE "package_dependency" ADD CONSTRAINT "FK_170f76122d19fc6070a1e0997fe" FOREIGN KEY ("dependencyId") REFERENCES "dependency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dependency" DROP CONSTRAINT "UQ_680cf463a8da7a9eea873cd28c6"`);
    }

}
