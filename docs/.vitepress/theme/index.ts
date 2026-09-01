// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./style.css";

export default {
	extends: DefaultTheme,
	Layout: () => {
		return h(DefaultTheme.Layout, null, {
			"doc-footer-before": () =>
				h(
					"p",
					{
						style:
							"margin-top: 16px; font-size: 14px; color: var(--vp-c-text-2);",
					},
					[
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
