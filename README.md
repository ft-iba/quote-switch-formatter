# Quote Switcher

JavaScript/JSON 形式のオブジェクトに対して、**キー・値のクォートスタイル**や**整形方法**を切り替えて表示できるツールで、コピー機能付きです。

## Github Pages
[https://ft-iba.github.io/quote-switch-formatter/](https://ft-iba.github.io/quote-switch-formatter/)

## 主な機能

- **キーのクォートスタイルの切り替え**
  - ダブルクォート `"key"`
  - シングルクォート `'key'`
  - クォートなし `key`（識別子として有効な場合）

- **値のクォートスタイルの切り替え**
  - ダブルクォート `"value"`
  - シングルクォート `'value'`

- **フォーマットの切り替え**
  - Pretty（インデント付き整形）
  - Compact（最小化）
  - Raw（元の入力そのまま）

- **リアルタイム変換プレビュー**
  - 入力に応じて即座に変換された内容が出力に反映されます

- **コピー機能**
  - ワンクリックで変換結果をクリップボードにコピー
  - コピー成功・失敗時にトースト表示でフィードバック

## セットアップ

### 環境

- Node.js 16以上
- [Vite](https://vitejs.dev/)

### インストール

```bash
npm install
```

### 開発
```bash
npm run dev
```