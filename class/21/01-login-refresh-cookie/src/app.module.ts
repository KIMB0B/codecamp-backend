import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './apis/boards/boards.module';
import { ProductModule } from './apis/products/products.module';
import { ProductCategoryModule } from './apis/productsCategory/productCategory.module';
import { UserModule } from './apis/users/user.module';
import { AuthModule } from './apis/auth/auth.module';

@Module({
  imports: [
    BoardModule,
    ProductModule,
    ProductCategoryModule,
    UserModule,
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'codecamp_class',
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
  ],
})
export class AppModule {}
