import { escape, format_terbri } from './util.js';

function zbasu(vlaste, jalge) {
  for (var valsi of vlaste.liste()) {
    if (!["cmavo", "experimental cmavo"].includes(valsi.klesi)) {
      continue;
    }
    let selkemyvlaste = cupra(valsi);
    if (!!selkemyvlaste) {
      jalge.jmina(selkemyvlaste);
    }
  }
}

function cleanse_smuni(smuni) {
  if (!smuni) {
    return null;
  }

  smuni = escape(smuni);

  // recognize sumti places
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

function make_selmaho(selmaho) {
  return `<div class="selmaho">${selmaho}</div>`;
}

function produce_body(valsi) {
  var {smuni, selmaho, cmene, pinka} = valsi;

  return [
    make_heading(valsi),
    make_selmaho(selmaho),
    cleanse_smuni(smuni),
    cleanse_pinka(pinka),
  ].filter(x => !!x).join('\n');
}

function cupra(valsi) {
  if (!valsi.selmaho) {
    console.error(`cmavo word missing selma'o: [${valsi.cmene}]`);
    return null;
  }
  return {
    cmene: valsi.cmene,
    indice: [
      valsi.cmene,
      ...expand_selmaho(valsi.selmaho)
    ],
    xadni: produce_body(valsi)
  };
}

function expand_selmaho(selmaho) {
  var results = [];
  results.push(selmaho);
  if (selmaho.endsWith('*')) {
    results.push(selmaho.replace(/\*$/, ''));
  }
  if (selmaho.match(/\d+$/)) {
    results.push(selmaho.replace(/\d+$/, ''));
  }
  return results;
}

export default { zbasu };
