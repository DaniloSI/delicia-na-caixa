import { writeAll } from "@/services/dao";
import {
  updateCentPriceJsonBin,
  updateOtherSettingsJsonBin,
  updateSnacksJsonBin,
} from "./services";

export async function PUT(request) {
  const { snacks, centPrice, otherSettings } = await request.json();

  const [snacksResponse, centPriceResponse, otherSettingsResponse] =
    await Promise.all([
      updateSnacksJsonBin(snacks),
      updateCentPriceJsonBin(centPrice),
      updateOtherSettingsJsonBin(otherSettings),
    ]);

  const cachesToUpdate = [];

  if (snacksResponse.record) {
    cachesToUpdate.push(["snacks", snacksResponse.record]);
  }

  if (centPriceResponse.record) {
    cachesToUpdate.push(["cent-price", centPriceResponse.record]);
  }

  if (otherSettingsResponse.record) {
    cachesToUpdate.push(["other-settings", otherSettingsResponse.record]);
  }

  await writeAll(cachesToUpdate);

  return Response.json({
    snacks: {
      success: !!snacksResponse.record,
    },
    centPrice: {
      success: !!centPriceResponse.record,
    },
    otherSettings: {
      success: !!otherSettingsResponse.record,
    },
  });
}
