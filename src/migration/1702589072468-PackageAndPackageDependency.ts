import {MigrationInterface, QueryRunner} from "typeorm";

export class PackageAndPackageDependency1702589072468 implements MigrationInterface {
    name = 'PackageAndPackageDependency1702589072468'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "package_dependency" ("id" SERIAL NOT NULL, "packageId" integer, "dependencyId" integer, CONSTRAINT "REL_170f76122d19fc6070a1e0997f" UNIQUE ("dependencyId"), CONSTRAINT "PK_8a3b7e9476d305657712c94393a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "package" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "REL_6dc356455ff7dc7ac56ec2058b" UNIQUE ("userId"), CONSTRAINT "PK_308364c66df656295bc4ec467c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "package_dependency" ADD CONSTRAINT "FK_9155351b3c142f62966c42e18e4" FOREIGN KEY ("packageId") REFERENCES "package"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "package_dependency" ADD CONSTRAINT "FK_170f76122d19fc6070a1e0997fe" FOREIGN KEY ("dependencyId") REFERENCES "dependency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "package" ADD CONSTRAINT "FK_6dc356455ff7dc7ac56ec2058bc" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "package" DROP CONSTRAINT "FK_6dc356455ff7dc7ac56ec2058bc"`);
        await queryRunner.query(`ALTER TABLE "package_dependency" DROP CONSTRAINT "FK_170f76122d19fc6070a1e0997fe"`);
        await queryRunner.query(`ALTER TABLE "package_dependency" DROP CONSTRAINT "FK_9155351b3c142f62966c42e18e4"`);
        await queryRunner.query(`DROP TABLE "package"`);
        await queryRunner.query(`DROP TABLE "package_dependency"`);
    }

}
