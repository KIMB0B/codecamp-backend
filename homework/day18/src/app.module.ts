import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './apis/category/category.module';
import { DetailModule } from './apis/detail/detail.module';
import { ImageModule } from './apis/image/image.module';
import { ProductModule } from './apis/product/product.module';
import { ProductStateModule } from './apis/productState/productState.module';
import { StateModule } from './apis/state/state.module';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'database',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'paikdabang',
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/common/graphql/schema.gql',
    }),
    CategoryModule,
    ProductModule,
    StateModule,
    ImageModule,
    DetailModule,
    ProductStateModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
