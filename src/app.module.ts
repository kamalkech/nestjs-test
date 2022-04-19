import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { ResolversModule } from './resolvers/resolvers.module';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppLoggerService } from './app-logger/app-logger.service';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';
import { AbilityModule } from './ability/ability.module';
import { PermissionModule } from './permission/permission.module';

let envFilePath = '.env';
if (process.env.NODE_ENV === 'dev') {
  envFilePath = '.env.dev';
}

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          connectionFactory: (connection) => {
            connection.plugin(require('mongoose-autopopulate'));
            return connection;
          },
          uri: configService.get<string>('MONGODB_URI'),
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      debug: true,
      playground: true,
    }),
    AuthModule,
    CatsModule,
    HttpModule,
    UserModule,
    DatabaseModule,
    ResolversModule,
    CaslModule,
    AbilityModule,
    PermissionModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppLoggerService],
})
export class AppModule {}
