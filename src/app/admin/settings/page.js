"use client";

import React, { useContext, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { FaBalanceScale } from "react-icons/fa";
import { HiCurrencyDollar, HiHashtag } from "react-icons/hi";
import { RiWhatsappFill } from "react-icons/ri";
import { toast } from "react-toastify";

import Divider from "@/components/Divider";
import FormControl from "@/components/FormControl";
import MaskedInput from "@/components/MaskedInput";
import StoreContext from "@/contexts/store";

import LogoutButton from "../components/LogoutButton";
import NumericField from "../components/NumericField";

const getUnityComponent = (text) => {
  return function UnityComponent() {
    return <p className="text-sm text-gray-500">{text}</p>;
  };
};

function Admin() {
  const { snacksStore, centPriceStore, otherSettingsStore } =
    useContext(StoreContext);
  const [isUpdating, setIsUpdating] = useState(false);
  const methods = useForm({
    defaultValues: {
      snacks: Object.fromEntries(
        snacksStore.map(({ fieldName, active }) => [fieldName, active]),
      ),
      centPrice: centPriceStore,
      otherSettings: otherSettingsStore,
    },
  });
  const { control } = methods;

  const onSubmit = methods.handleSubmit((data) => {
    setIsUpdating(true);
    fetch("/admin/api", {
      method: "PUT",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        const success = [];
        const error = [];
        const mapFields = {
          snacks: "salgados",
          centPrice: "preços",
          otherSettings: "whatsapp, peso, quantidade mínima",
        };

        for (const key in data) {
          const fields = mapFields[key];

          if (data[key].success) {
            success.push(fields);
          } else {
            error.push(fields);
          }
        }

        if (success.length && !error.length) {
          toast.success("Configurações atualizadas com sucesso");
        } else if (success.length) {
          toast.success(
            `Configurações de ${success.join(", ")} atualizadas com sucesso`,
          );
        }

        if (error.length) {
          toast.error(`Erro ao atualizar configurações de ${error.join(", ")}`);
        }
      })
      .finally(() => setIsUpdating(false));
  });

  return (
    <div className="flex flex-col p-4">
      <FormProvider {...methods}>
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <div className="grid grid-flow-row grid-cols-2 items-end gap-x-4 gap-y-2">
            {/* TODO: Disable whatsapp field in PROD for security reasons */}
            <FormControl labelTop="Número do WhatsApp" className="col-span-2">
              <Controller
                control={control}
                name="otherSettings.whatsAppNumber"
                render={({ field: { onChange, value } }) => (
                  <MaskedInput
                    leftIcon={RiWhatsappFill}
                    mask="(00) 0 0000-0000"
                    inputMode="tel"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </FormControl>

            <NumericField
              name="otherSettings.unitWeightInGramsPartySnacks"
              label="Peso do salgado"
              leftIcon={FaBalanceScale}
              rightIcon={getUnityComponent("gramas")}
            />

            <NumericField
              name="otherSettings.unitWeightInGramsMiniChurros"
              label="Peso do mini churros"
              leftIcon={FaBalanceScale}
              rightIcon={getUnityComponent("gramas")}
            />

            <NumericField
              name="centPrice.partySnacks"
              label="Preço do salgado"
              leftIcon={HiCurrencyDollar}
              rightIcon={getUnityComponent("cento")}
            />

            <NumericField
              name="centPrice.miniChurros"
              label="Preço do mini churros"
              leftIcon={HiCurrencyDollar}
              rightIcon={getUnityComponent("cento")}
            />

            <NumericField
              name="otherSettings.minimumQuantity"
              label="Quant. mínima por pedido"
              leftIcon={HiHashtag}
            />
          </div>

          <div className="flex flex-col">
            <h2 className="mb-4 text-xl font-medium">Salgados</h2>
            <div className="flex flex-col gap-4">
              <Divider className="my-0" />
              {snacksStore.map(({ fieldName, name, active, available }) => (
                <React.Fragment key={fieldName}>
                  <div className="flex justify-between">
                    <span className="text-base font-semibold">{name}</span>
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-end gap-2">
                        <label
                          htmlFor={`${fieldName}.active`}
                          className="text-sm"
                        >
                          Ativo
                        </label>
                        <Controller
                          control={control}
                          name={`snacks.${fieldName}.active`}
                          defaultValue={active}
                          render={({ field: { onChange, value } }) => (
                            <input
                              id={`${fieldName}.active`}
                              type="checkbox"
                              className="toggle toggle-primary"
                              checked={value}
                              onChange={onChange}
                            />
                          )}
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <label
                          htmlFor={`${fieldName}.available`}
                          className="text-sm"
                        >
                          Disponível
                        </label>
                        <Controller
                          control={control}
                          name={`snacks.${fieldName}.available`}
                          defaultValue={available}
                          render={({ field: { onChange, value } }) => (
                            <input
                              id={`${fieldName}.available`}
                              type="checkbox"
                              className="toggle toggle-primary"
                              checked={value}
                              onChange={onChange}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <Divider className="my-0" />
                </React.Fragment>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isUpdating}
          >
            {isUpdating && <span className="loading loading-spinner" />}
            Salvar
          </button>

          <LogoutButton />
        </form>
      </FormProvider>
    </div>
  );
}

export default Admin;
