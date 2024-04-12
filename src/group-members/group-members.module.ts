import { Module } from '@nestjs/common';
import { GroupMembersService } from './group-members.service';
import { GroupMembersController } from './group-members.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupMembers } from './entities/group-member.entity';
import { Groups } from 'src/groups/entities/group.entity';
import { MailModule } from 'src/mail/mail.module';
import { Users } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Groups, GroupMembers, Users]),
    MailModule,
    UsersModule,
  ],
  controllers: [GroupMembersController],
  providers: [GroupMembersService, JwtStrategy, GroupMembers],
  exports: [GroupMembersService],
})
export class GroupMembersModule {}
