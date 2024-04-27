import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AwsModule } from 'src/aws/aws.module';
import { RoleStrategy } from 'src/auth/strategy/roles.strategy';
import { ENV_JWT_SECRET_KEY } from 'src/const/env.keys';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { Groups } from 'src/groups/entities/group.entity';

@Module({
  imports: [
    PassportModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>(ENV_JWT_SECRET_KEY),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Users, Groups]),
    AwsModule,
  ],
  providers: [JwtStrategy, UsersService, RoleStrategy],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
