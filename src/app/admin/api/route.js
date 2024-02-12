import { writeAll } from "@/services/dao-cache";
import {
  updateCentPriceDataBase,
  updateOtherSettingsDataBase,
  updateSnacksDataBase,
} from "./services";

export async function PUT(request) {
  const { snacks, centPrice, otherSettings } = await request.json();

  const [newSnacks, newCentPrice, newOtherSettings] = await Promise.all([
    updateSnacksDataBase(snacks),
    updateCentPriceDataBase(centPrice),
    updateOtherSettingsDataBase(otherSettings),
  ]);

  await writeAll([
    ["snacks", newSnacks],
    ["centPrice", newCentPrice],
    ["otherSettings", newOtherSettings],
  ]);

  return Response.json({
    snacks: {
      success: true,
    },
    centPrice: {
      success: true,
    },
    otherSettings: {
      success: true,
    },
  });
}
