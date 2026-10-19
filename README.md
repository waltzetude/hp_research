# Researcher homepage

Astro + Markdown + 通常のCSSによる、研究者向けの静的サイトです。外部フォント・UIフレームワーク・データベースは使っていません。

## ローカル起動

Node.js 22.22以上（推奨24 LTS）とnpmを用意してください。

```sh
npm ci
npm run dev
```

表示されたURL（通常 http://localhost:4321）を開きます。

```sh
npm run check
npm run build
npm run preview
```

サンドボックス等でAstroの設定保存が制限される場合は、コマンドに `ASTRO_TELEMETRY_DISABLED=1` を付けて実行できます。

## 自分の情報に変更する

| 内容 | ファイル |
| --- | --- |
| 氏名・所属・メール・外部リンク・ページ説明 | `src/data/profile.ts` |
| 自己紹介 | `src/content/sections/about.md` |
| 近況 | `src/content/sections/news.md` |
| 研究紹介 | `src/content/sections/research.md` |
| 受賞歴・奨学金 | `src/content/sections/awards.md` |
| 学会発表 | `src/content/sections/conferences.md` |
| 学歴・経歴 | `src/content/sections/education.md` |
| 論文 | `src/content/publications/*.md` |
| 色・余白・文字サイズ | `src/styles/global.css` |
| ファビコン | `public/favicon.svg` |

本文はMarkdownで書けます。氏名・大学・研究・日付・論文はすべて記入例です。公開前に自分の情報に置き換えてください。メールはボタンをクリックしたときに表示されます。不要な研究テーマやNewsはMarkdownから削除できます。

### 論文の追加

`src/content/publications/` に論文ごとのMarkdownを追加します。年の新しい順で表示されます。

```markdown
---
title: 'Your paper title'
authors: 'Your Name, Coauthor Name'
venue: 'Conference / Journal'
year: 2026
sample: false
links:
  - label: Paper
    url: https://example.com/paper
  - label: Code
    url: https://github.com/your-account/your-repository
---
論文の概要をここに記載します。
```

URLは実際の論文やコードのURLに置き換えてください。`sample-paper.md` は削除できます。論文が0件なら準備中の案内を表示します。外部プロフィールも `profile.ts` の空URLを設定した項目だけ表示します。

### CVのPDF

`public/cv.pdf` を追加し、`profile.ts` の `cvFile` を `'cv.pdf'` に変更します。経歴欄にリンクが表示されます。

## GitHub Pagesで公開

1. GitHubにリポジトリを作成します。`username.github.io` または任意の名前が使えます。
2. このフォルダーのファイルを `main` ブランチへpushします（`node_modules` と `dist` は対象外）。
3. リポジトリの **Settings → Pages → Build and deployment → Source** を **GitHub Actions** に設定します。
4. **Actions** で `Deploy to GitHub Pages` の完了を確認します。pushで実行済みのジョブが失敗していた場合は再実行してください。

通常はリポジトリ情報から `site` と `base` を自動設定します。

- `username.github.io` → `https://username.github.io/`
- `my-research` → `https://username.github.io/my-research/`

手動でActionsを実行することもできます。既定ブランチが `main` 以外なら `.github/workflows/deploy.yml` を変更してください。

### 独自ドメイン

GitHub Pages側のCustom domain・DNSを設定し、リポジトリの **Settings → Secrets and variables → Actions → Variables** に次を追加します。

- `SITE_URL`: `https://your-domain.example`
- `BASE_PATH`: `/`

`astro.config.mjs` のフォールバック `https://example.com` はローカル確認用です。GitHub Actions以外で本番ビルドする場合は `SITE_URL` と必要なら `BASE_PATH` を設定してください。

デプロイ設定は [Astro公式ガイド](https://docs.astro.build/en/guides/deploy/github/) を参考にしています。このひな形を作成した時点では、GitHubへのpush・一般公開は行っていません。

## メールアドレスの収集対策

メールは `src/data/profile.ts` の `email` を編集します。生成HTMLには平文アドレスやmailtoリンクを載せず、符号化した値をクリック時にJavaScriptで復元します。キーボードでも操作できます。JavaScript無効時は案内を表示します。

これは単純なクローラーへの難読化であり、収集を完全に防ぐ仕組みではありません。JavaScriptを解析・実行するクローラーは復元できます。また、公開リポジトリのソースや過去のコミットに含まれるアドレスは、この対策では隠れません。

## 受賞歴・学会発表

受賞歴は `src/content/sections/awards.md` に新しい順で追記してください。
学会発表は `src/content/sections/conferences.md` の先頭の `presentations` に、発表ごとに項目を追加します。開催月の新しい順に自動表示されます。同月の場合は記載順を維持します。

```yaml
---
title: Conference Presentations
presentations:
  - title: '発表題目'
    authors:
      - 著者1
      - 著者2
    conference: '学会・研究会名'
    date: '2026.05'
    location: '会場（都市・国）'
    type: 口頭発表
    # url: https://example.com/presentation
---
```

`date` は引用符で囲んだ `YYYY.MM` 形式です。`type` は「口頭発表」「ポスター発表」「招待講演」「その他」から選びます。任意の `url` を指定すると発表題目がリンクになります。発表がない場合は `presentations: []` と記載してください。

## 所属先のリンク

`src/data/profile.ts` の `universityUrl` と `labUrl` で、所属と研究室名のリンク先を変更できます。空文字にすると通常のテキストになります。自己紹介本文のリンクは `src/content/sections/about.md` のMarkdownで変更できます。

### 発表の関連リンク

各発表の `links` に複数のリンクを記載できます。題目へのリンク（`url`）とは別に、Program・Paper・Slidesなどの名前で表示します。

```yaml
    links:
      - label: Program
        url: https://example.com/program
      - label: Paper
        url: https://example.com/paper
```

2026年10月19日に確認したリンク：

- Advanced Science論文：出版社ページで題目・著者・DOI `10.1002/advs.77407` の一致を確認。
- Blokus発表：GI58公式プログラムで題目とHinata Tokuda / Kotaro Ikedaの一致を確認。
- 第48回CHEMINAS研究会：公式アーカイブの開催年月・会場が一致する全体プログラムを追加。個別ポスターの題目・著者は確認できていません。
- G-RMSD発表：当該発表を確認できる公式プログラムが見つからなかったためリンク未設定。
