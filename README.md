# 오늘도 의자에 앉아있는 그대를 위한 🏃‍♂️🏃‍♀️ 2MERGENCY PROJECT 🔥

<p align="center">
  <img src="./img/main.png"> 
</p>


## 프로젝트 소개
커뮤니티를 이용하여 산책과 러닝, 등산을 서로 독려하며 즐겁고 건강한 생활을 할 수 있도록 돕는 목표를 가지고 이 프로젝트를 진행하였습니다.

<br/>

[ 🔥&nbsp;&nbsp;노션 ](https://www.notion.so/teamsparta/2mergency-b98d6285b838434e8382265364e0e9ec?pvs=4 "2MERGENCY PROJECT")


[ 🔥&nbsp;&nbsp;ERD ](https://drawsql.app/teams/heh-2/diagrams/youngjun "2MERGENCY PROJECT")

[ 🔥&nbsp;&nbsp;API 명세서 ](https://www.notion.so/teamsparta/55442151682547d98b339a163311924d?v=15763b8a654b4e19b4182769035d0e75&pvs=4 "2MERGENCY PROJECT")

[ 🔥&nbsp;&nbsp;Wireframe/ 플로우 차트 ](https://miro.com/app/board/uXjVKbS5It8=/ "2MERGENCY PROJECT")

<br/>

# 🗓 개발 기간

> __전체 개발 기간__ :  2024.03.26 ~ 2024.05.01
> 
> 🔧 &nbsp; 중간 발표 : 2024.04.16
> 
> 🔧 &nbsp; 최종 발표 : 2024.05.02

+ 기획, ERD, Wireframe, 플로우 차트 작성 : __03.26 ~ 03.30__

+ 기능 구현 :  __03.30 ~ 04.29__

+ 프론트 연결 작업 : __04.22 ~ 04.29__

+ 최종 점검 : __04.29 ~ 05.01__
  
<br/>
<br/>


</center>


# 🌐 개발 환경
<p align="center">
  <img src="./img/stack.png"> 
</p>

<br/>

# 🔩 기술 스택

<div align=center> 

<br/>
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E">
<img src="https://img.shields.io/badge/handlebars-000000?style=for-the-badge&logo=handlebars&logoColor=white">
<img src="https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white">
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<br/>

<img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=PostgreSQL&logoColor=white">
<img src="https://img.shields.io/badge/Amazon RDS-527FFF?style=for-the-badge&logo=Amazon RDS&logoColor=white">
<img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=for-the-badge&logo=Amazon EC2&logoColor=white">
<img src="https://img.shields.io/badge/Amazon 
Routes 53-8C4FFF?style=for-the-badge&logo=Routes 53&logoColor=white">
<img src="https://img.shields.io/badge/Amazon S3-569A31?style=for-the-badge&logo=Amazon S3&logoColor=white">
<br/>

<img src="https://img.shields.io/badge/GitHub Actions-2088FF?style=for-the-badge&logo=GitHub Actions&logoColor=white">
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">


<br>
</div>

<br/>

# 🔗 Directory Structure: 폴더 구조
<br/>

```bash

├─ .dockerignore
├─ .eslintrc.js
├─ .prettierrc
├─ docker-compose.yml
├─ Dockerfile
├─ nest-cli.json
├─ package-lock.json
├─ package.json
├─ run.sh
├─ src
│  ├─ app.controller.spec.ts
│  ├─ app.controller.ts
│  ├─ app.module.ts
│  ├─ app.service.ts
│  ├─ auth
│  │  ├─ auth.controller.spec.ts
│  │  ├─ auth.controller.ts
│  │  ├─ auth.module.ts
│  │  ├─ auth.service.spec.ts
│  │  ├─ auth.service.ts
│  │  ├─ decorator
│  │  │  └─ userInfo.decorator.ts
│  │  ├─ dto
│  │  │  ├─ login.dto.ts
│  │  │  └─ signup.dto.ts
│  │  ├─ entities
│  │  │  └─ invite.entity.ts
│  │  ├─ guard
│  │  │  ├─ jwt.guard.ts
│  │  │  └─ roles.guard.ts
│  │  └─ strategy
│  │     ├─ jwt.strategy.ts
│  │     └─ roles.strategy.ts
│  ├─ aws
│  │  ├─ aws.module.ts
│  │  ├─ aws.service.spec.ts
│  │  └─ aws.service.ts
│  ├─ const
│  │  └─ env.keys.ts
│  ├─ group-members
│  │  ├─ decorator
│  │  │  └─ memberRoles.decorator.ts
│  │  ├─ dto
│  │  │  ├─ create-group-member.dto.ts
│  │  │  ├─ invite-member.dto.ts
│  │  │  └─ update-group-member.dto copy.ts
│  │  ├─ entities
│  │  │  └─ group-member.entity.ts
│  │  ├─ group-members.controller.spec.ts
│  │  ├─ group-members.controller.ts
│  │  ├─ group-members.module.ts
│  │  ├─ group-members.service.spec.ts
│  │  ├─ group-members.service.ts
│  │  ├─ guard
│  │  │  └─ members.guard.ts
│  │  ├─ strategies
│  │  │  └─ members.strategy.ts
│  │  └─ types
│  │     └─ groupMemberRole.type.ts
│  ├─ groups
│  │  ├─ dto
│  │  │  ├─ create-group.dto.ts
│  │  │  └─ update-group.dto.ts
│  │  ├─ entities
│  │  │  └─ group.entity.ts
│  │  ├─ groups.controller.spec.ts
│  │  ├─ groups.controller.ts
│  │  ├─ groups.module.ts
│  │  ├─ groups.service.spec.ts
│  │  └─ groups.service.ts
│  ├─ mail
│  │  ├─ interface
│  │  │  └─ SendOption.ts
│  │  ├─ mail.module.ts
│  │  ├─ mail.service.spec.ts
│  │  └─ mail.service.ts
│  ├─ main.ts
│  ├─ records
│  │  ├─ dto
│  │  │  └─ create_record.dto.ts
│  │  ├─ entities
│  │  │  └─ record.entity.ts
│  │  ├─ records.controller.spec.ts
│  │  ├─ records.controller.ts
│  │  ├─ records.module.ts
│  │  ├─ records.service.spec.ts
│  │  └─ records.service.ts
│  ├─ schedule-members
│  │  ├─ dto
│  │  │  ├─ create-schedule-member.dto.ts
│  │  │  └─ update-schedule-member.dto.ts
│  │  ├─ entities
│  │  │  └─ schedule-member.entity.ts
│  │  ├─ schedule-members.controller.spec.ts
│  │  ├─ schedule-members.controller.ts
│  │  ├─ schedule-members.module.ts
│  │  ├─ schedule-members.service.spec.ts
│  │  └─ schedule-members.service.ts
│  ├─ schedules
│  │  ├─ dto
│  │  │  ├─ create-schedule.dto.ts
│  │  │  ├─ schedule.dto.ts
│  │  │  └─ update-schedule.dto.ts
│  │  ├─ entities
│  │  │  └─ schedule.entity.ts
│  │  ├─ schedules.controller.spec.ts
│  │  ├─ schedules.controller.ts
│  │  ├─ schedules.module.ts
│  │  ├─ schedules.service.spec.ts
│  │  └─ schedules.service.ts
│  ├─ types
│  │  └─ Category.type.ts
│  ├─ users
│  │  ├─ dto
│  │  │  ├─ delete.dto.ts
│  │  │  ├─ login.dto.ts
│  │  │  ├─ signup.dto.ts
│  │  │  └─ update.dto.ts
│  │  ├─ entities
│  │  │  └─ user.entity.ts
│  │  ├─ types
│  │  │  └─ userRole.type.ts
│  │  ├─ users.controller.spec.ts
│  │  ├─ users.controller.ts
│  │  ├─ users.module.ts
│  │  ├─ users.service.spec.ts
│  │  └─ users.service.ts
│  └─ utils
│     └─ swagger
│        └─ swagger.ts
├─ test
│  ├─ app.e2e-spec.ts
│  └─ jest-e2e.json
├─ tsconfig.build.json
├─ tsconfig.json
└─ views
├─ group-members_h
│  ├─ groupAccept.hbs
│  └─ groupInvite.hbs
├─ groups_h
│  ├─ groupAll.hbs
│  ├─ groupCreate.hbs
│  ├─ groupEdit.hbs
│  └─ groupList.hbs
├─ records_h
│  ├─ recordAll.hbs
│  ├─ recordCreate.hbs     
│  ├─ recordList.hbs
│  ├─ recordMylist.hbs
│  └─ recordTrack.hbs
├─ schedules_h
│  ├─ scheduleAll.hbs
│  ├─ scheduleCreate.hbs
│  ├─ scheduleEdit.hbs
│  └─ scheduleList.hbs
├─ users_h
│  ├─ emailAccept.hbs  
│  ├─ login.hbs
│  ├─ register.hbs
│  ├─ userAll.hbs
│  ├─ userDelete.hbs
│  ├─ userEdit.hbs
│  └─ userMypage.hbs
└─ Dashboard.hbs
└─ welcomePage.hbs

```
<br/>

# 📌 역할

> 이승도 
+ Hbs(Handlebars), 
+ Geolocation api, 
+ Records crud, 
+ Groups crud, 
+ AJAX, 
+ Nodemailer, 
+ Swagger


<br/>

# 🖋 프로젝트 기능 설명
+ Groups : 모두가 볼 수 있는 커뮤니티 기능

+ Records : 운동 시작 시간, 운동 종료 시간, 총 걸은 거리수, 시작 지점 좌표, 중지 지점 좌표등을
            기록할 수 있는 커뮤니티

+ Hbs(Handlebars) : 백엔드에서 전달된 데이터를 기반으로 프론트엔드의 HTML을 연동하여 동적인 웹 페이지를 생성하는데에 사용

+ Geolocation Api : 운동 경로 안내, 랜덤 경로 안내, 건물 이름 검색 등이 가능하고 운동 경로 추적 실행과 경로 추적 해제가 가능

+ AJAX : Geolocation Api에서의 경로 추적 해제 버튼 동작 시, Records 테이블에 데이터를 전송시켜주는 방식


