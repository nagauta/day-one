# CSVテンプレートダウンロード機能

このプロジェクトでは、`react-csv`パッケージを使用したCSVテンプレートのダウンロード機能実装における問題と解決策を示しています。

## 解決した問題

WebアプリケーションからCSVテンプレートをダウンロードする機能を実装する際に発生した以下の問題に対処しています：

1. 日本語を含むCSVファイルのエンコード問題
2. ブラウザによって動作が異なる問題
3. 空のテンプレートをダウンロードする際のフォーマットの扱い

## 実装方法

このデモでは、`react-csv`パッケージを使用して空のCSVテンプレートをダウンロードできる機能を実装しています。

```tsx
import { CSVLink } from "react-csv";

// ヘッダーとデータの定義
const headers = [
  { label: "名前", key: "name" },
  { label: "年齢", key: "age" },
  // ...
];

const emptyTemplateData = [
  { name: "", age: "", /* ... */ }
];

// CSVLinkコンポーネントの使用
<CSVLink
  data={emptyTemplateData}
  headers={headers}
  filename="template.csv"
  className={styles.primary}
  target="_blank"
>
  テンプレートをダウンロード
</CSVLink>
```

## 解決策のポイント

- `CSVLink`コンポーネントを使用することで、ブラウザ間の互換性問題を解決
- 日本語を含むCSVを正しく扱うためのエンコード設定
- 空のテンプレートも正しいフォーマットでダウンロードできるように実装

## 動作確認方法

```bash
# 開発サーバーの起動
pnpm dev
```

http://localhost:3000 にアクセスし、「テンプレートをダウンロード」ボタンをクリックしてCSVファイルをダウンロードできます。

## 参考リソース

- [react-csvパッケージ](https://github.com/react-csv/react-csv)
- [CSVファイルの文字コードについて](https://www.iana.org/assignments/character-sets/character-sets.xhtml)
