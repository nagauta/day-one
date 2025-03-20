# Next.js X react.csv

[CSVLink generating HTML instead of CSV in `react-csv` npm package](https://stackoverflow.com/questions/70737648/csvlink-generating-html-instead-of-csv-in-react-csv-npm-package)の問題の調査をするためのreposです


[公式のQ&A](https://nextjs.org/docs/messages/react-hydration-error)を参照するとヒントがあります
    
- solution-oneではclientでの描画のみにすることで暫定的に回避しています
- solution-twoではSSRを無効化することで暫定的に回避しています
- solution-threeではSSRを無効化することで暫定的に回避しています
- solution-fourでは警告をあえて抑制しています。これは頻発に使うのは避けた方が良さそうです。
- solution-fiverでは警告をあえて抑制しています。これは頻発に使うのは避けた方が良さそうです。
