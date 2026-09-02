// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { useData } from "vitepress";
import "./style.css";

const footerText: Record<string, [string, string]> = {
	en: [
		"This documentation accepts issues and PRs. If something looks off, feel free to check out the ",
		".",
	],
	ko: [
		"이 문서는 Issue / PR을 받고 있습니다. 신경 쓰이는 부분이 있다면 ",
		"를 편하게 확인해 주세요.",
	],
	"zh-Hans": ["本文档接受 Issue / PR。如果发现问题，欢迎查看 ", "。"],
	"zh-Hant": ["本文件接受 Issue / PR。如果發現問題，歡迎查看 ", "。"],
};

const linkText: Record<string, string> = {
	en: "GitHub repository",
	ko: "GitHub 저장소",
	"zh-Hans": "GitHub 仓库",
	"zh-Hant": "GitHub 儲存庫",
};

const defaultFooter: [string, string] = [
	"このドキュメントはIssue / PRを受け付けています。気になった点があれば、",
	" までお気軽にどうぞ。",
];
const defaultLinkText = "GitHubリポジトリ";

export default {
	extends: DefaultTheme,
	Layout: () => {
		const { lang } = useData();
		const [before, after] = footerText[lang.value] ?? defaultFooter;
		const link = linkText[lang.value] ?? defaultLinkText;
		return h(DefaultTheme.Layout, null, {
			"doc-footer-before": () =>
				h(
					"p",
					{
						style:
							"margin-top: 16px; font-size: 14px; color: var(--vp-c-text-2);",
					},
					[
						before,
						h(
							"a",
							{
								href: "https://github.com/Zel9278/docs.mk-juice.dev",
								target: "_blank",
							},
							link,
						),
						after,
					],
				),
		});
	},
} satisfies Theme;
