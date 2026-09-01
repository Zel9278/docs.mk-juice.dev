import { defineConfig } from "vitepress";
import markdownItFootnote from "markdown-it-footnote";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	cacheDir: "../.cache",
	outDir: "../dist",
	title: "Juice Server Docs",
	description: "Juice Server ドキュメント",
	lang: "ja",
	cleanUrls: true,
	lastUpdated: true,
	markdown: {
		config: (md) => {
			md.use(markdownItFootnote);
		},
		container: {
			tipLabel: "備考",
			warningLabel: "注意",
			dangerLabel: "警告",
		},
	},
	themeConfig: {
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
		outline: {
			level: "deep",
			label: "目次",
		},
		nav: [{ text: "ホーム", link: "/" }],
		sidebar: [
			{ text: "このサーバーの運用方針について", link: "/about-juice-server" },
			{
				text: "サービス",
				items: [
					{ text: "ルール", link: "/service/rules" },
					{ text: "利用規約", link: "/service/tos" },
					{ text: "プライバシーポリシー", link: "/service/privacy_policy" },
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
					{ text: "LaTeX(数式)表示", link: "/juice/latex" },
				],
			},
		],
		socialLinks: [
			{ icon: "github", link: "https://github.com/Zel9278/misskey-juice" },
		],
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
});
