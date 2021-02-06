import { escape, format_terbri, Vlaste } from "./util.js";

const PLACE_MARKER = {
  se: 2,
  te: 3,
  ve: 4,
  xe: 5,
};

const UNOFFICIAL_MODAL = {
  "gu'au": {
    origin: "gunma",
    place: 1,
  },
  xau: {
    origin: "xamgu",
    place: 2,
  },
};

function find_modal(valsi) {
  const first_try = (valsi.smuni.match(/\{?(\S+)\}? modal/) ?? [])[1];
  const second_try = ((valsi.pinka || "").match(/\{?(\S+)\}? modal/) ?? [])[1];
  const third_try = UNOFFICIAL_MODAL[valsi.cmene]?.origin;

  return first_try || second_try || third_try;
}

function find_place(valsi) {
  const valsi = 1;
}

(function () {
  Vlaste.init();
  const vlaste = Vlaste.instance();
  const all_bais = vlaste
    .liste()
    .filter((x) => ["BAI", "BAI*"].includes(x.selmaho))
    .filter((x) => x.cmene.split(" ").length == 1)
    .filter((x) => !!find_modal(x));

  console.log(JSON.stringify(all_bais));
  console.error(all_bais.length);
})();
