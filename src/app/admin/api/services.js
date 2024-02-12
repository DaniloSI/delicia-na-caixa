import database from "@/services/database";
import { getSnacks } from "@/services/store";

export const updateSnacksDataBase = async (snacks) => {
  const originalSnacks = await getSnacks();
  const newSnacks = originalSnacks.map((o) => ({
    ...o,
    active: snacks[o.fieldName],
  }));

  await database.setItem("snacks", newSnacks);

  return newSnacks;
};

export const updateCentPriceDataBase = async (centPrice) => {
  const newCentPrice = {
    party_snacks: centPrice.partySnacks,
    mini_churros: centPrice.miniChurros,
  };

  await database.setItem("centPrice", newCentPrice);

  return newCentPrice;
};

export const updateOtherSettingsDataBase = async (otherSettings) => {
  await database.setItem("otherSettings", otherSettings);
  return otherSettings;
};
