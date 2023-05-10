import axios from "axios";
import { Fragment } from "react";
import Image from "next/image";
import { GetStaticPropsContext, GetStaticPropsResult } from "next";

import pokemon from "./pokemon.json";
import type_ from "./type.json";
import tokusei_ from "./tokusei.json";
import seikaku_ from "./seikaku.json";
import waza_ from "./waza.json";

function getPokemonIcon(id: string, form: string) {
  return (
    "https://resource.pokemon-home.com/battledata/img" +
    `/pokei/icon${id.padStart(4, "0")}_f${form.padStart(2, "0")}_s0.png`
  );
}

function getTerastalIcon(id: string) {
  let t = "https://resource.pokemon-home.com/battledata/img/terastal/";
  switch (Number(id)) {
    case 0:
      t += "icon_terastal_type_normal";
      break;
    case 1:
      t += "icon_terastal_type_fighting";
      break;
    case 2:
      t += "icon_terastal_type_flying";
      break;
    case 3:
      t += "icon_terastal_type_poison";
      break;
    case 4:
      t += "icon_terastal_type_ground";
      break;
    case 5:
      t += "icon_terastal_type_rock";
      break;
    case 6:
      t += "icon_terastal_type_bug";
      break;
    case 7:
      t += "icon_terastal_type_ghost";
      break;
    case 8:
      t += "icon_terastal_type_steel";
      break;
    case 9:
      t += "icon_terastal_type_fire";
      break;
    case 10:
      t += "icon_terastal_type_water";
      break;
    case 11:
      t += "icon_terastal_type_grass";
      break;
    case 12:
      t += "icon_terastal_type_electric";
      break;
    case 13:
      t += "icon_terastal_type_psychic";
      break;
    case 14:
      t += "icon_terastal_type_ice";
      break;
    case 15:
      t += "icon_terastal_type_dragon";
      break;
    case 16:
      t += "icon_terastal_type_dark";
      break;
    case 17:
      t += "icon_terastal_type_fairy";
      break;
    default:
      t += "icon_terastal_type_normal";
  }
  return (t += ".png"), t;
}

function getItemIcon(id: string) {
  return `https://resource.pokemon-home.com/battledata/img/item/item_${id.padStart(
    4,
    "0"
  )}.png`;
}

type Props = {
  [id: string]: {
    [form: string]: {
      name: string;
      form?: string;
      terastal: {
        id: string;
        name: string;
      }[];
      tokusei: {
        id: string;
        name: string;
      }[];
      motimono: {
        id: string;
        name: string;
      }[];
      seikaku: {
        id: string;
        name: string;
      }[];
      waza: {
        id: string;
        name: string;
      }[];
    };
  };
};

export default function IndexPage(props: Props) {
  return (
    <main className="mx-auto grid grid-cols-3 gap-y-2 py-2">
      {Object.keys(props).map((id) =>
        Object.keys(props[id]).map(
          (form) =>
            props[id][form]["terastal"].length > 0 && (
              <Fragment key={`${id}-${form}`}>
                <div>
                  <Image
                    src={getPokemonIcon(id, form)}
                    alt={props[id][form]["name"]}
                    width={64}
                    height={64}
                    className="mx-auto"
                  />
                  <h2 className="text-center">
                    {props[id][form]["name"]}
                    {props[id][form]["form"] !== undefined && (
                      <span className="text-sm">
                        <br />({props[id][form]["form"]})
                      </span>
                    )}
                  </h2>
                </div>
                <div className="text-center">
                  <p>
                    <Image
                      src={getTerastalIcon(
                        props[id][form]["terastal"][0]["id"]
                      )}
                      alt={props[id][form]["terastal"][0]["name"]}
                      width={16}
                      height={16}
                      className="inline-block"
                    />
                    {props[id][form]["terastal"][0]["name"]}
                  </p>
                  <p>{props[id][form]["tokusei"][0]["name"]}</p>
                  <p>
                    <Image
                      src={getItemIcon(props[id][form]["motimono"][0]["id"])}
                      alt={props[id][form]["motimono"][0]["name"]}
                      width={16}
                      height={16}
                      className="inline-block"
                    />
                    {props[id][form]["motimono"][0]["name"]}
                  </p>
                  <p>{props[id][form]["seikaku"][0]["name"]}</p>
                </div>
                <div className="text-center">
                  {props[id][form]["waza"].slice(0, 4).map((waza) => (
                    <p key={waza["id"]}>{waza["name"]}</p>
                  ))}
                </div>
              </Fragment>
            )
        )
      )}
    </main>
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<Props>> {
  const itemname = await (async function () {
    const response = await axios.get(
      "https://resource.pokemon-home.com/battledata/json/itemname_sc.json"
    );
    const { itemname } = response.data;
    return itemname;
  })();

  const zkn_form = await (async function () {
    const response = await axios.get(
      "https://resource.pokemon-home.com/battledata/json/zkn_form_sc.json"
    );
    const { zkn_form } = response.data;
    return zkn_form;
  })();

  const contest = await (async function () {
    const response = await axios.post(
      "https://api.battle.pokemon-home.com/tt/cbd/competition/rankmatch/list",
      { soft: "Sc" }
    );
    const { list } = response.data;

    for (const season in list) {
      for (const cId in list[season]) {
        const { rule, rst } = list[season][cId];

        if (rule !== 0) continue;
        if (rst !== 0) continue;

        return list[season][cId];
      }
    }
  })();

  const pdetail = await (async function () {
    const pdetail = Object.create(null);

    const response5 = await axios.get(
      "https://resource.pokemon-home.com/battledata/ranking/scvi" +
        `/${contest["cId"]}/${contest["rule"]}/${contest["ts2"]}/pdetail-5`
    );
    Object.assign(pdetail, response5.data);

    const response6 = await axios.get(
      "https://resource.pokemon-home.com/battledata/ranking/scvi" +
        `/${contest["cId"]}/${contest["rule"]}/${contest["ts2"]}/pdetail-6`
    );
    Object.assign(pdetail, response6.data);

    for (const id in pdetail) {
      if (Number(id) < 906) {
        delete pdetail[id];
      } else {
        for (const form in pdetail[id]) {
          const temoti = (pdetail[id][form] = pdetail[id][form]["temoti"]);
          delete temoti["pokemon"];

          const zkn_form_key = `${id.padStart(3, "0")}_${form.padStart(
            3,
            "0"
          )}`;
          temoti["name"] = pokemon[Number(id) - 1];
          if (zkn_form_key in zkn_form) {
            temoti["form"] = zkn_form[zkn_form_key];
          }

          for (const terastal of temoti["terastal"]) {
            terastal["name"] = type_[terastal["id"]];
          }
          for (const tokusei of temoti["tokusei"]) {
            tokusei["name"] = (tokusei_ as any)[tokusei["id"]];
          }
          for (const motimono of temoti["motimono"]) {
            motimono["name"] = itemname[motimono["id"]];
          }
          for (const seikaku of temoti["seikaku"]) {
            seikaku["name"] = (seikaku_ as any)[seikaku["id"]];
          }
          for (const waza of temoti["waza"]) {
            waza["name"] = (waza_ as any)[waza["id"]];
          }
        }
      }
    }

    return pdetail;
  })();

  return { props: pdetail };
}
