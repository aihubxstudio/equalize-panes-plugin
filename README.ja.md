# Obsidian プラグイン: Equalize Panes

![badge](https://img.shields.io/badge/status-active-brightgreen)

[Obsidian](https://obsidian.md) 用のシンプルで便利なプラグイン。**開いているすべてのペインの幅を均等に揃える**ことができます。集中した作業や整理されたレイアウトに最適です。

---

## ✨ 機能

- 🟰 **すべてのペインを均等に**：開いているすべてのペインの幅を自動で均等化します。
- ♻️ **元のペイン幅に戻す**：均等化前のペイン幅を記憶し、いつでも元に戻せます。
- ⚙️ **ステータスバーから実行**：ステータスバーのボタン（🟰）でワンクリック実行可能。
- 🌍 **多言語対応**：Obsidian の言語設定に応じて、英語・日本語で自動切り替えされます。

---

## 📦 インストール方法

### 手動インストール
1. [GitHub リリースページ](https://github.com/aihubxstudio/equalize-panes-plugin/releases)から最新版をダウンロード。
2. 解凍して `.obsidian/plugins` フォルダに配置。
3. Obsidian の「設定 > コミュニティプラグイン」で有効化。

> ✅ 必須ファイル：`main.js`, `manifest.json`（必要に応じて `styles.css`）

---

## 🚀 使い方

### コマンドパレット
- `Equalize Pane Widths`：すべてのペインを均等化
- `Restore Previous Pane Widths`：均等化前の状態に戻す

### ステータスバー
- 右下のボタン（🟰）からワンクリックで実行

---

## 🈺 言語サポート
- 🇬🇧 英語（デフォルト）
- 🇯🇵 日本語（ObsidianのUIが日本語のときに自動適用）

---

## 🔧 開発者向けメモ

- `workspace.rootSplit.children` を読み取り、表示中ペインを検出
- 各ペインに `element.style.flex = "0 0 XX%"` を適用して幅調整
- 元のペイン幅を記憶して `restore` 可能

### 多言語対応について
- `i18n` オブジェクトで翻訳キーを管理
- `localStorage.getItem("language")` により現在の言語を自動検出

---

## 📄 ライセンス
[MIT License](LICENSE)

---

## 💬 フィードバック・貢献

バグ報告・機能リクエスト・プルリクはいつでも歓迎しています。
[GitHub Issues](https://github.com/aihubxstudio/equalize-panes/issues) までどうぞ！

もしこのプラグインが役に立ったら、GitHub で ⭐ をつけていただけると嬉しいです！

---

快適なペイン操作をお楽しみください！🪟✨

