import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  database: 'location_db',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'sa123456',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};
