import { Plugin, Notice, WorkspaceLeaf } from "obsidian";

const i18n = {
  en: {
    noticeEqual: "Panes equalized.",
    noticeRestored: "Pane widths restored.",
    errorTooFew: "At least 2 panes must be open.",
    errorNotFound: "No panes found.",
    statusEqualized: " Equalize",
    noticeNoPrevious: "No record of the previous pane width.",
  },
  ja: {
    noticeEqual: "各ペインを均等に設定しました。",
    noticeRestored: "ペイン幅を元に戻しました。",
    errorTooFew: "2つ以上のペインが開いている必要があります。",
    errorNotFound: "ペインが検出できませんでした。",
    statusEqualized: " ペイン均等",
    noticeNoPrevious: "前のペイン幅の記録がありません。",
  }
};

type Lang = keyof typeof i18n;
type I18nKey = keyof typeof i18n["en"];
const t = (key: I18nKey): string => {
  const lang = (localStorage.getItem("language") as Lang) || "en";
  return i18n[lang]?.[key] ?? i18n["en"][key];
};

// Split ビューの子要素として扱う最低限のインターフェイス
interface PaneWithContainer {
  containerEl: HTMLElement;
}
interface SplitView {
  children: PaneWithContainer[];
}

export default class EqualizePaneWidthPlugin extends Plugin {
  private statusBarItemEl: HTMLElement | null = null;
  private previousWidths = new Map<HTMLElement, string>();

  onload() {
    this.addCommand({
      id: "equalize-pane-widths",
      name: "Equalize Panes / 均等にペイン幅をそろえる",
      callback: () => this.equalizePanes()
    });

    this.statusBarItemEl = this.addStatusBarItem();
    this.statusBarItemEl.setText(t("statusEqualized"));
    this.statusBarItemEl.style.cursor = "pointer";
    this.statusBarItemEl.onclick = () => this.equalizePanes();

    this.registerEvent(
      this.app.workspace.on("layout-change", () => this.equalizePanes())
    );

    this.addCommand({
      id: "restore-pane-widths",
      name: "Restore Previous Pane Widths / ペイン幅を元に戻す",
      callback: () => this.restorePreviousWidths()
    });
  }

  onunload() {
    this.statusBarItemEl?.remove();
    this.statusBarItemEl = null;
  }

  equalizePanes() {
    // 明示的に型キャストして any を排除
    const root = this.app.workspace.rootSplit as unknown as SplitView | null;
    if (!root) {
      new Notice(t("errorNotFound"));
      return;
    }

    const children = root.children;
    if (children.length < 2) {
      new Notice(t("errorTooFew"));
      return;
    }

    const width = 100 / children.length;
    this.previousWidths.clear();
    // 元の flex スタイルを保存
    children.forEach(pane => {
      const el = pane.containerEl;
      this.previousWidths.set(el, el.style.flex);
    });
    // 均等化
    children.forEach(pane => {
      pane.containerEl.style.flex = `0 0 ${width}%`;
    });

    new Notice(`${t("noticeEqual")} ${width.toFixed(2)}%`);
  }

  restorePreviousWidths() {
    if (this.previousWidths.size === 0) {
      new Notice(t("noticeNoPrevious"));
      return;
    }

    const root = this.app.workspace.rootSplit as unknown as SplitView | null;
    if (!root) {
      new Notice(t("errorNotFound"));
      return;
    }

    root.children.forEach(pane => {
      const el = pane.containerEl;
      const prev = this.previousWidths.get(el);
      if (prev) el.style.flex = prev;
    });

    new Notice(t("noticeRestored"));
  }
}
