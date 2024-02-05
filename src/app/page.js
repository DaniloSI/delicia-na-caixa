"use client";

import React, { useContext, useEffect, useMemo, useRef } from "react";

import Image from "next/image";
import Logo from "@/assets/logo.png";

import StepperContainer from "@/components/Stepper/StepperContainer";

import StepperItem from "@/components/Stepper/StepperItem";
import Resume from "@/components/Order/Resume";
import { Controller, FormProvider, useForm } from "react-hook-form";
import SmallSavorySnacks from "@/components/SmallSavorySnacks";
import getMessageFromTemplate from "@/utils/getMessageFromTemplate";
import { encode } from "urlencode";

import { Accordion, Datepicker, Label, Select } from "flowbite-react";
import MaskedInput from "@/components/MaskedInput";
import TextInput from "@/components/TextInput";

import { HiOutlineClock } from "react-icons/hi";
import { getTotal } from "@/utils/calc";
import StoreContext from "@/contexts/store";
import MinimumQuantity from "@/components/MiniumQuantity";

const Divider = () => <hr className="h-px my-4 bg-gray-200 border-0" />;

const btnThemePrimary = "bg-red-700 hover:bg-red-800 text-white";
const datePickerTheme = {
  popup: {
    footer: {
      button: {
        today: btnThemePrimary,
      },
    },
  },
  views: Object.fromEntries(
    ["days", "months", "years", "decades"].map((view) => [
      view,
      {
        items: {
          item: {
            selected: btnThemePrimary,
          },
        },
      },
    ])
  ),
};

export default function Home() {
  const { snacksStore } = useContext(StoreContext);
  const minDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date;
  }, []);
  const methods = useForm({
    defaultValues: {
      snacks: {},
      reception: "retire",
      cep: "",
      date: minDate,
    },
  });
  const sendRef = useRef(null);
  const { control, watch, setValue } = methods;

  const onSubmit = methods.handleSubmit((data) => {
    sendRef.current.click();
  });

  const reception = watch("reception");
  const cep = watch("address.cep");
  const snacks = watch("snacks");
  const all = watch();

  useEffect(() => {
    if (cep?.length === 9) {
      fetch(`https://viacep.com.br/ws/${cep.replace(/\D/g, "")}/json/`)
        .then((response) => response.json())
        .then((data) => {
          setValue("address.street", data.logradouro);
          setValue("address.neighborhood", data.bairro);
          setValue("address.city", data.localidade);
          setValue("address.state", data.uf);
        });
    }
  }, [cep]);

  const summary = useMemo(
    () => getMessageFromTemplate(all, snacksStore).trim().replaceAll("*", ""),
    [all, snacksStore]
  );

  return (
    <main className="flex flex-col justify-items-center gap-4 min-h-screen py-4 px-4 md:max-w-96 m-auto">
      <Image
        src={Logo}
        height={45}
        className="place-self-center"
        alt="Logo delícia na caixa"
        priority
      />

      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <StepperContainer
            steps={[
              { name: "Escolha", done: getTotal(snacks || {}) >= 100 },
              { name: "Retirada", done: false },
              { name: "Finalização", done: false },
            ]}
          >
            <Divider />

            <StepperItem step={0}>
              <MinimumQuantity />
              {snacksStore.map(
                ({ name, namePlural, description, image }, index, list) => (
                  <React.Fragment key={name}>
                    <SmallSavorySnacks
                      name={name}
                      namePlural={namePlural}
                      description={description}
                      image={image}
                    />

                    {index < list.length - 1 && <Divider />}
                  </React.Fragment>
                )
              )}
            </StepperItem>

            <StepperItem step={1} className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <div>
                  <label
                    htmlFor="deliveryDate"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Data
                  </label>
                  <Datepicker
                    language="pt-BR"
                    title="Data da entrega/retirada"
                    showTodayButton={false}
                    labelClearButton="Limpar"
                    minDate={minDate}
                    theme={datePickerTheme}
                    onSelectedDateChanged={(date) => setValue("date", date)}
                    defaultDate={minDate}
                  />
                </div>

                <div className="text-start">
                  <Label htmlFor="time" value="Horário" />
                  <TextInput
                    id="time"
                    type="time"
                    placeholder="Ex.: 15:30"
                    icon={HiOutlineClock}
                    onChange={(e) => setValue("time", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Como deseja receber seu pedido?
                </h3>

                <div className="flex mt-4">
                  <div className="flex items-center h-5">
                    <input
                      id="retire"
                      name="reception"
                      aria-describedby="retire-text"
                      type="radio"
                      value="retire"
                      defaultChecked
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                      onChange={(e) => setValue("reception", e.target.value)}
                    />
                  </div>
                  <div className="ms-2 text-sm">
                    <label
                      htmlFor="retire"
                      className="font-medium text-gray-900"
                    >
                      Retirar
                    </label>
                    <p className="text-xs font-normal text-gray-500">
                      Sem custo com taxa de entrega
                    </p>
                    <p className="text-xs font-normal text-gray-500">
                      Retirar em: Rua Amaralina, Nº 22, Morada de Laranjeiras,
                      Serra, ES
                    </p>
                  </div>
                </div>

                <div className="flex mt-4">
                  <div className="flex items-center h-5">
                    <input
                      id="delivery"
                      name="reception"
                      aria-describedby="delivery-text"
                      type="radio"
                      value="delivery"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                      onChange={(e) => setValue("reception", e.target.value)}
                    />
                  </div>
                  <div className="ms-2 text-sm">
                    <label
                      htmlFor="delivery"
                      className="font-medium text-gray-900"
                    >
                      Entrega
                    </label>
                    <p className="text-xs font-normal text-gray-500">
                      Receber em sua casa ou no local da festa.
                    </p>
                    <p className="text-xs font-normal text-gray-500">
                      Ao selecionar esta opção, pode ser que entremos em contato
                      com você para combinar sobre o valor da entrega.
                    </p>
                  </div>
                </div>
              </div>

              <div className={reception === "retire" ? "hidden" : ""}>
                <h3 className="font-semibold text-gray-900 mb-4">
                  Endereço para entrega
                </h3>

                <div className="flex flex-col gap-4">
                  {[
                    {
                      name: "address.cep",
                      label: "CEP",
                      placeholder: "Ex.: 29123-000",
                    },
                    {
                      name: "address.state",
                      label: "Estado",
                      placeholder: "Ex.: Espírito Santo",
                      readOnly: true,
                    },
                    {
                      name: "address.city",
                      label: "Cidade",
                      placeholder: "Ex.: Serra",
                      readOnly: true,
                    },
                    {
                      name: "address.neighborhood",
                      label: "Bairro",
                      placeholder: "Ex.: Morada de Laranjeiras",
                      readOnly: true,
                    },
                    {
                      name: "address.street",
                      label: "Rua",
                      placeholder: "Ex.: Rua Amaralina",
                      readOnly: true,
                    },
                    {
                      name: "address.number",
                      label: "Número",
                      placeholder: "Ex.: 22",
                    },
                    {
                      name: "address.complement",
                      label: "Complemento",
                      placeholder: "Ex.: Casa 1",
                    },
                  ].map(({ name, label, placeholder, readOnly = false }) => (
                    <Controller
                      key={name}
                      control={control}
                      name={name}
                      render={({ field: { onChange, value } }) => (
                        <div className="flex flex-col gap-2">
                          <Label htmlFor={name} value={label} />
                          <MaskedInput
                            readOnly={readOnly}
                            disabled={readOnly}
                            placeholder={placeholder}
                            mask={name === "address.cep" ? "00000-000" : ""}
                            inputMode={
                              name === "address.cep" ? "numeric" : "text"
                            }
                            value={value}
                            onChange={onChange}
                          />
                        </div>
                      )}
                    />
                  ))}
                </div>
              </div>
            </StepperItem>

            <StepperItem step={2} className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <Label
                  htmlFor="payment"
                  value="Selecione a forma de pagamento"
                />
                <Select
                  id="payment"
                  required
                  onChange={(e) => setValue("payment", e.target.value)}
                  defaultValue=""
                >
                  <option value="" disabled>
                    -- selecione uma forma de pagamento --
                  </option>
                  <option>Dinheiro</option>
                  <option>PIX</option>
                  <option>PicPay</option>
                </Select>
              </div>

              <div className="flex flex-col gap-1">
                <h6 className="text-lg font-bold">Enviar o pedido</h6>
                <p className="text-base">
                  Clique no botão &quot;Enviar pedido&quot; abaixo para enviar o
                  pedido para a loja por meio do WhatsApp.
                </p>
              </div>

              <Accordion>
                <Accordion.Panel>
                  <Accordion.Title>Resumo do pedido</Accordion.Title>
                  <Accordion.Content>
                    <p className="whitespace-pre-wrap">{summary}</p>
                  </Accordion.Content>
                </Accordion.Panel>
              </Accordion>

              <a
                ref={sendRef}
                href={`whatsapp://send?phone=5527996324590&text=${encode(
                  summary
                )}`}
                className="hidden h-0 w-0"
              >
                Send
              </a>
            </StepperItem>

            <div className="h-36" />

            <Resume />
          </StepperContainer>
        </form>
      </FormProvider>
    </main>
  );
}
