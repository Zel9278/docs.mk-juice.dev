// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { useData } from "vitepress";
import "./style.css";

export default {
	extends: DefaultTheme,
	Layout: () => {
		const { lang } = useData();
		return h(DefaultTheme.Layout, null, {
			"doc-footer-before": () =>
				h(
					"p",
					{
						style:
							"margin-top: 16px; font-size: 14px; color: var(--vp-c-text-2);",
					},
					lang.value === "en"
						? [
								"This documentation accepts issues and PRs. If something looks off, feel free to check out the ",
								h(
									"a",
									{
										href: "https://github.com/Zel9278/docs.mk-juice.dev",
										target: "_blank",
									},
									"GitHub repository",
								),
								".",
							]
						: [
								"このドキュメントはIssue / PRを受け付けています。気になった点があれば、",
								h(
									"a",
									{
										href: "https://github.com/Zel9278/docs.mk-juice.dev",
										target: "_blank",
									},
									"GitHubリポジトリ",
								),
								" までお気軽にどうぞ。",
							],
				),
		});
	},
} satisfies Theme;
