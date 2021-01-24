function zbasu(vlaste, jalge) {
  for (var valsi of vlaste.liste()) {
    if (valsi.klesi != "gismu") {
      continue;
    }
    let selkemyvlaste = cupra(valsi);
    jalge.jmina(selkemyvlaste);
  }
}

function cupra(valsi) {
  return {
    cmene: valsi.cmene,
    indice: [
      valsi.cmene
    ],
    xadni: valsi.smuni
  };
}


export default { zbasu };
