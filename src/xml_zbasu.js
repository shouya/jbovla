import gismu from "./gismu.js";
import cmavo from "./cmavo.js";
import {Vlaste} from "./util.js";

import { Element } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

class VlasteJalge {
  constructor() {
    this.entries = [];
  }

  jmina(word) {
    this.entries.push(word);
  }

  liste() {
    return this.entries;
  }

  zbasu_cmima(entry) {
    var title = entry.cmene;
    var entry_tag = `<d:entry id="${title}" d:title="${title}">\n`;

    for (var index of entry.indice) {
      entry_tag += `<d:index d:value="${index}" d:title="${title}" />\n`;
    }

    entry_tag += entry.xadni + '\n';
    entry_tag += '</d:entry>';

    return entry_tag;
  }

  zbasu_xml() {
    var output ='<?xml version="1.0" encoding="UTF-8"?>\n';
    output += '<d:dictionary xmlns="http://www.w3.org/1999/xhtml" xmlns:d="http://www.apple.com/DTDs/DictionaryService-1.0.rng">\n';
    for (var entry of this.entries) {
      output += this.zbasu_cmima(entry);
      output += '\n';
    }
    output += '</d:dictionary>\n';
    return output;
  }
}

function zbasu() {
  var jalge = new VlasteJalge();

  gismu.zbasu(jalge);
  cmavo.zbasu(jalge);

  console.log(jalge.zbasu_xml());
}

zbasu();
