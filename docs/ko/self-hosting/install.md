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
- PostgreSQL(**18 이상을 권장**합니다. 새로 구축하는 경우 성능과 안정성 측면에서 가능한 최신 버전을 사용해 주세요)
- Redis(또는 Redis 호환 valkey 등)
- FFmpeg

> [!note] 전문 검색 엔진에 대해서
> 표준 Misskey는 전문 검색에 `sqlLike`(PostgreSQL의 `LIKE` 검색)를 사용하지만, 게시물 수가 늘어나면 검색이 느려지기 쉽습니다. Juice Server에서는 더 빠르고 일본어 등 CJK 언어의 검색 정확도도 높은 [pgroonga](https://pgroonga.github.io/) 사용을 권장합니다. 도입 절차는 [아래](#pgroonga-설정하기-권장)를 참고해 주세요.

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

   실제 운영 환경에서는 [systemd 등으로 서비스화하는 것](#systemd로-서비스화하기-권장)을 권장합니다.

## pgroonga 설정하기 (권장)

[pgroonga](https://pgroonga.github.io/)는 PostgreSQL용 고속 전문 검색 확장 기능입니다. 표준 `sqlLike` 검색에 비해, 게시물 수가 늘어났을 때의 검색 속도와 일본어 등 CJK 언어의 검색 정확도가 크게 향상됩니다.

### 설치하기

배포판에 따라 도입 방법이 다릅니다.

**Debian / Ubuntu**

Groonga 프로젝트가 공식 APT 저장소를 제공하므로, 이를 이용하는 것이 간단합니다.

```bash
# Groonga 공식 저장소 추가(Ubuntu 예시. 버전별 정확한 절차는 pgroonga 공식 사이트 참고)
curl -fsSL https://packages.groonga.org/ubuntu/groonga-apt-source-latest-$(lsb_release -cs).deb -o groonga-apt-source-latest.deb
sudo apt install -y ./groonga-apt-source-latest.deb
sudo apt update
sudo apt install -y postgresql-18-pgroonga
```

`postgresql-18-pgroonga`의 `18`은 사용 중인 PostgreSQL의 메이저 버전에 맞게 변경해 주세요.

**Fedora / RHEL 계열**

Fedora/RHEL 계열에서는 사용 중인 PostgreSQL 버전용으로 빌드된 pgroonga 패키지가 제공되지 않는 경우가 많아, **소스에서 직접 빌드**해야 합니다.

```bash
# 빌드에 필요한 패키지
sudo dnf install -y groonga-devel postgresql-server-devel meson ninja-build ruby msgpack-devel cmake gcc-c++

git clone --recursive https://github.com/pgroonga/pgroonga.git
cd pgroonga
make PG_CONFIG=/usr/pgsql-18/bin/pg_config
sudo make install PG_CONFIG=/usr/pgsql-18/bin/pg_config
```

> [!note]
> `PG_CONFIG`에 지정하는 경로는 PostgreSQL 설치 방법에 따라 다릅니다. `which pg_config` 등으로 실제 경로를 확인한 후 지정해 주세요.

**기타 배포판**

[pgroonga 공식 문서의 설치 가이드](https://pgroonga.github.io/install/)를 참고해 주세요.

### 활성화하기

설치 후, Misskey가 사용하는 데이터베이스에서 확장 기능을 활성화하고 `note` 테이블에 pgroonga 인덱스를 생성합니다.

```sql
CREATE EXTENSION IF NOT EXISTS pgroonga;
CREATE INDEX note_text_pgroonga_index ON note USING pgroonga (text);
```

일본어 검색 정확도를 더 높이고 싶다면, PostgreSQL 서버에서 MeCab(`mecab-ipadic`)을 사용할 수 있는 경우 다음과 같이 MeCab 기반 토크나이저를 지정할 수도 있습니다.

```sql
CREATE INDEX note_text_pgroonga_index ON note USING pgroonga (text) WITH (tokenizer='TokenMecab');
```

마지막으로 `.config/default.yml`의 `fulltextSearch.provider`를 `sqlPgroonga`로 변경하고 Misskey를 재시작해 주세요.

```yaml
fulltextSearch:
  provider: sqlPgroonga
```

## systemd로 서비스화하기 (권장)

실제 운영 환경에서는 다음과 같은 systemd 유닛 파일을 `/etc/systemd/system/misskey.service`로 배치하는 것을 권장합니다.

```ini
[Unit]
Description=Misskey daemon
After=network.target postgresql.service redis-server.service

[Service]
Type=simple
User=misskey
WorkingDirectory=/home/misskey/misskey
ExecStart=/home/misskey/.local/share/pnpm/pnpm start
Environment="NODE_ENV=production"
Environment="NODE_OPTIONS=--max-old-space-size=2048"
Environment="PNPM_HOME=/home/misskey/.local/share/pnpm"
Environment="PATH=/home/misskey/.local/share/pnpm/bin:/home/misskey/.local/share/pnpm:/usr/local/bin:/usr/bin:/bin"
# jemalloc: 장시간 운영 시 RSS 단편화 억제. decay를 짧게 설정하여 미사용 페이지를 OS로 반환
Environment="LD_PRELOAD=/usr/lib64/libjemalloc.so.2"
Environment="MALLOC_CONF=background_thread:true,dirty_decay_ms:5000,muzzy_decay_ms:5000"
StandardOutput=journal
StandardError=journal
SyslogIdentifier=misskey
TimeoutSec=60
Restart=always
RestartSec=5
# Environment="MK_ONLY_SERVER=1"

# 메모리 안전장치(서버의 RAM에 맞게 조정)
MemoryHigh=10G
MemoryMax=12G
MemorySwapMax=0

[Install]
WantedBy=multi-user.target
```

### 각 설정 항목에 대해서

- `User`/`WorkingDirectory`: misskey-juice를 클론한 전용 OS 사용자와 해당 디렉토리에 맞춰 주세요.
- `ExecStart`: pnpm 실행 파일의 경로는 환경에 따라 다릅니다. `which pnpm` 등으로 확인해 주세요. 마이그레이션은 이 유닛에 포함되어 있지 않으므로, 버전 업그레이드 시에는 시작(재시작) 전에 수동으로 `pnpm migrate`를 실행해 주세요.
- `PNPM_HOME`/`PATH`: systemd는 로그인 셸의 `.bashrc` 등을 경유하지 않으므로, `pnpm` 명령어 자체를 찾을 수 있도록 PATH를 명시적으로 지정해야 합니다.
- `NODE_OPTIONS=--max-old-space-size`: Node.js의 힙 크기 상한입니다. 서버의 RAM에 맞게 조정해 주세요.
- `LD_PRELOAD`/`MALLOC_CONF`: [jemalloc](https://jemalloc.net/)을 사용한 메모리 할당자 교체입니다. 표준 할당자(glibc malloc)는 장시간 운영 시 메모리 단편화로 인해 RSS가 점점 증가할 수 있는데, jemalloc으로 전환하면 개선을 기대할 수 있습니다. `dirty_decay_ms`/`muzzy_decay_ms`를 짧게 설정하면 미사용 메모리 페이지를 더 빨리 OS로 반환합니다. 설치 방법은 [아래](#jemalloc-설치하기)를 참고해 주세요.
- `MemoryHigh`/`MemoryMax`/`MemorySwapMax`: systemd에 의한 메모리 사용량 안전장치입니다. `MemoryHigh`를 초과하면 메모리 할당이 점점 제한되고, `MemoryMax`를 초과하면 OOM killer에 의해 강제 종료됩니다. 서버 전체 RAM 용량에 맞게 조정해 주세요.
- 주석 처리된 `Environment="MK_ONLY_SERVER=1"`은 현재로서는 사용되지 않는 예약용 줄입니다. 보통은 주석으로 남겨두어도 문제없습니다.

### jemalloc 설치하기

배포판에 따라 패키지 이름과 설치 경로가 다릅니다.

**Fedora / RHEL 계열**

```bash
sudo dnf install -y jemalloc
```

일반적으로 `/usr/lib64/libjemalloc.so.2`에 설치됩니다.

**Debian / Ubuntu**

```bash
sudo apt install -y libjemalloc2
```

일반적으로 `/usr/lib/x86_64-linux-gnu/libjemalloc.so.2`(CPU 아키텍처에 따라 경로가 다름)에 설치됩니다.

**Arch Linux**

```bash
sudo pacman -S jemalloc
```

정확한 경로를 모르는 경우, 다음 명령어로 확인할 수 있습니다.

```bash
ldconfig -p | grep jemalloc
```

유닛 파일의 `LD_PRELOAD`는 확인한 경로에 맞게 수정해 주세요.

## 관련 문서

- [이 서버의 운영 방침에 대해서](../about-juice-server.md)
- [본가 Misskey/다른 포크에서 마이그레이션](./migration-from-misskey.md)
