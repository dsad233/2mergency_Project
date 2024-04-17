import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupMembers } from './entities/group-member.entity';
import { Repository } from 'typeorm';
import { Groups } from 'src/groups/entities/group.entity';
import { UsersService } from 'src/users/users.service';
import { Users } from 'src/users/entities/user.entity';

@Injectable()
export class GroupMembersService {
  constructor(
    @InjectRepository(GroupMembers)
    private groupMemberRepository: Repository<GroupMembers>,
    @InjectRepository(Groups) private groupRepository: Repository<Groups>,
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    private usersService: UsersService,
  ) {}

  async checkGroupExists(groupId: number): Promise<boolean> {
    const group = await this.groupRepository.findOne({
      where: { groupId },
    });
    return !!group; // 불리언(Boolean) 타입을 강제로 반환
    // group이 null 또는 undefined라면, 이는 데이터베이스에서 해당 groupId를 가진 그룹을 찾지 못했다는 것을 의미함
    // !!group은 group 객체가 존재할 때 true를, 존재하지 않을 때는 false를 반환
  }

  async checkUserExists(userId: number): Promise<boolean> {
    const user = await this.usersRepository.findOne({
      where: { userId },
    });
    return !!user;
  }

  /**
   * 그룹에 멤버 초대
   */

  async inviteUserToGroup(
    groupId: number,
    userId: number,
    email: string,
  ): Promise<any> {
    // 그룹 존재 여부 확인

    const group = await this.groupRepository.findOne({
      where: { groupId },
    });
    if (!group) {
      throw new NotFoundException(`그룹이 존재하지 않습니다.`);
    }

    // '사용자'가 있는지 확인하기
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }

    // 사용자가 이미 그룹 멤버인지 여부 확인
    const member = await this.groupMemberRepository.findOne({
      where: {
        users: { userId },
        groups: { groupId },
      },
    });

    if (member) {
      throw new BadRequestException('유저는 이미 그룹에 초대되었습니다.');
    }
    // 고유한 닉네임 생성 -> 사용자 ID와 현재 시간을 결합
    // const uniqueNickname = `user_${user}_${Date.now()}`;

    // 사용자를 바로 그룹 멤버로 추가X => 그냥 초대 상태만 설정
    const memberInvite = this.groupMemberRepository.create({
      users: { userId },
      groups: { groupId },
      // nickname: uniqueNickname, // 고유한 닉네임 사용
      isInvited: true,
      isVailed: false, // 초대 수락 여부는 false로 초기 설정
    });
    await this.groupMemberRepository.save(memberInvite);

    return {
      success: true,
      message: `${user.userId}유저에게 초대가 발송되었습니다.`,
    };
  }

  /**
   * 유저가 그룹 초대 수락
   */
  async acceptInvitation(
    groupId: number,
    userId: number,
    email: string,
  ): Promise<any> {
    // 그룹 존재 여부 확인
    if (!(await this.checkGroupExists(groupId))) {
      throw new NotFoundException(`그룹이 존재하지 않습니다.`);
    }

    // 사용자가 있는지 이메일로 확인
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }

    // 사용자의 초대 상태 확인
    const member = await this.groupMemberRepository.findOne({
      where: {
        users: { userId },
        groups: { groupId },
        isInvited: true, // 초대가 발송된 상태인지 확인
      },
    });

    if (!member) {
      throw new NotFoundException('해당 유저는 초대받지 않았습니다.');
    }

    // 초대 수락 처리
    member.isVailed = true; // 초대 수락 여부를 true로 설정
    await this.groupMemberRepository.save(member);

    return {
      success: true,
      message: `${user.userId}님이 초대를 수락했습니다.`,
    };
  }

  // 그룹 멤버 존재 확인, 반환
  async isGroupMember(groupId: number, userId: number): Promise<boolean> {
    console.log(
      `Checking membership for groupId: ${groupId}, userId: ${userId}`,
    );
    const member = await this.groupMemberRepository.findOne({
      where: { groups: { groupId }, users: { userId } },
    });
    return !!member;
    // !!member: 논리 NOT 연산자(!)를 두 번 사용하여,
    //   // member 변수의 "진리성(truthiness)"을 boolean 값으로 강제 변환
    //   // member가 존재하면 (null 또는 undefined가 아니면),
    //   // true를 반환하고, 그렇지 않으면 false를 반환
  }

  /**
   * 특정 사용자의 그룹 멤버 정보 조회
   */
  async findByUserAndGroup(userId: number, groupId: number) {
    const user = await this.groupMemberRepository.findOne({
      where: {
        users: { userId: userId },
        groups: { groupId: groupId },
      },
    });
    console.log('특정 그룹 멤바', user);
    return user;
  }

  // 해당 그룹의 멤버 전체 조회
  async getAllGroupMembers(
    groupId: number,
    // userId: number,
  ): Promise<GroupMembers[]> {
    const members = await this.groupMemberRepository.find({
      where: { groups: { groupId } },
      relations: ['users'],
    });
    if (!members.length) {
      throw new NotFoundException(
        `그룹 ID ${groupId}에 해당하는 멤버가 없습니다.`,
      );
    }

    return members;
  }
}
