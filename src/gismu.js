function zbasu(vlaste, jalge) {
  for (var valsi of vlaste.liste()) {
    if (valsi.klesi != "gismu") {
      continue;
    }
    let selkemyvlaste = cupra(valsi);
    jalge.jmina(selkemyvlaste);
  }
}

function cleanse_smuni(smuni) {
  // remove unnecessary prefix
  smuni = smuni.replace(/^(adjective:) /, '');

  // recognize sumti places
  const terbri_regex = /\$([a-z]+)_\{(\d+)\}\$/g;
  const terbri_regex2 = /\$([a-z]+)_(\d+)\$/g;
  const basti = "<span class=\"terbri\">$1<sub>$2</sub></span>";
  smuni = smuni
    .replaceAll(terbri_regex, basti)
    .replaceAll(terbri_regex2, basti);

  return smuni;
}

function extract_rafsi(rafsi) {
  const result = rafsi
    .map(x => `<span class="rafsi">${x}</span>`)
        .join('');
  return `<span class="rafsi-list">${result}</span>`;
}

function cleanse_pinka(pinka) {
  return `<span class="note">${pinka}</span>`;
}

function produce_body(valsi) {
  var {smuni, rafsi, cmene, pinka} = valsi;

  return [
    cleanse_smuni(smuni),
    extract_rafsi(rafsi),
    cleanse_pinka(pinka),
    etymology(cmene)
  ].join('\n');
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
