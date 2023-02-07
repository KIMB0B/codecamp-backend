import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Starbucks } from './apis/starbucks/entities/starbucks.entity';
import { StarbucksModule } from './apis/starbucks/starbucks.module';

@Module({
  imports: [
    StarbucksModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/common/graphql/schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '4530',
      database: 'homework',
      entities: [Starbucks],
      synchronize: true,
      logging: true,
    }),
  ],
})
export class AppModule {}
