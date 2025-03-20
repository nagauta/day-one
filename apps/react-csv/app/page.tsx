"use client";
import { CSVLink } from "react-csv";
import styles from "./page.module.css";

// テンプレートCSVデータの定義
const headers = [
  { label: "名前", key: "name" },
  { label: "年齢", key: "age" },
  { label: "メールアドレス", key: "email" },
  { label: "住所", key: "address" }
];

// 空のテンプレートCSVデータ
const emptyTemplateData = [
  { name: "", age: "", email: "", address: "" }
];

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>CSVテンプレートダウンロードデモ</h1>
        
        <div className={styles.description}>
          <p>このデモでは、CSVテンプレートをダウンロードすることができます。</p>
        </div>

        <div className={styles.ctas}>
          <CSVLink
            data={emptyTemplateData}
            headers={headers}
            filename="template.csv"
            className={styles.primary}
            target="_blank"
          >
            テンプレートをダウンロード
          </CSVLink>
        </div>
        
        <div className={styles.infoBox}>
          <h2>使い方</h2>
          <ol>
            <li>「テンプレートをダウンロード」ボタンをクリックすると、入力用の空のCSVテンプレートがダウンロードされます。</li>
            <li>ダウンロードしたCSVファイルはExcelやGoogle Spreadsheetsなどで編集できます。</li>
          </ol>
        </div>
      </main>
      <footer className={styles.footer}>
        <p>CSVテンプレートダウンロードデモ © 2024</p>
      </footer>
    </div>
  );
}
