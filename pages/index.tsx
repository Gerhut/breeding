import axios from "axios";
import { Fragment } from "react";
import Image from "next/image";
import { GetStaticProps } from "next";

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
    case 99:
      t += "icon_terastal_type_stellar";
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
  contest: {
    cId: string;
    name: string;
    start: string;
    end: string;
    cnt: number;
    rankCnt: number;
    rule: number;
    season: number;
    rst: number;
    ts1: number;
    ts2: number;
  };
  pdetail: {
    [id: string]: {
      [form: string]: {
        name: string;
        form?: string;
        terastal: {
          id: string;
          name: string;
        };
        tokusei: {
          id: string;
          name: string;
        };
        motimono: {
          id: string;
          name: string;
        };
        seikaku: {
          id: string;
          name: string;
        };
        waza: {
          id: string;
          name: string;
        }[];
      };
    };
  };
};

export default function IndexPage({ contest, pdetail }: Props) {
  return (
    <main>
      <table>
        <caption>
          <h1>
            <code>
              {contest.name} @ {new Date(contest.ts2 * 1000).toISOString()}
            </code>
          </h1>
        </caption>
        <tbody>
          {Object.keys(pdetail).map((id) =>
            Object.keys(pdetail[id]).map((form) => (
              <tr key={`${id}-${form}`}>
                <th className="text-center">
                  <a
                    href={`https://wiki.52poke.com/wiki/${encodeURIComponent(
                      pdetail[id][form]["name"]
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      src={getPokemonIcon(id, form)}
                      alt={pdetail[id][form]["name"]}
                      width={64}
                      height={64}
                      className="mx-auto mb-0"
                    />
                    <div>{pdetail[id][form]["name"]}</div>
                    {pdetail[id][form]["form"] !== undefined && (
                      <div>
                        <small>({pdetail[id][form]["form"]})</small>
                      </div>
                    )}
                  </a>
                </th>
                <td>
                  <a
                    href={`https://wiki.52poke.com/wiki/${encodeURIComponent(
                      pdetail[id][form]["terastal"]["name"]
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      src={getTerastalIcon(pdetail[id][form]["terastal"]["id"])}
                      alt={pdetail[id][form]["terastal"]["name"]}
                      width={16}
                      height={16}
                      className="inline-block mb-0 align-baseline"
                    />
                    {pdetail[id][form]["terastal"]["name"]}
                  </a>
                  <br />
                  <a
                    href={`https://wiki.52poke.com/wiki/${encodeURIComponent(
                      pdetail[id][form]["tokusei"]["name"]
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {pdetail[id][form]["tokusei"]["name"]}
                  </a>
                  <br />
                  <a
                    href={`https://wiki.52poke.com/wiki/${encodeURIComponent(
                      pdetail[id][form]["motimono"]["name"]
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      src={getItemIcon(pdetail[id][form]["motimono"]["id"])}
                      alt={pdetail[id][form]["motimono"]["name"]}
                      width={16}
                      height={16}
                      className="inline-block mb-0 align-baseline"
                    />
                    {pdetail[id][form]["motimono"]["name"]}
                  </a>
                  <br />
                  <a
                    href={`https://wiki.52poke.com/wiki/${encodeURIComponent(
                      "性格"
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {pdetail[id][form]["seikaku"]["name"]}
                  </a>
                </td>
                <td>
                  {pdetail[id][form]["waza"].slice(0, 4).map((waza) => (
                    <Fragment key={waza.id}>
                      <a
                        href={`https://wiki.52poke.com/wiki/${encodeURIComponent(
                          waza["name"]
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {waza["name"]}
                      </a>
                      <br />
                    </Fragment>
                  ))}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </main>
  );
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
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

    let contest = null;

    for (const season in list) {
      for (const cId in list[season]) {
        const { rule, rst } = list[season][cId];

        if (rule !== 0) continue;
        if (rst === 0) continue;

        contest = list[season][cId];
      }
    }

    return contest;
  })();

  console.log({ contest });

  const pdetail = await (async function () {
    const pdetail = Object.create(null);
    const baseUrl =
      "https://resource.pokemon-home.com/battledata/ranking/scvi" +
      `/${contest["cId"]}/${contest["rst"]}/${contest["ts2"]}`;

    const response1 = await axios.get(`${baseUrl}/pdetail-1`);
    Object.assign(pdetail, response1.data);

    const response2 = await axios.get(`${baseUrl}/pdetail-2`);
    Object.assign(pdetail, response2.data);

    const response3 = await axios.get(`${baseUrl}/pdetail-3`);
    Object.assign(pdetail, response3.data);

    const response4 = await axios.get(`${baseUrl}/pdetail-4`);
    Object.assign(pdetail, response4.data);

    const response5 = await axios.get(`${baseUrl}/pdetail-5`);
    Object.assign(pdetail, response5.data);

    const response6 = await axios.get(`${baseUrl}/pdetail-6`);
    Object.assign(pdetail, response6.data);

    for (const id in pdetail) {
      for (const form in pdetail[id]) {
        const temoti = (pdetail[id][form] = pdetail[id][form]["temoti"]);
        delete temoti["pokemon"];

        const zkn_form_key = `${id.padStart(3, "0")}_${form.padStart(3, "0")}`;
        temoti["name"] = pokemon[Number(id) - 1];
        if (zkn_form_key in zkn_form) {
          temoti["form"] = zkn_form[zkn_form_key];
        }

        const terastal = (temoti["terastal"] = temoti["terastal"][0]);
        if (terastal) {
          terastal["name"] = (type_ as any)[terastal["id"]];
        } else {
          delete pdetail[id][form];
          continue;
        }

        const tokusei = (temoti["tokusei"] = temoti["tokusei"][0]);
        if (tokusei) {
          tokusei["name"] = (tokusei_ as any)[tokusei["id"]];
        } else {
          delete pdetail[id][form];
          continue;
        }

        const motimono = (temoti["motimono"] = temoti["motimono"][0]);
        if (motimono) {
          motimono["name"] = itemname[motimono["id"]];
        } else {
          delete pdetail[id][form];
          continue;
        }

        const seikaku = (temoti["seikaku"] = temoti["seikaku"][0]);
        if (seikaku) {
          seikaku["name"] = (seikaku_ as any)[seikaku["id"]];
        } else {
          delete pdetail[id][form];
          continue;
        }

        const wazas = (temoti["waza"] = temoti["waza"].slice(0, 4));
        for (const waza of wazas) {
          waza["name"] = (waza_ as any)[waza["id"]];
        }
      }
      if (Object.keys(pdetail[id]).length === 0) {
        delete pdetail[id];
      }
    }

    return pdetail;
  })();

  return { props: { contest, pdetail } };
};
