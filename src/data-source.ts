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
  entities: ['entity/**/*.{js,ts}'],
  subscribers: ['build/subscriber/**/*.{js,ts}'],
  migrations: ['build/migration/**/*.{js,ts}'],
})