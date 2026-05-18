# 彩の国 100mile Race Visualizer

第11回トレニックワールド100mile in 彩の国の記録を、FUJI VISUALIZER風に再生できる静的ビジュアライザーです。

## Features

- 公式GPXを300m刻みで再サンプリングした累積標高図
- North / South1 / South2 の区間表示
- K-SOKの選手別詳細ページから取得したエイド通過タイムによる選手位置補間
- 上位20、女子完走者、完走者全員、DNF全員、全員の表示切り替え
- Vercel Web Analytics script included

## Local Preview

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173/`.

## Data Refresh

```bash
node build-splits-data.js
```

This regenerates `data.js` from K-SOK runner detail pages.
