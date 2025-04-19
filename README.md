# Obsidian Plugin: Equalize Panes
👉 [日本語のREADMEはこちら](README.ja.md)

![badge](https://img.shields.io/badge/status-active-brightgreen)

A simple but handy plugin for [Obsidian](https://obsidian.md) that allows users to **equalize the width of all open panes**. Ideal for focused, organized workflows.

---

## ✨ Features

- 🟰 **Equalize All Panes**: Set all open panes to the same width.
- ♻️ **Restore Previous Widths**: Undo the equalization and restore each pane to its previous width.
- ⚙️ **Status Bar Button**: One-click access from the Obsidian status bar.
- 🌍 **Multilingual Support**: Automatically switches between English and Japanese based on your Obsidian UI language.

---

## 📦 Installation

### Manual Installation
1. Download the latest release from [GitHub Releases](https://github.com/aihubxstudio/equalize-panes/releases).
2. Extract the folder into your `.obsidian/plugins` directory.
3. Reload Obsidian and enable the plugin in Settings > Community Plugins.

> ℹ️ **Note**: The plugin includes `main.js`, `manifest.json`, and an optional `styles.css`. Be sure all are present in the plugin folder.

---

## 🚀 Usage

You can access the commands via:
- The Command Palette (`Ctrl+P` / `Cmd+P`)  
- The Status Bar button (🟰)

### Available Commands:

| Command Name                           | Description                                 |
|----------------------------------------|---------------------------------------------|
| `Equalize Pane Widths`                | Makes all panes equal width                |
| `Restore Previous Pane Widths`        | Returns panes to their original width      |

---

## 🈺 Language Support
This plugin supports the following languages:

- English (default)
- Japanese (based on Obsidian UI language setting)

---

## 🛠 Developer Notes

### How It Works:
- Reads `workspace.rootSplit.children` to get visible panes.
- Applies `element.style.flex = "0 0 XX%"` to each pane.
- Stores previous widths in memory to allow restoring.

### Localization
See the `i18n` object inside the code for the full translatable string list. Uses `localStorage.getItem("language")` to detect UI locale.

---

## 📄 License
[MIT License](LICENSE)

---

## 💬 Feedback & Contribution

Pull requests, feature requests, and bug reports are welcome via [GitHub Issues](https://github.com/aihubxstudio/equalize-panes/issues).

If you find this plugin useful, give it a ⭐ on GitHub or share it with the Obsidian community!

---

Happy pane-managing! ✨

