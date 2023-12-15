import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeUserPackageRelationship1702667246008 implements MigrationInterface {
    name = 'ChangeUserPackageRelationship1702667246008'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "package" DROP CONSTRAINT "FK_6dc356455ff7dc7ac56ec2058bc"`);
        await queryRunner.query(`ALTER TABLE "package" ADD CONSTRAINT "UQ_b23e12326a4218d09bd72301aa1" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "package" DROP CONSTRAINT "REL_6dc356455ff7dc7ac56ec2058b"`);
        await queryRunner.query(`ALTER TABLE "package" ADD CONSTRAINT "FK_6dc356455ff7dc7ac56ec2058bc" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "package" DROP CONSTRAINT "FK_6dc356455ff7dc7ac56ec2058bc"`);
        await queryRunner.query(`ALTER TABLE "package" ADD CONSTRAINT "REL_6dc356455ff7dc7ac56ec2058b" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "package" DROP CONSTRAINT "UQ_b23e12326a4218d09bd72301aa1"`);
        await queryRunner.query(`ALTER TABLE "package" ADD CONSTRAINT "FK_6dc356455ff7dc7ac56ec2058bc" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80"`);
    }

}
