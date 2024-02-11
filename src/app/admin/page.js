"use client";

import Divider from "@/components/Divider";
import StoreContext from "@/contexts/store";
import { Button, ToggleSwitch } from "flowbite-react";
import React, { useContext } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { HiCurrencyDollar, HiHashtag } from "react-icons/hi";
import { FaBalanceScale } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";
import MaskedInput from "@/components/MaskedInput";
import FieldContainer from "./components/FieldContainer";
import NumericField from "./components/NumericField";

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
  const { control } = methods;

  const onSubmit = methods.handleSubmit((data) => {
    console.log(JSON.stringify(data, null, 2));
  });

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Configurações</h1>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-2 grid-flow-row gap-4">
            <FieldContainer
              id="otherSettingsWhatsAppNumber"
              label="Número do WhatsApp"
              className="col-span-2"
            >
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
            </FieldContainer>

            <NumericField
              name="otherSettings.unitWeightInGrams"
              label="Peso da unidade em gramas"
              icon={FaBalanceScale}
            />

            <NumericField
              name="otherSettings.minimumQuantity"
              label="Quantidade mínima por pedido"
              icon={HiHashtag}
            />

            <NumericField
              name="centPrice.partySnacks"
              label="Preço do cento do salgado"
              icon={HiHashtag}
            />

            <NumericField
              name="centPrice.miniChurros"
              label="Preço do cento do mini churros"
              icon={HiCurrencyDollar}
            />
          </div>

          <div className="flex flex-col">
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
