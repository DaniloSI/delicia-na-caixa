import StoreProvider from "@/providers/store-provider";
import { getCentPrice, getOtherSettings, getSnacks } from "@/services/store";
import { capitalize } from "@/utils/format";

export default async function StoreContainer({ children }) {
  const [snacksStore, centPriceStore, otherSettingsStore] = await Promise.all([
    getSnacks(),
    getCentPrice(),
    getOtherSettings(),
  ]);

  const store = {
    snacksStore,
    centPriceStore,
    otherSettingsStore,
    activeSnacks: snacksStore
      .filter((snack) => snack.active)
      .map((snack) => ({
        ...snack,
        centPrice: centPriceStore[snack.type],
        unitWeightInGrams:
          otherSettingsStore[`unitWeightInGrams${capitalize(snack.type)}`],
      })),
  };

  return <StoreProvider value={store}>{children}</StoreProvider>;
}
