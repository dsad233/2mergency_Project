import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduleMembers } from './entities/schedule-member.entity'; // 가정: ScheduleMembers 엔티티 경로
import { Repository } from 'typeorm';
import { Groups } from 'src/groups/entities/group.entity';
import { Schedules } from 'src/schedules/entities/schedule.entity';
import { GroupMembersService } from 'src/group-members/group-members.service';

@Injectable()
export class ScheduleMembersService {
  constructor(
    @InjectRepository(ScheduleMembers)
    private scheduleMembersRepository: Repository<ScheduleMembers>,
    private groupMembersService: GroupMembersService,
    @InjectRepository(Groups)
    private groupsRepository: Repository<Groups>,
    @InjectRepository(Schedules)
    private schedulesRepository: Repository<Schedules>,
  ) {}

  /**
   * 스케줄에 멤버 등록
   */

  async registerScheduleMember(
    groupId: number,
    scheduleId: number,
    userId: number,
    email: string,
    nickname: string,
  ) {
    // 그룹이 있는지 먼저 확인하기
    const isGroup = await this.groupsRepository.findOne({ where: { groupId } });
    if (!isGroup) {
      throw new NotFoundException(`해당하는 그룹이 존재하지 않습니다.`);
    }

    // 그룹 멤버인지 확인!
    const isGroupMember = await this.groupMembersService.isGroupMember(
      groupId,
      userId,
    );

    if (!isGroupMember) {
      throw new BadRequestException(
        `이 그룹${groupId}의 멤버${userId}가 아닙니다.`,
      );
    }

    // 스케줄이 있는지 확인하기
    const isSchedule = await this.schedulesRepository.findOne({
      where: { scheduleId, groupId },
    });
    if (!isSchedule) {
      throw new NotFoundException(
        `그룹${groupId}에서 해당 스케줄${scheduleId}은 존재하지 않습니다.`,
      );
    }

    // 고유 닉네임 생성
    // const uniqueNickname = `user_${userId}_${Date.now()}`;

    // 스케줄 멤버를 생성하고 저장
    const newScheduleMember = await this.scheduleMembersRepository.save({
      groupId,
      scheduleId,
      userId,
      email,
      nickname, // 닉네임 설정
    });

    console.log('스멤 등록', newScheduleMember);

    // 성공적으로 저장된다면 -> 성공 메세지 반환
    return {
      success: true,
      message: `그룹 ${groupId}의 스케줄${scheduleId}에 멤버${userId} 등록이 완료되었습니다.`,
      data: newScheduleMember.schedules,
    };
  }

  /**
   * 스케줄에 등록된 멤버 전체 조회
   **/
  async findAllScheduleMembers(groupId: number, scheduleId: number) {
    // 스케줄 멤버 조회
    const schedule = await this.schedulesRepository.find({
      where: { scheduleId, groupId },
      relations: ['scheduleMembers', 'scheduleMembers.users'], // 필요하다면 사용자 정보도 같이 로드
    });

    console.log('뿡빵뿡', schedule);

    if (!schedule) {
      throw new NotFoundException(
        `해당 그룹 ${groupId}에서 스케줄 ${scheduleId}는 존재하지 않습니다.`,
      );
    }
    return schedule;
  }

  /**
   * 스케줄에 등록된 멤버 상세 조회
   **/
  async findOneScheduleMembers(
    groupId: number,
    scheduleId: number,
    userId: number,
  ): Promise<ScheduleMembers | undefined> {
    // findOneScheduleMembers 함수가 ScheduleMembers 타입의 객체 또는 undefined를 반환함
    // '|' 기호 => 유니온 타입은 변수나 함수가 여러 타입 중 하나의 값을 가질 수 있음을 뜻함<
    // 즉, ScheduleMembers 타입의 객체를 반환 or 해당하는 데이터가 없어 undefined를 반환할 수 있음!

    // 스케줄이 해당 그룹에 속하는지 확인
    const schedule = await this.schedulesRepository.findOne({
      where: {
        scheduleId,
        groupId,
      },
    });
    // 스케줄 없으면 오류 반환
    if (!schedule) {
      throw new NotFoundException('그룹에 해당 스케줄이 없습니다.');
    }
    // 스케줄이 있으면 => 등록된 멤버를 userId로 조회
    return await this.scheduleMembersRepository.findOne({
      where: { scheduleId, userId },
    });
  }

  async deleteScheduleMembers(
    groupId: number,
    scheduleId: number,
    userId: number,
  ): Promise<void> {
    // 해당 스케줄이 -> 그룹에 속해있는지 확인
    const schedule = await this.schedulesRepository.findOne({
      where: { scheduleId, groupId },
    });

    if (!schedule) {
      throw new NotFoundException('그룹에 해당하는 스케줄이 없습니다.');
    }
    // 해당 스케줄에 등록된 멤버가 있는지 확인
    const member = await this.scheduleMembersRepository.findOne({
      where: { scheduleId, userId },
    });
    const findMember = member.userId;

    console.log(findMember);
    if (!findMember) {
      throw new NotFoundException('해당 멤버를 찾을 수 없습니다.');
    }
    // 멤버 삭제하기
    await this.scheduleMembersRepository.delete(findMember);
  }
}
