export class Vlaste {
  static init() {
    window.vlaste = new Vlaste("assets/vlacku.dict");
  }

  static instance() {
    if (!!window.vlaste) {
      return window.vlaste;
    } else {
      this.init();
      return window.vlaste;
    }
  }

  constructor(sfaile) {
    this.entries = JSON.parse(Deno.readTextFileSync(sfaile));
    window.vlaste = this;
  }

  liste() {
    return this.entries;
  }
}

export function escape(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function format_terbri(text) {
  const terbri_regex = /\$([a-z]+)_\{(\d+)\}\$/g;
  const terbri_regex2 = /\$([a-z]+)_(\d+)\$/g;
  const basti = "<span class=\"terbri\">$1<sub>$2</sub></span>";
  return text.replaceAll(terbri_regex, basti)
    .replaceAll(terbri_regex2, basti);
}
