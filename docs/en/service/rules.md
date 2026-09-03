---
prev:
  text: "Juice Server Docs"
  link: "/en/index"
---

# Rules

## Introduction

**Please follow the [Terms of Service](./tos.md) and the laws of Japan.**

If we find posts or other content that violate the rules or Terms of Service below, we will "delete the post" or "add an [NSFW flag](https://misskey-hub.net/en/docs/for-users/resources/glossary/#nsfw) to the file in question", and **depending on the severity, we may also silence or [suspend](https://misskey-hub.net/en/docs/for-users/resources/glossary/#suspension) the account.**

## Rules

::: info Summary

- **You must:**
  - **Follow the Terms of Service, these Rules, the laws of Japan, and what is generally considered "common sense".**
- **We recommend:**
  - Setting up self-defense measures.
  - Always setting the AI-generated content flag when posting AI-generated content.
- **Posts/actions that fall under the following will result in account suspension and removal of the content:**
  - **Use of this service by anyone under 13 years old.**
  - Defamatory or hateful posts, or other violent behavior.
  - Infringing on the intellectual property rights of others.
  - Sending content (images, text, or audio) that violates the law.
    - Posting NSFW images without "Content Warning (CW)" and the "sensitive" flag set.
    - Posting NSFW text without "Content Warning (CW)" set.
  - Renoting NSFW-related content without "Content Warning (CW)" set.
  - [Encouraging or assisting prohibited acts.](./rules.md#prohibited-acts)

::: warning Warning
This summary only covers part of these Rules, and other rules not listed here also apply.\
**Please make sure to read the entire document.**
:::

### Notes

**This instance generally recommends that "if you dislike something, avoid it yourself".**\
For this reason, **["telling others what to do"](./rules.md#regarding-self-governing-behavior) is prohibited.** For example, this includes statements such as "I really dislike this topic, so please don't talk about it on the timeline."

#### Recommendations

- Setting CW on notes that include the following:
  - Political or religious topics, or notes that contain words related to them.
    - **If discussed as "part of a creative work", CW is not required — but you must clearly state that it is a "creative work".**

- Setting up self-defense measures
  - We recommend setting up self-defense measures in advance, such as [muting words/hashtags you dislike](https://misskey-hub.net/en/docs/for-users/features/word-mute/) or [muting/blocking users](https://misskey-hub.net/en/docs/for-users/features/mute-and-block/).

- Setting the AI-generated content flag when posting AI-generated content
  - This service has a dedicated flag that indicates a post is AI-generated. When posting AI-generated images, audio, etc., please always set this flag.
  - Posts later found to be AI-generated without this flag set may have the post removed or the account subjected to further action.

#### Prohibited acts

- Statements that violate the laws of Japan or generally observed rules on the internet
  - This also includes what is generally considered "common sense".
- Defamatory or other violent statements/behavior
  - This includes making threats of crime, or inciting/soliciting others to commit crimes.
  - This includes making threats of suicide, or inciting/soliciting others to commit suicide.
- Statements/behavior that harm or may harm others
  - Example: spreading malware or malicious disinformation
- Recruiting others into political or religious activities
  - **This also includes advertising or preaching such ideologies.**
- Any kind of hate speech or harassment
  - This includes **defaming or discriminating against individuals or groups based on characteristics such as race, nationality, ideology, gender, disability, occupation, or appearance**, as well as inciting others to such behavior[^1].
- Using emoji outside their intended use, regardless of malicious intent
  - Example: recreating expressions that violate public order and morals, or that are otherwise generally avoided
  - This also includes such use via [MFM decoration](https://misskey-hub.net/en/docs/for-users/resources/glossary/#mfm).
- Statements related to illegal or specifically regulated goods, services, or groups
  - **If discussed as "part of a creative work", you must clearly state that it is a "creative work".**
- Infringing on others' [intellectual property rights](https://laws.e-gov.go.jp/document?lawid=414AC0000000122), rights of honor, privacy, personal rights, or portrait rights
  - This includes publishing others' personal information.
- Excessive self-governing behavior
  - Example: forcing others to take certain actions
  - "Discussion" is not prohibited, but please use the messaging feature for that.
- Spam
  - Example: repeatedly posting the same message, posting many URL-only notes, etc.
- Evading punishment
  - Please wait for the punishment to be lifted, or file an objection with the admin.
- Impersonating others
- Encouraging or assisting prohibited acts
- **Posting AI-generated content without setting the AI-generated content flag**
- Any other statement/behavior the admin deems inappropriate

### Posting inappropriate files is prohibited

The following files may not be posted:

- Sexual real-life photos
- Violent real-life photos
- Files containing [NSFW elements](./rules.md#regarding-nsfw-not-safe-for-work) **without "sensitive" and "content warning" set**
- Files that harm others (e.g. malware)
- Others' work reproduced without permission (e.g. unauthorized reposting)\
  Only the copyright holder has the right to reproduce/copy a work (Copyright Act, Article 21)
  - **Quotation done in accordance with certain rules, such as making the source clear, is fine ([Copyright Act, Article 32, Paragraph 1](https://laws.e-gov.go.jp/law/345AC0000000048#Mp-Ch_2-Se_3-Ss_5-At_32), including linking to the source, etc.)**
- Any other file the admin deems inappropriate

::: warning Notice
**Real-life sexual or violent images involving children under 18 will result in immediate removal of the note and account suspension upon confirmation. We will also report to the relevant authorities and providers as necessary.**
:::

These rules apply equally to content sent via "Messages".

### Regarding [NSFW (Not Safe for Work)](https://misskey-hub.net/en/docs/for-users/resources/glossary/#nsfw)

> [What is NSFW (source: Wikipedia, bold added by us)](https://en.wikipedia.org/wiki/Not_safe_for_work)\
> **Not safe for work (NSFW)** is an internet slang term used, often as a warning, to mark URLs or hyperlinks to content, videos, or website that the viewer may not wish to be seen accessing in a formal or professional environment, due to the presence of nudity, pornography, profanity, or violence.

#### Criteria for NSFW

- Content with a large amount of exposed skin
- Content exposing "private areas" (areas that would be covered by swimwear)
- Content unsuitable for viewing in public spaces such as workplaces or trains
- Content depicting bodily fluids other than tears and sweat[^2]
- Content drawn with sexual intent
- Content containing gore[^3]

::: warning Warning
For everyone's mutual protection, please always set **"sensitive" and "content warning"** when posting such content.\
Also, **please describe the summary of the file marked "sensitive" and the attributes it contains (e.g. NSFW, R-18) in the "caption" field.**

If "sensitive" and "content warning" are not set, the note may be removed or the account suspended within 3 days. Please be careful.

Responsibility for NSFW rule violations lies not with the **"minor who happened to see it"**, but with **"the poster who showed it."** \
While we do encourage "self-defense from things you dislike," please also understand that **the poster may be held responsible under law/rules regardless.**
:::

### Notes for bot developers

Bots with the following features must not be operated on this service:

- Bots that repost others' content without permission (crediting the source does not exempt this)
- Bots with features that place a load on the server
- Bots with features that harm others
- Bots with any other feature the admin deems inappropriate

#### Regarding self-governing behavior

::: warning Warning
**Please refrain from this under any circumstances.**\
If you encounter someone causing trouble, do not respond directly — instead, contact the admin ([@c30](https://mk-juice.dev/@c30)) via a Misskey message, following the process above.
:::

### If you have questions or requests

Please contact the admin ([@c30](https://mk-juice.dev/@c30)) via a Misskey message.

[^1]: This includes riding on the coattails of an opinion within the range of "impression" to defame or discredit a specific individual, group, race, etc., or to twist the original speaker's opinion.

[^2]: Sweat that appears sexual in context is judged as NSFW.

[^3]: Refers to violent (grotesque) depictions such as bleeding, dismemberment, insects, etc.
