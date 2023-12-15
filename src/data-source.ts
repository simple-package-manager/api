import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'user',
  password: 'password',
  database: 'user',
  synchronize: false,
  logging: false,
  entities: [
    process.env.USE_BUILD_ENTITIES_PATH === 'true'
      ? 'build/entity/**/*.{js,ts}'
      : 'entity/**/*.{js,ts}'
  ],
  subscribers: ['build/subscriber/**/*.{js,ts}'],
  migrations: ['build/migration/**/*.{js,ts}'],
  migrationsRun: true,
});

