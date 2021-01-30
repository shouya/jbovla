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

function produce_body(valsi) {
  var {smuni} = valsi;

  return cleanse_smuni(smuni);
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
