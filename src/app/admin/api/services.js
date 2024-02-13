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
  await database.setItem("centPrice", centPrice);
  return centPrice;
};

export const updateOtherSettingsDataBase = async (otherSettings) => {
  const newOtherSettings = {
    ...otherSettings,
    whatsAppNumber: otherSettings.whatsAppNumber.replaceAll(/\D/g, ''),
  };

  await database.setItem("otherSettings", newOtherSettings);
  
  return newOtherSettings;
};
