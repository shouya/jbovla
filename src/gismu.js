import { escape, format_terbri } from './util.js';

function zbasu(vlaste, jalge) {
  for (var valsi of vlaste.liste()) {
    if (!["gismu", "experimental gismu"].includes(valsi.klesi)) {
      continue;
    }
    let selkemyvlaste = cupra(valsi);
    jalge.jmina(selkemyvlaste);
  }
}

function cleanse_smuni(smuni) {
  if (!smuni) {
    return null;
  }

  smuni = escape(smuni);

  // remove unnecessary prefix
  smuni = smuni.replaceAll(/^(adjective:) /g, '');

  // format sumti places
  smuni = format_terbri(smuni);

  // split by newlines
  smuni = smuni.split('\n')
    .map(x => `<p>${x}</p>`)
    .join('');

  return smuni;
}

function extract_rafsi(rafsi) {
  const result = rafsi
        .map(x => `<span class="rafsi">${x}</span>`)
        .join('');
  if (!result) {
    return null;
  }
  return `<div class="rafsi-list">${result}</div>`;
}

function cleanse_pinka(pinka) {
  if (!pinka) {
    return null;
  }
  return `<p class="note">${escape(pinka)}</p>`;
}

function make_heading(valsi) {
  var {cmene, klesi} = valsi;

  if (klesi.includes('experimental')) {
    cmene += '<span class="experimental-mark"></span>';
  }

  return `<h1>${cmene}</h1>`;
}

function produce_body(valsi) {
  var {smuni, rafsi, cmene, pinka} = valsi;

  return [
    make_heading(valsi),
    extract_rafsi(rafsi),
    cleanse_smuni(smuni),
    cleanse_pinka(pinka),
    etymology(cmene)
  ].filter(x => !!x).join('\n');
}

const ETYMOLOGY_LANGUAGES = ["zh", "hi", "en", "es", "ru"];

function etymology(word) {
  for (const lang of ETYMOLOGY_LANGUAGES) {
    if (typeof window.etymology == 'undefined' ||
        typeof window.etymology[lang] == 'undefined') {
      load_etymology(lang);
    }
  }

  const result = ["zh", "hi", "en", "es", "ru"]
    .map(lang => {
      const source = window.etymology[lang][word];
      if (source) {
        return `<li class="etymology-${lang}">${source}</li>`;
      } else {
        return null;
      }
    })
    .filter(x => !!x)
    .join('');

  if (!result) {
    return null;
  }

  return `<ul class="etymology">${result}</ul>`;
}

function load_etymology(lang) {
  const data_file = `assets/etymology/${lang}/lojban-source-words_${lang}.txt`;
  if (typeof window.etymology == 'undefined') {
    window.etymology = {};
  }
  window.etymology[lang] = {};

  Deno.readTextFileSync(data_file)
    .split('\n')
    .map(line => line.split('\t'))
    .forEach(fields => {
      const name = fields[0];
      const origin = fields[3];
      window.etymology[lang][name] = origin;
    });
}

function cupra(valsi) {
  return {
    cmene: valsi.cmene,
    indice: [
      valsi.cmene
    ],
    xadni: produce_body(valsi)
  };
}


export default { zbasu };
