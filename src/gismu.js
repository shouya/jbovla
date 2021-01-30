Object.defineProperty(Array.prototype, 'yield_self', {
 enumerable: false,
 value: function(f) { return f(this); }
});

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
  return rafsi
    .map(x => `<span class="rafsi">${x}<span>`)
    .join('')
    .yield_self(x => `<span class="rafsi-list">$x</span>`);
}

function produce_body(valsi) {
  var {smuni} = valsi;

  return [
    cleanse_smuni(smuni),
    extract_rafsi(rafsi),
    etymology(rafsi)
  ].join('');
}

function etymology(lang) {

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
