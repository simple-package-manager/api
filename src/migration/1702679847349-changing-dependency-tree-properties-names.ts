import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangingDependencyTreePropertiesNames1702679847349 implements MigrationInterface {
    name = 'ChangingDependencyTreePropertiesNames1702679847349'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dependency" DROP CONSTRAINT "FK_3e8212d176c5106f9f0380b358d"`);
        await queryRunner.query(`ALTER TABLE "dependency" RENAME COLUMN "parentId" TO "dependentId"`);
        await queryRunner.query(`ALTER TABLE "dependency" ADD CONSTRAINT "FK_e8c19c01525e4af0eaf51424187" FOREIGN KEY ("dependentId") REFERENCES "dependency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dependency" DROP CONSTRAINT "FK_e8c19c01525e4af0eaf51424187"`);
        await queryRunner.query(`ALTER TABLE "dependency" RENAME COLUMN "dependentId" TO "parentId"`);
        await queryRunner.query(`ALTER TABLE "dependency" ADD CONSTRAINT "FK_3e8212d176c5106f9f0380b358d" FOREIGN KEY ("parentId") REFERENCES "dependency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
