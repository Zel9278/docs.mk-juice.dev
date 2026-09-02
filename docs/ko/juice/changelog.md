# 변경 이력

misskey-juice의 JUICE 고유 기능에 관한 주요 변경 이력입니다. 본가 Misskey 유래의 변경 사항은 포함되지 않습니다. 전체 이력은 [GitHub 릴리스 페이지](https://github.com/Zel9278/misskey-juice/releases)를 참고해 주세요.

> [!note]
> 새 릴리스는 [일본어 변경 이력](../../juice/changelog.md)에 자동으로 추가되지만, 이 한국어 페이지는 수동으로만 갱신되어 최신 내용이 반영되지 않을 수 있습니다. 최신 정보가 필요하시면 일본어 페이지(또는 위 GitHub 릴리스 페이지)도 함께 확인해 주세요.

## v2026.7.0-juice+2.5

- [이모지 신청](./emoji-request.md)・아바타 데코레이션 신청・[승인제 신규 가입](./approval-signup.md)의 승인/반려를, 모더레이터 권한이 없는 사용자에게도 역할 단위로 개별 위임할 수 있도록 함

## v2026.7.0-juice+2.4

- 일반 사용자가 아바타 데코레이션을 신청할 수 있는 "아바타 데코레이션 신청" 페이지 추가([이모지 신청](./emoji-request.md)과 동일한 방식)
- 관리 화면의 JUICE 고유 항목에 배지가 표시되지 않던 버그 수정

## v2026.7.0-juice+2.3

- Webhook 전송 대상이 Discord Webhook URL인 경우, 자동으로 보기 좋은 Embed 형식으로 정리하여 전송하도록 함

## v2026.7.0-juice+2.2

- 이 릴리스부터 `juice/main` 브랜치로의 공개 시작
- pgroonga 검색에서 `OR`나 `-` 등의 기호를 포함한 단어일 경우 검색이 실패하던 버그 수정
- (chan-mai님 기여) 이모지 신청 승인 시 파일 손상, 로그인 시 승인 대기 체크 타이밍 등 수정

## v2026.7.0-juice+2.1

- 앱 내 [About JUICE 페이지](./about-page.md)에 기여자 항목 추가

## v2026.7.0-juice+2.0

JUICE 고유 기능을 대거 추가한 대규모 릴리스입니다. 주요 추가 기능:

- [승인제 신규 가입](./approval-signup.md)
- [AI 생성 콘텐츠 플래그](./ai-generated-flag.md)
- [이모지 신청](./emoji-request.md)
- [사용자 랭킹](./user-ranking.md)
- [릴레이 타임라인](./relay-timeline.md)
- [위젯 표시 위치 설정](./widget-position.md)
- [공지사항 투표 기능](./announcement-poll.md)
- [LaTeX(수식) 표시](./latex.md)
- 다른 사용자 대상 개인 전용 닉네임 기능
- 로그인 실패 시 본인 알림
- 앱 내 [About JUICE 페이지](./about-page.md) 신설

## v2026.7.0-juice+1.0

Misskey 2026.7.0을 기반으로 한 첫 릴리스. misskey-art에서 아래 내용을 포팅:

- [민감한 이미지 표시 관련 수정](./cw-image-blur-fix.md)
- [공지사항 리액션 기능](./announcement-reaction.md)
- 개발용 DB 오삭제 방지 가드
