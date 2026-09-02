# 처음부터 구축하기

misskey-juice를 새로 설치하는 경우의 절차입니다. 기본적인 흐름은 [본가 Misskey의 수동 설치 가이드](https://misskey-hub.net/en/docs/for-admin/install/guides/manual/)와 거의 동일합니다.

> [!warning] 공개 서버를 운영하기 전에
> misskey-juice뿐만 아니라, 공개 Misskey 서버를 운영하는 것은 예상보다 훨씬 큰 책임을 수반합니다. **공개하기 전에 아래 가이드를 잘 읽고 검토해 주세요.**
>
> - [chan-mai님의 Misskey 서버 운영 가이드](https://mq1.dev/entry/krpvl5itbr9h#h0cb67a7186) (일본어)
> - [공식 설치 가이드](https://misskey-hub.net/en/docs/for-admin/install/guides/)
>
> 특히 **데이터베이스 백업 체계**, 이용자 대응・모더레이션의 정신적 부담, 커스텀 이모지 임포트 시의 저작권 책임에 대해서는 사전에 충분히 검토해 주세요.
>
> **이 주의사항은 misskey-juice뿐만 아니라 Misskey 포크・Misskey 자체 전반에 해당됩니다.**

## 사전 요구사항

- Node.js(본가 Misskey와 동일한 버전 요구사항 준수)
- pnpm
- PostgreSQL
- Redis(또는 Redis 호환 valkey 등)
- FFmpeg

## 절차

명령어는 모두 **저장소의 루트 디렉토리**에서 실행합니다.

1. misskey-juice 전용 OS 사용자를 만드는 것을 권장합니다.

   ```bash
   adduser --disabled-password --disabled-login misskey
   ```
2. 저장소를 클론하고 릴리스 태그를 checkout합니다.

   ```bash
   sudo -iu misskey git clone --recursive https://github.com/Zel9278/misskey-juice.git
   cd misskey-juice
   git checkout <태그명>
   git submodule update --init
   ```
3. 의존성을 설치합니다.

   ```bash
   NODE_ENV=production pnpm install --frozen-lockfile
   ```
4. 설정 파일을 만듭니다.

   ```bash
   cp .config/example.yml .config/default.yml
   ```

   `.config/default.yml`을 편집하여 `url`・데이터베이스 접속 정보 등을 설정해 주세요. JUICE 고유 기능의 설정 항목에 대해서는 [JUICE 고유 기능 설정](../juice/settings.md)을 참고해 주세요.
5. 빌드 및 초기화(마이그레이션)를 진행합니다.

   ```bash
   NODE_ENV=production pnpm run build
   pnpm run init
   ```
6. 서버를 시작합니다.

   ```bash
   NODE_ENV=production pnpm run start
   ```

   실제 운영 환경에서는 systemd 등으로 서비스화하는 것을 권장합니다.

## 관련 문서

- [이 서버의 운영 방침에 대해서](../about-juice-server.md)
- [본가 Misskey/다른 포크에서 마이그레이션](./migration-from-misskey.md)
