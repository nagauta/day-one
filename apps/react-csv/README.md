# Next.js X react.csv

[English](#english) | [日本語](#japanese)

<a id="english"></a>
# Next.js X react.csv

This repository is for investigating the issue described in [CSVLink generating HTML instead of CSV in `react-csv` npm package](https://stackoverflow.com/questions/70737648/csvlink-generating-html-instead-of-csv-in-react-csv-npm-package).

Hints can be found in the [official Q&A](https://nextjs.org/docs/messages/react-hydration-error):

- solution-one: temporarily avoids the issue by rendering only on the client side
- solution-two: temporarily avoids the issue by disabling SSR
- solution-three: significantly reduced this warning, so it's best to avoid using it too frequently.
---

<a id="japanese"></a>
# Next.js X react.csv

[CSVLink generating HTML instead of CSV in `react-csv` npm package](https://stackoverflow.com/questions/70737648/csvlink-generating-html-instead-of-csv-in-react-csv-npm-package)の問題の調査をするためのreposです


[公式のQ&A](https://nextjs.org/docs/messages/react-hydration-error)を参照するとヒントがあります
    
- solution-oneではclientでの描画のみにすることで暫定的に回避しています
- solution-twoではSSRを無効化することで暫定的に回避しています
- solution-threeでは警告をあえて抑制しています。これは頻発に使うのは避けた方が良さそうです。

