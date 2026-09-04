import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";
import markdownItFootnote from "markdown-it-footnote";

const jaSidebar = [
	{ text: "このインスタンスの運用方針について", link: "/about-juice-server" },
	{
		text: "Misskey Juiceからのお知らせ",
		items: [
			{ text: "お知らせ一覧", link: "/news/" },
			{
				text: "ZenSky Project及び『Misskey.Tokyo』様への見解表明",
				link: "/news/2026-09-04-zensky-statement",
			},
		],
	},
	{
		text: "サービス",
		items: [
			{ text: "ルール", link: "/service/rules" },
			{
				text: "カスタム絵文字・アバターデコレーションのガイドライン",
				link: "/service/emoji-avatar-decoration-guidelines",
			},
			{ text: "利用規約", link: "/service/tos" },
			{ text: "プライバシーポリシー", link: "/service/privacy_policy" },
		],
	},
	{
		text: "セルフホスト",
		items: [
			{ text: "0から構築する", link: "/self-hosting/install" },
			{
				text: "本家Misskey/他フォークからの移行",
				link: "/self-hosting/migration-from-misskey",
			},
		],
	},
	{
		text: "JUICE独自機能",
		items: [
			{ text: "機能一覧", link: "/juice/" },
			{ text: "JUICE独自機能の設定", link: "/juice/settings" },
			{ text: "承認式新規登録", link: "/juice/approval-signup" },
			{ text: "AI生成物フラグ", link: "/juice/ai-generated-flag" },
			{ text: "絵文字申請", link: "/juice/emoji-request" },
			{
				text: "アバターデコレーション申請",
				link: "/juice/avatar-decoration-request",
			},
			{ text: "ユーザーランキング", link: "/juice/user-ranking" },
			{ text: "リレータイムライン", link: "/juice/relay-timeline" },
			{ text: "About JUICEページ", link: "/juice/about-page" },
			{ text: "ウィジェット表示位置設定", link: "/juice/widget-position" },
			{ text: "お知らせの投票機能", link: "/juice/announcement-poll" },
			{ text: "お知らせのリアクション機能", link: "/juice/announcement-reaction" },
			{ text: "LaTeX(数式)表示", link: "/juice/latex" },
			{
				text: "センシティブ画像の表示に関する修正",
				link: "/juice/cw-image-blur-fix",
			},
			{ text: "更新履歴", link: "/juice/changelog" },
		],
	},
];

const enSidebar = [
	{
		text: "About this instance's operating policy",
		link: "/en/about-juice-server",
	},
	{
		text: "Announcements from Misskey Juice",
		items: [
			{ text: "All announcements", link: "/en/news/" },
			{
				text: "A Statement to ZenSky Project and \"Misskey.Tokyo\"",
				link: "/en/news/2026-09-04-zensky-statement",
			},
		],
	},
	{
		text: "Service",
		items: [
			{ text: "Rules", link: "/en/service/rules" },
			{
				text: "Custom Emoji & Avatar Decoration Guidelines",
				link: "/en/service/emoji-avatar-decoration-guidelines",
			},
			{ text: "Terms of Service", link: "/en/service/tos" },
			{ text: "Privacy Policy", link: "/en/service/privacy_policy" },
		],
	},
	{
		text: "Self-Hosting",
		items: [
			{ text: "Building from scratch", link: "/en/self-hosting/install" },
			{
				text: "Migrating from upstream Misskey / other forks",
				link: "/en/self-hosting/migration-from-misskey",
			},
		],
	},
	{
		text: "JUICE Features",
		items: [
			{ text: "Feature list", link: "/en/juice/" },
			{ text: "JUICE feature settings", link: "/en/juice/settings" },
			{ text: "Approval-based signup", link: "/en/juice/approval-signup" },
			{
				text: "AI-generated content flag",
				link: "/en/juice/ai-generated-flag",
			},
			{ text: "Emoji requests", link: "/en/juice/emoji-request" },
			{
				text: "Avatar decoration requests",
				link: "/en/juice/avatar-decoration-request",
			},
			{ text: "User ranking", link: "/en/juice/user-ranking" },
			{ text: "Relay timeline", link: "/en/juice/relay-timeline" },
			{ text: "About JUICE page", link: "/en/juice/about-page" },
			{
				text: "Widget position setting",
				link: "/en/juice/widget-position",
			},
			{ text: "Announcement polls", link: "/en/juice/announcement-poll" },
			{
				text: "Announcement reactions",
				link: "/en/juice/announcement-reaction",
			},
			{ text: "LaTeX (math) rendering", link: "/en/juice/latex" },
			{
				text: "Sensitive image display fix",
				link: "/en/juice/cw-image-blur-fix",
			},
			{ text: "Changelog", link: "/en/juice/changelog" },
		],
	},
];

const koSidebar = [
	{ text: "이 인스턴스의 운영 방침에 대해서", link: "/ko/about-juice-server" },
	{
		text: "Misskey Juice 공지사항",
		items: [
			{ text: "공지사항 목록", link: "/ko/news/" },
			{
				text: "ZenSky Project 및 『Misskey.Tokyo』 측에 대한 견해 표명",
				link: "/ko/news/2026-09-04-zensky-statement",
			},
		],
	},
	{
		text: "서비스",
		items: [
			{ text: "규칙", link: "/ko/service/rules" },
			{
				text: "커스텀 이모지·아바타 데코레이션 가이드라인",
				link: "/ko/service/emoji-avatar-decoration-guidelines",
			},
			{ text: "이용약관", link: "/ko/service/tos" },
			{ text: "개인정보처리방침", link: "/ko/service/privacy_policy" },
		],
	},
	{
		text: "셀프 호스팅",
		items: [
			{ text: "처음부터 구축하기", link: "/ko/self-hosting/install" },
			{
				text: "본가 Misskey/다른 포크에서 마이그레이션",
				link: "/ko/self-hosting/migration-from-misskey",
			},
		],
	},
	{
		text: "JUICE 고유 기능",
		items: [
			{ text: "기능 목록", link: "/ko/juice/" },
			{ text: "JUICE 고유 기능 설정", link: "/ko/juice/settings" },
			{ text: "승인제 신규 가입", link: "/ko/juice/approval-signup" },
			{ text: "AI 생성 콘텐츠 플래그", link: "/ko/juice/ai-generated-flag" },
			{ text: "이모지 신청", link: "/ko/juice/emoji-request" },
			{
				text: "아바타 데코레이션 신청",
				link: "/ko/juice/avatar-decoration-request",
			},
			{ text: "사용자 랭킹", link: "/ko/juice/user-ranking" },
			{ text: "릴레이 타임라인", link: "/ko/juice/relay-timeline" },
			{ text: "About JUICE 페이지", link: "/ko/juice/about-page" },
			{ text: "위젯 표시 위치 설정", link: "/ko/juice/widget-position" },
			{ text: "공지사항 투표 기능", link: "/ko/juice/announcement-poll" },
			{
				text: "공지사항 리액션 기능",
				link: "/ko/juice/announcement-reaction",
			},
			{ text: "LaTeX(수식) 표시", link: "/ko/juice/latex" },
			{
				text: "민감한 이미지 표시 관련 수정",
				link: "/ko/juice/cw-image-blur-fix",
			},
			{ text: "변경 이력", link: "/ko/juice/changelog" },
		],
	},
];

const zhHansSidebar = [
	{ text: "关于本实例的运营方针", link: "/zh-hans/about-juice-server" },
	{
		text: "Misskey Juice 公告",
		items: [
			{ text: "公告列表", link: "/zh-hans/news/" },
			{
				text: "致 ZenSky Project 及『Misskey.Tokyo』的意见声明",
				link: "/zh-hans/news/2026-09-04-zensky-statement",
			},
		],
	},
	{
		text: "服务",
		items: [
			{ text: "规则", link: "/zh-hans/service/rules" },
			{
				text: "自定义表情符号・头像装饰指南",
				link: "/zh-hans/service/emoji-avatar-decoration-guidelines",
			},
			{ text: "服务条款", link: "/zh-hans/service/tos" },
			{ text: "隐私政策", link: "/zh-hans/service/privacy_policy" },
		],
	},
	{
		text: "自建",
		items: [
			{ text: "从零开始搭建", link: "/zh-hans/self-hosting/install" },
			{
				text: "从官方 Misskey / 其他分支迁移",
				link: "/zh-hans/self-hosting/migration-from-misskey",
			},
		],
	},
	{
		text: "JUICE 独有功能",
		items: [
			{ text: "功能列表", link: "/zh-hans/juice/" },
			{ text: "JUICE 独有功能设置", link: "/zh-hans/juice/settings" },
			{ text: "审核制注册", link: "/zh-hans/juice/approval-signup" },
			{ text: "AI 生成内容标记", link: "/zh-hans/juice/ai-generated-flag" },
			{ text: "表情符号申请", link: "/zh-hans/juice/emoji-request" },
			{
				text: "头像装饰申请",
				link: "/zh-hans/juice/avatar-decoration-request",
			},
			{ text: "用户排行榜", link: "/zh-hans/juice/user-ranking" },
			{ text: "中继时间线", link: "/zh-hans/juice/relay-timeline" },
			{ text: "About JUICE 页面", link: "/zh-hans/juice/about-page" },
			{ text: "小组件位置设置", link: "/zh-hans/juice/widget-position" },
			{ text: "公告投票功能", link: "/zh-hans/juice/announcement-poll" },
			{
				text: "公告表情回应功能",
				link: "/zh-hans/juice/announcement-reaction",
			},
			{ text: "LaTeX(数学公式)显示", link: "/zh-hans/juice/latex" },
			{
				text: "敏感图片显示相关修复",
				link: "/zh-hans/juice/cw-image-blur-fix",
			},
			{ text: "更新日志", link: "/zh-hans/juice/changelog" },
		],
	},
];

const zhHantSidebar = [
	{ text: "關於本實例的營運方針", link: "/zh-hant/about-juice-server" },
	{
		text: "Misskey Juice 公告",
		items: [
			{ text: "公告列表", link: "/zh-hant/news/" },
			{
				text: "致 ZenSky Project 及『Misskey.Tokyo』的意見聲明",
				link: "/zh-hant/news/2026-09-04-zensky-statement",
			},
		],
	},
	{
		text: "服務",
		items: [
			{ text: "規則", link: "/zh-hant/service/rules" },
			{
				text: "自訂表情符號・頭像裝飾指南",
				link: "/zh-hant/service/emoji-avatar-decoration-guidelines",
			},
			{ text: "服務條款", link: "/zh-hant/service/tos" },
			{ text: "隱私政策", link: "/zh-hant/service/privacy_policy" },
		],
	},
	{
		text: "自架",
		items: [
			{ text: "從零開始建置", link: "/zh-hant/self-hosting/install" },
			{
				text: "從官方 Misskey / 其他分支遷移",
				link: "/zh-hant/self-hosting/migration-from-misskey",
			},
		],
	},
	{
		text: "JUICE 獨有功能",
		items: [
			{ text: "功能列表", link: "/zh-hant/juice/" },
			{ text: "JUICE 獨有功能設定", link: "/zh-hant/juice/settings" },
			{ text: "審核制註冊", link: "/zh-hant/juice/approval-signup" },
			{ text: "AI 生成內容標記", link: "/zh-hant/juice/ai-generated-flag" },
			{ text: "表情符號申請", link: "/zh-hant/juice/emoji-request" },
			{
				text: "頭像裝飾申請",
				link: "/zh-hant/juice/avatar-decoration-request",
			},
			{ text: "使用者排行榜", link: "/zh-hant/juice/user-ranking" },
			{ text: "中繼時間軸", link: "/zh-hant/juice/relay-timeline" },
			{ text: "About JUICE 頁面", link: "/zh-hant/juice/about-page" },
			{ text: "小工具位置設定", link: "/zh-hant/juice/widget-position" },
			{ text: "公告投票功能", link: "/zh-hant/juice/announcement-poll" },
			{
				text: "公告表情回應功能",
				link: "/zh-hant/juice/announcement-reaction",
			},
			{ text: "LaTeX(數學公式)顯示", link: "/zh-hant/juice/latex" },
			{
				text: "敏感圖片顯示相關修復",
				link: "/zh-hant/juice/cw-image-blur-fix",
			},
			{ text: "更新日誌", link: "/zh-hant/juice/changelog" },
		],
	},
];

// https://vitepress.dev/reference/site-config
export default withMermaid(defineConfig({
	cacheDir: "../.cache",
	outDir: "../dist",
	head: [
		["link", { rel: "icon", type: "image/png", href: "/juice-icon.png" }],
	],
	cleanUrls: true,
	lastUpdated: true,
	vite: {
		// vitepress-plugin-mermaidが事前バンドル対象に含めていないmermaidの
		// 内部依存(CJS製で、pre-bundleされないとブラウザでのESM importに失敗する)
		optimizeDeps: {
			include: ["fastdom", "fastdom/extensions/fastdom-promised.js"],
		},
	},
	markdown: {
		config: (md) => {
			md.use(markdownItFootnote);
		},
	},
	themeConfig: {
		logo: "/juice-icon.png",
		outline: {
			level: "deep",
		},
		socialLinks: [
			{ icon: "github", link: "https://github.com/Zel9278/misskey-juice" },
		],
		// VitePressのlocalSearchPluginはlocales内ではなくルートのthemeConfig.searchしか
		// 見ないため、ここで指定しないと検索インデックスが生成されない(空になる)。
		// 各ロケール別のsearch.options.translationsは各locales.*.themeConfigで上書きされる。
		search: {
			provider: "local",
		},
	},
	locales: {
		root: {
			label: "日本語",
			lang: "ja",
			title: "Juice Server Docs",
			description: "Juice Server ドキュメント",
			markdown: {
				container: {
					tipLabel: "備考",
					warningLabel: "注意",
					dangerLabel: "警告",
				},
			},
			themeConfig: {
				nav: [{ text: "ホーム", link: "/" }],
				sidebar: jaSidebar,
				outline: {
					label: "目次",
				},
				search: {
					provider: "local",
					options: {
						translations: {
							button: {
								buttonText: "検索",
								buttonAriaLabel: "検索",
							},
							modal: {
								displayDetails: "詳細リストを表示",
								resetButtonTitle: "リセット",
								backButtonTitle: "戻る",
								noResultsText: "検索結果が見つかりません",
								footer: {
									selectText: "選択",
									selectKeyAriaLabel: "スペースキー",
									navigateText: "移動",
									navigateUpKeyAriaLabel: "上キー",
									navigateDownKeyAriaLabel: "下キー",
									closeText: "閉じる",
									closeKeyAriaLabel: "esc",
								},
							},
						},
					},
				},
				editLink: {
					pattern:
						"https://github.com/Zel9278/docs.mk-juice.dev/edit/main/docs/:path",
					text: "GitHubでこのページを編集する提案をする",
				},
				lastUpdated: {
					text: "最終更新",
				},
				docFooter: {
					prev: "前のページ",
					next: "次のページ",
				},
				darkModeSwitchTitle: "ダークモードに切り替え",
				lightModeSwitchTitle: "ライトモードに切り替え",
				sidebarMenuLabel: "メニュー",
				returnToTopLabel: "ページの先頭に戻る",
				darkModeSwitchLabel: "外観",
			},
		},
		en: {
			label: "English",
			lang: "en",
			link: "/en/",
			title: "Juice Server Docs",
			description: "Juice Server documentation",
			themeConfig: {
				nav: [{ text: "Home", link: "/en/" }],
				sidebar: enSidebar,
				search: {
					provider: "local",
				},
				editLink: {
					pattern:
						"https://github.com/Zel9278/docs.mk-juice.dev/edit/main/docs/:path",
					text: "Suggest changes to this page on GitHub",
				},
			},
		},
		ko: {
			label: "한국어",
			lang: "ko",
			link: "/ko/",
			title: "Juice Server Docs",
			description: "Juice Server 문서",
			themeConfig: {
				nav: [{ text: "홈", link: "/ko/" }],
				sidebar: koSidebar,
				outline: {
					label: "목차",
				},
				search: {
					provider: "local",
					options: {
						translations: {
							button: {
								buttonText: "검색",
								buttonAriaLabel: "검색",
							},
							modal: {
								displayDetails: "상세 목록 표시",
								resetButtonTitle: "초기화",
								backButtonTitle: "뒤로",
								noResultsText: "검색 결과가 없습니다",
								footer: {
									selectText: "선택",
									selectKeyAriaLabel: "스페이스",
									navigateText: "이동",
									navigateUpKeyAriaLabel: "위 화살표",
									navigateDownKeyAriaLabel: "아래 화살표",
									closeText: "닫기",
									closeKeyAriaLabel: "esc",
								},
							},
						},
					},
				},
				editLink: {
					pattern:
						"https://github.com/Zel9278/docs.mk-juice.dev/edit/main/docs/:path",
					text: "GitHub에서 이 페이지 수정 제안하기",
				},
				lastUpdated: {
					text: "마지막 업데이트",
				},
				docFooter: {
					prev: "이전 페이지",
					next: "다음 페이지",
				},
				darkModeSwitchTitle: "다크 모드로 전환",
				lightModeSwitchTitle: "라이트 모드로 전환",
				sidebarMenuLabel: "메뉴",
				returnToTopLabel: "맨 위로",
				darkModeSwitchLabel: "테마",
			},
		},
		"zh-hans": {
			label: "简体中文",
			lang: "zh-Hans",
			link: "/zh-hans/",
			title: "Juice Server Docs",
			description: "Juice Server 文档",
			themeConfig: {
				nav: [{ text: "首页", link: "/zh-hans/" }],
				sidebar: zhHansSidebar,
				outline: {
					label: "本页目录",
				},
				search: {
					provider: "local",
					options: {
						translations: {
							button: {
								buttonText: "搜索",
								buttonAriaLabel: "搜索",
							},
							modal: {
								displayDetails: "显示详细列表",
								resetButtonTitle: "重置",
								backButtonTitle: "返回",
								noResultsText: "没有找到相关结果",
								footer: {
									selectText: "选择",
									selectKeyAriaLabel: "空格键",
									navigateText: "切换",
									navigateUpKeyAriaLabel: "上箭头",
									navigateDownKeyAriaLabel: "下箭头",
									closeText: "关闭",
									closeKeyAriaLabel: "esc",
								},
							},
						},
					},
				},
				editLink: {
					pattern:
						"https://github.com/Zel9278/docs.mk-juice.dev/edit/main/docs/:path",
					text: "在 GitHub 上编辑此页面",
				},
				lastUpdated: {
					text: "最后更新于",
				},
				docFooter: {
					prev: "上一页",
					next: "下一页",
				},
				darkModeSwitchTitle: "切换到深色模式",
				lightModeSwitchTitle: "切换到浅色模式",
				sidebarMenuLabel: "菜单",
				returnToTopLabel: "回到顶部",
				darkModeSwitchLabel: "外观",
			},
		},
		"zh-hant": {
			label: "繁體中文",
			lang: "zh-Hant",
			link: "/zh-hant/",
			title: "Juice Server Docs",
			description: "Juice Server 文件",
			themeConfig: {
				nav: [{ text: "首頁", link: "/zh-hant/" }],
				sidebar: zhHantSidebar,
				outline: {
					label: "本頁目錄",
				},
				search: {
					provider: "local",
					options: {
						translations: {
							button: {
								buttonText: "搜尋",
								buttonAriaLabel: "搜尋",
							},
							modal: {
								displayDetails: "顯示詳細清單",
								resetButtonTitle: "重設",
								backButtonTitle: "返回",
								noResultsText: "找不到相關結果",
								footer: {
									selectText: "選擇",
									selectKeyAriaLabel: "空白鍵",
									navigateText: "切換",
									navigateUpKeyAriaLabel: "上箭頭",
									navigateDownKeyAriaLabel: "下箭頭",
									closeText: "關閉",
									closeKeyAriaLabel: "esc",
								},
							},
						},
					},
				},
				editLink: {
					pattern:
						"https://github.com/Zel9278/docs.mk-juice.dev/edit/main/docs/:path",
					text: "在 GitHub 上編輯此頁面",
				},
				lastUpdated: {
					text: "最後更新於",
				},
				docFooter: {
					prev: "上一頁",
					next: "下一頁",
				},
				darkModeSwitchTitle: "切換到深色模式",
				lightModeSwitchTitle: "切換到淺色模式",
				sidebarMenuLabel: "選單",
				returnToTopLabel: "回到頂端",
				darkModeSwitchLabel: "外觀",
			},
		},
	},
}));
