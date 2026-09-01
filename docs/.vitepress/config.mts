import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	cacheDir: "../.cache",
	outDir: "../dist",
	title: "Juice Server Docs",
	description: "Juice Server ドキュメント",
	lang: "ja",
	cleanUrls: true,
	lastUpdated: true,
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
			{ text: "利用規約", link: "/tos" },
			{ text: "プライバシーポリシー", link: "/privacy_policy" },
		],
		socialLinks: [
			{ icon: "github", link: "https://github.com/Zel9278/misskey-juice" },
		],
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
