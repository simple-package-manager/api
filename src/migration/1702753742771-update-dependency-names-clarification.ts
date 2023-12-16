import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDependencyNamesClarification1702753742771 implements MigrationInterface {
    name = 'UpdateDependencyNamesClarification1702753742771'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dependency" DROP CONSTRAINT "FK_e8c19c01525e4af0eaf51424187"`);
        await queryRunner.query(`ALTER TABLE "dependency" RENAME COLUMN "dependentId" TO "dependentOfId"`);
        await queryRunner.query(`ALTER TABLE "dependency" ADD CONSTRAINT "FK_74aea25a93d1c25c84241e5d0f2" FOREIGN KEY ("dependentOfId") REFERENCES "dependency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dependency" DROP CONSTRAINT "FK_74aea25a93d1c25c84241e5d0f2"`);
        await queryRunner.query(`ALTER TABLE "dependency" RENAME COLUMN "dependentOfId" TO "dependentId"`);
        await queryRunner.query(`ALTER TABLE "dependency" ADD CONSTRAINT "FK_e8c19c01525e4af0eaf51424187" FOREIGN KEY ("dependentId") REFERENCES "dependency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
