import { Plugin, Notice } from "obsidian";

const i18n = {
  en: {
    noticeEqual: "Panes equalized.",
    noticeRestored: "Pane widths restored.",
    errorTooFew: "At least 2 panes must be open.",
    errorNotFound: "No panes found.",
    statusEqualized: "🟰 Equalize",
    noticeNoPrevious: "No record of the previous pane width.",
  },
  ja: {
    noticeEqual: "各ペインを均等に設定しました。",
    noticeRestored: "ペイン幅を元に戻しました。",
    errorTooFew: "2つ以上のペインが開いている必要があります。",
    errorNotFound: "ペインが検出できませんでした。",
    statusEqualized: "🟰 ペイン均等",
    noticeNoPrevious: "前のペイン幅の記録がありません。",
  }
};
type Lang = keyof typeof i18n;
type I18nKey = keyof typeof i18n["en"];

const t = (key: I18nKey): string => {
  const lang = (localStorage.getItem("language") as Lang) || "en";
  return i18n[lang] && key in i18n[lang]
    ? i18n[lang][key]
    : i18n["en"][key];
};

export default class EqualizePaneWidthPlugin extends Plugin {
  private statusBarItemEl: HTMLElement | null = null;
  private previousWidths: Map<HTMLElement, string> = new Map();


  onload() {
    this.addCommand({
      id: "equalize-pane-widths",
      name: "Equalize Pane Widths / 均等にペイン幅をそろえる",
      callback: () => this.equalizePanes()
    });

    // ステータスバーアイテム追加
    this.statusBarItemEl = this.addStatusBarItem();
    this.statusBarItemEl.setText(t("statusEqualized"));
    this.statusBarItemEl.style.cursor = "pointer";
    this.statusBarItemEl.onclick = () => {
      this.equalizePanes();
    };

    this.registerEvent(
      this.app.workspace.on("layout-change", () => {
        this.equalizePanes();
      })
    );
    
    this.addCommand({
      id: "restore-pane-widths",
      name: "Restore Previous Pane Widths / ペイン幅を元に戻す",
      callback: () => this.restorePreviousWidths()
    });
    
  }

  onunload() {
    if (this.statusBarItemEl) {
      this.statusBarItemEl.remove();
      this.statusBarItemEl = null;
    }
  }
  

  equalizePanes() {
    const root = this.app.workspace.rootSplit as any;
    if (!root) {
      new Notice(t("errorNotFound"));
      return;
    }

    const children = root.children;
    const count = children.length;

    if (count < 2) {
      new Notice(t("errorTooFew"));
      return;
    }

    const width = 100 / count;
    
    this.previousWidths.clear(); // リセット
    
    children.forEach((pane: any) => {
      const el = pane.containerEl;
      this.previousWidths.set(el, el.style.flex); // 元の幅を保存
    });

    children.forEach((pane: any) => {
      const el = pane.containerEl;
      el.style.flex = `0 0 ${width}%`;
    });

    new Notice(`${t("noticeEqual")} ${width.toFixed(2)}%`);
  }

  restorePreviousWidths() {
    if (this.previousWidths.size === 0) {
      new Notice(t("noticeNoPrevious"));
      return;
    }
  
    const root = this.app.workspace.rootSplit as any;
    if (!root) return;
  
    const children = root.children;
  
    children.forEach((pane: any) => {
      const el = pane.containerEl;
      const prev = this.previousWidths.get(el);
      if (prev) {
        el.style.flex = prev;
      }
    });
  
    new Notice(t("noticeRestored"));
  }
  
}
