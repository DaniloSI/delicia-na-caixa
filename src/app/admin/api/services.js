import { getSnacks } from "@/services/store";
import { CENT_PRICE_JSON_BIN_ID, OTHER_SETTINGS_JSON_BIN_ID, SNACKS_JSON_BIN_ID } from "@/utils/constants";
import { jsonBinRequest } from "@/utils/jsonBinRequest";

export const updateSnacksJsonBin = async (snacks) => {
  const originalSnacks = await getSnacks();

  return await jsonBinRequest(
    SNACKS_JSON_BIN_ID,
    "PUT",
    originalSnacks.map((o) => ({
      ...o,
      active: snacks[o.fieldName],
    }))
  ).catch((e) => e)
};

export const updateCentPriceJsonBin = async (centPrice) => await jsonBinRequest(
  CENT_PRICE_JSON_BIN_ID,
  "PUT",
  {
    'party_snacks': centPrice.partySnacks,
    'mini_churros': centPrice.miniChurros,
  },
).catch((e) => e);

export const updateOtherSettingsJsonBin = async (otherSettings) => await jsonBinRequest(
  OTHER_SETTINGS_JSON_BIN_ID,
  "PUT",
  otherSettings,
).catch((e) => e);