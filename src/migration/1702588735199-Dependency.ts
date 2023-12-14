import {MigrationInterface, QueryRunner} from "typeorm";

export class Dependency1702588735199 implements MigrationInterface {
    name = 'Dependency1702588735199'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dependency" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "osTypesSupported" text NOT NULL, "parentId" integer, CONSTRAINT "PK_d90752dc40dbb4eb7c3bbf53542" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dependency_closure" ("id_ancestor" integer NOT NULL, "id_descendant" integer NOT NULL, CONSTRAINT "PK_8751308ddafe236dfa13ae0065b" PRIMARY KEY ("id_ancestor", "id_descendant"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fc0b897a421933b94c80f39508" ON "dependency_closure" ("id_ancestor") `);
        await queryRunner.query(`CREATE INDEX "IDX_36ed1a821ca6d973da383ce03e" ON "dependency_closure" ("id_descendant") `);
        await queryRunner.query(`ALTER TABLE "dependency" ADD CONSTRAINT "FK_3e8212d176c5106f9f0380b358d" FOREIGN KEY ("parentId") REFERENCES "dependency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dependency_closure" ADD CONSTRAINT "FK_fc0b897a421933b94c80f395085" FOREIGN KEY ("id_ancestor") REFERENCES "dependency"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dependency_closure" ADD CONSTRAINT "FK_36ed1a821ca6d973da383ce03ec" FOREIGN KEY ("id_descendant") REFERENCES "dependency"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dependency_closure" DROP CONSTRAINT "FK_36ed1a821ca6d973da383ce03ec"`);
        await queryRunner.query(`ALTER TABLE "dependency_closure" DROP CONSTRAINT "FK_fc0b897a421933b94c80f395085"`);
        await queryRunner.query(`ALTER TABLE "dependency" DROP CONSTRAINT "FK_3e8212d176c5106f9f0380b358d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_36ed1a821ca6d973da383ce03e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fc0b897a421933b94c80f39508"`);
        await queryRunner.query(`DROP TABLE "dependency_closure"`);
        await queryRunner.query(`DROP TABLE "dependency"`);
    }

}
