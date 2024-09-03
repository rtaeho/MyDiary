# MyDiary

MyDiary는 웹 애플리케이션의 플로우를 경험해보고자 시작한 사이드 프로젝트로 기능구현보다는 흐름을 이해하는데 중점을 뒀습니다.

## 주요 기능

- **기초 CRUD 기능**: 사용자 계정, 일기, 할 일 목록에 대한 생성(Create), 읽기(Read), 수정(Update), 삭제(Delete) 기능을 제공합니다.
- **소셜 로그인**: 카카오 계정을 사용하여 로그인할 수 있습니다.

## 기술 스택

### 프론트엔드

- **React**: 사용자 인터페이스를 구축하기 위해 사용된 프레임워크.

### 백엔드

- **Spring Boot**: Java 기반 백엔드 애플리케이션을 구축하기 위해 사용된 프레임워크.

### 데이터베이스

- **MySQL**: 관계형 데이터베이스 관리 시스템으로 데이터 저장을 담당.

## 서버 및 배포

- **AWS EC2**: 백엔드 서버를 호스팅하기 위해 사용된 클라우드 서비스.
- **Vercel**: 프론트엔드 애플리케이션을 배포하기 위해 사용된 플랫폼.

## 도메인 및 라우팅

- **도메인 구입 및 설정**: 프로젝트를 위한 도메인을 구입하고 Route 53을 이용해 DNS 설정을 완료하였습니다.

## SSL 인증서

- **Let's Encrypt**: SSL 인증서를 발급받아 사이트의 보안을 강화하였습니다. Let's Encrypt를 사용하여 SSL 인증서를 발급받고, 이를 통해 HTTPS를 적용하였습니다.