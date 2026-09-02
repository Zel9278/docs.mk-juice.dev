# 본가 Misskey/다른 포크에서 마이그레이션

직접 Misskey 서버를 운영하고 있는 분이 소프트웨어를 misskey-juice로 전환하는 경우의 가이드입니다.

> [!warning] 주의
> 여기서의 절차는 일반적인 사고방식을 안내하는 것으로, 모든 환경・모든 버전・모든 포크에서의 동작을 보장하지는 않습니다. **반드시 사전에 데이터베이스를 백업하고, 가능하다면 스테이징 환경에서 한 번 리허설한 후 프로덕션에 적용해 주세요.**
>
> 또한 공개 서버로 계속 운영할 경우, [chan-mai님의 Misskey 서버 운영 가이드](https://mq1.dev/entry/krpvl5itbr9h#h0cb67a7186)(일본어)나 [공식 설치 가이드](https://misskey-hub.net/en/docs/for-admin/install/guides/)도 함께 읽어보시길 권장합니다. 이 주의사항은 misskey-juice뿐만 아니라 Misskey 포크・Misskey 자체 전반에 해당됩니다.

## misskey-juice의 위치

misskey-juice는 본가 Misskey의 [`Release: 2026.7.0`](https://github.com/misskey-dev/misskey/releases/tag/2026.7.0)에서 분기된 포크입니다. 마이그레이션 이력도 본가 2026.7.0까지를 계승한 상태에서, 그 위에 JUICE 고유 기능 추가분이 쌓여 있습니다.

따라서, **본가 Misskey(develop)를 2026.7.0 상당 이상까지 운영하고 있는 경우, 일반적인 마이너/메이저 업데이트와 같은 요령으로 마이그레이션할 수 있을 가능성이 높습니다.**

한편, [CherryPick](https://github.com/kokonect-link/cherrypick)처럼 본가 Misskey에서 크게 분기된 포크를 운영하고 있는 경우, 마이그레이션 이력 자체가 다르기 때문에 이 절차대로의 마이그레이션은 어려울 것으로 예상됩니다. 이 경우에는 마이그레이션이 아닌 새로 구축한 후 데이터 내보내기/가져오기를 검토해 주세요.

## 마이그레이션 절차

기본적인 흐름은 [본가 Misskey의 업데이트 절차](https://misskey-hub.net/en/docs/for-admin/install/guides/manual/)와 거의 동일합니다. 명령어는 모두 **저장소의 루트 디렉토리**에서 실행합니다(`packages/backend` 등의 하위 디렉토리로 수동으로 이동할 필요가 없습니다).

1. **데이터베이스를 백업합니다**(`pg_dump` 등). 이것이 가장 중요한 단계입니다.
2. misskey-juice 소스를 가져옵니다.

   ```bash
   git clone --recursive https://github.com/Zel9278/misskey-juice.git
   cd misskey-juice
   ```

   최신 [릴리스 태그](https://github.com/Zel9278/misskey-juice/releases)를 checkout하고 서브모듈을 초기화합니다.

   ```bash
   git checkout <태그명>
   git submodule update --init
   ```
3. 의존성을 설치합니다.

   ```bash
   NODE_ENV=production pnpm install --frozen-lockfile
   ```
4. 빌드합니다.

   ```bash
   NODE_ENV=production pnpm run build
   ```
5. 기존의 `.config/default.yml`을 그대로 이 저장소의 `.config/default.yml`로 복사합니다(db/redis 접속 정보 등은 변경할 필요가 없습니다). JUICE 고유 기능의 설정 항목에 대해서는 [JUICE 고유 기능 설정](../juice/settings.md)을 참고해 주세요.
6. 마이그레이션을 실행합니다(루트 디렉토리에서 그대로 실행할 수 있습니다).

   ```bash
   pnpm run migrate
   ```
7. 서버를 시작하고 정상적으로 작동하는지 확인합니다. systemd 등으로 서비스화한 경우 `WorkingDirectory`를 새 디렉토리로 지정한 후 재시작해 주세요.

## 마이그레이션 후 주의사항

- [JUICE 고유 기능](../juice/index.md) 중에는 기본적으로 비활성화되어 있는 것도 있습니다. 필요에 따라 컨트롤 패널의 "JUICE" 항목에서 활성화해 주세요.
- 문제가 발생한 경우, 1단계에서 만든 백업으로 롤백해 주세요.
