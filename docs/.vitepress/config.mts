import { defineConfig } from "vitepress";
import markdownItFootnote from "markdown-it-footnote";

const jaSidebar = [
	{ text: "このサーバーの運用方針について", link: "/about-juice-server" },
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
		text: "About this server's operating policy",
		link: "/en/about-juice-server",
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

// https://vitepress.dev/reference/site-config
export default defineConfig({
	cacheDir: "../.cache",
	outDir: "../dist",
	head: [
		["link", { rel: "icon", type: "image/png", href: "/juice-icon.png" }],
	],
	cleanUrls: true,
	lastUpdated: true,
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
	},
});
