"use client";

import Divider from "@/components/Divider";
import TextInput from "@/components/TextInput";
import StoreContext from "@/contexts/store";
import { Button, Label, ToggleSwitch } from "flowbite-react";
import React, { useContext } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { HiCurrencyDollar, HiHashtag } from "react-icons/hi";
import { FaBalanceScale } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";
import MaskedInput from "@/components/MaskedInput";

function Admin() {
  const { snacksStore, centPriceStore, otherSettingsStore } =
    useContext(StoreContext);
  const methods = useForm({
    defaultValues: {
      snacks: Object.fromEntries(
        snacksStore.map(({ fieldName, active }) => [fieldName, active])
      ),
      centPrice: {
        partySnacks: centPriceStore.get("party_snacks"),
        miniChurros: centPriceStore.get("mini_churros"),
      },
      otherSettings: otherSettingsStore,
    },
  });
  const { control, register } = methods;

  const onSubmit = methods.handleSubmit((data) => {
    console.log(JSON.stringify(data, null, 2));
  });

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Configurações</h1>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-2 grid-flow-row gap-4">
            <div className="flex flex-col col-span-2 gap-2">
              <Label
                htmlFor="otherSettingsWhatsAppNumber"
                value="Número do WhatsApp"
              />
              <Controller
                control={control}
                name="otherSettings.whatsAppNumber"
                render={({ field: { onChange, value } }) => (
                  <MaskedInput
                    icon={RiWhatsappFill}
                    mask="(00) 0 0000-0000"
                    inputMode="tel"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </div>

            <div className="text-start flex flex-col gap-2">
              <Label
                htmlFor="otherSettingsUnitWeightInGrams"
                value="Peso da unidade em gramas"
              />
              <TextInput
                id="otherSettingsUnitWeightInGrams"
                type="number"
                inputMode="decimal"
                icon={FaBalanceScale}
                {...register("otherSettings.unitWeightInGrams", {
                  valueAsNumber: true,
                })}
              />
            </div>

            <div className="text-start flex flex-col gap-2">
              <Label
                htmlFor="otherSettingsMinimumQuantity"
                value="Quantidade mínima por pedido"
              />
              <TextInput
                id="otherSettingsMinimumQuantity"
                type="number"
                inputMode="decimal"
                icon={HiHashtag}
                {...register("otherSettings.minimumQuantity", {
                  valueAsNumber: true,
                })}
              />
            </div>

            <div className="text-start flex flex-col gap-2">
              <Label
                htmlFor="centPricePartySnacks"
                value="Preço do cento do salgado"
              />
              <TextInput
                id="centPricePartySnacks"
                type="number"
                inputMode="decimal"
                icon={HiCurrencyDollar}
                {...register("centPrice.partySnacks", {
                  valueAsNumber: true,
                })}
              />
            </div>

            <div className="text-start flex flex-col gap-2">
              <Label
                htmlFor="centPriceMiniChurros"
                value="Preço do cento do mini churros"
              />
              <TextInput
                id="centPriceMiniChurros"
                type="number"
                inputMode="decimal"
                icon={HiCurrencyDollar}
                {...register("centPrice.miniChurros", {
                  valueAsNumber: true,
                })}
              />
            </div>
          </div>

          <div className="flex flex-col w-full">
            <h2 className="text-xl font-medium">Salgados</h2>
            <div className="flex flex-col">
              <Divider className="my-0" />
              {snacksStore.map(({ fieldName, name, active }, index) => (
                <React.Fragment key={fieldName}>
                  <div className="flex justify-between">
                    <label htmlFor={fieldName} className="text-base">
                      {name}
                    </label>
                    <Controller
                      control={control}
                      name={`snacks.${fieldName}`}
                      defaultValue={active}
                      render={({ field: { onChange, value } }) => (
                        <ToggleSwitch
                          id={fieldName}
                          color="primary"
                          checked={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </div>

                  <Divider className="my-0" />
                </React.Fragment>
              ))}
            </div>
          </div>
          <Button type="submit" color="primary" className="w-full mt-4">
            Salvar
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}

export default Admin;
