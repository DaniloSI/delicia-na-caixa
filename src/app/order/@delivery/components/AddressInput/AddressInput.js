"use client";

import MaskedInput from "@/components/MaskedInput";

import FormControl from "@/components/FormControl";

import { useFormContext } from "react-hook-form";
import AddAddress from "./AddAddress";
import EditAddress from "./EditAddress";
import { useEffect, useRef, useState } from "react";
import TextInput from "@/components/TextInput";
import Divider from "@/components/Divider";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { getAddressFromCep } from "@/services/cep";
import TextInputCustom from "@/components/TextInputCustom";

function AddressInput() {
  const { watch, setValue } = useFormContext();
  const [requiredFieldsError, setRequiredFieldsError] = useState(false);
  const [isLoadingAddressFields, setIsLoadingAddressFields] = useState(false);
  const refModal = useRef();
  const refAddress = useRef();

  const address = watch("address") || {};
  const reception = watch("reception");

  useEffect(() => {
    if (reception === "delivery") {
      refAddress.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [reception]);

  const handleChangeCep = async (e) => {
    const cep = e.target.value;

    if (cep?.length === 9) {
      setIsLoadingAddressFields(true);
      const newAddress = await getAddressFromCep(cep);
      const inputs = refModal.current.querySelectorAll("input");

      inputs.forEach((input) => {
        if (input.name in newAddress) {
          input.value = newAddress[input.name];
        }
      });
      setIsLoadingAddressFields(false);
    }
  };

  const handleOpenModal = () => {
    refModal.current.showModal();
  };

  const handleCloseModal = () => {
    refModal.current.close();
    setRequiredFieldsError(false);
  };

  const handleConfirm = () => {
    const requiredFields = ["street", "number", "neighborhood", "city"];
    const inputs = refModal.current.querySelectorAll("input");

    const newAddress = {};

    inputs.forEach((input) => {
      newAddress[input.name] = input.value;
    });

    if (requiredFields.some((field) => !newAddress[field])) {
      setRequiredFieldsError(true);
      return;
    }

    setRequiredFieldsError(false);
    setValue("address", newAddress);
    handleCloseModal();
  };

  const AddOrUpdateAddress = address.street ? EditAddress : AddAddress;

  return (
    <div ref={refAddress}>
      <AddOrUpdateAddress onClick={handleOpenModal} />

      <dialog
        ref={refModal}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box overflow-y-scroll p-4 flex flex-col max-h-[95dvh]">
          <div className="prose leading-6 text-center">
            <h3>Endereço de entrega</h3>
          </div>

          <Divider className="my-2" />

          <div className="flex-1 overflow-auto">
            {requiredFieldsError && (
              <div role="alert" className="alert alert-error grid-flow-col p-2">
                <IoIosCloseCircleOutline className="h-5 w-5" />
                <span className="text-sm">
                  Por favor, preencha os campos obrigatórios.
                </span>
              </div>
            )}

            <div className="grid grid-cols-4 gap-y-1 gap-x-2">
              <FormControl labelTop="CEP" className="col-span-4">
                <MaskedInput
                  placeholder="Ex.: 29123-000"
                  mask="00000-000"
                  name="cep"
                  inputMode="numeric"
                  defaultValue={address.cep}
                  onInput={handleChangeCep}
                />
              </FormControl>

              <FormControl
                labelTop="Rua ou avenida"
                className="col-span-3"
                required
              >
                <TextInputCustom
                  after={isLoadingAddressFields && <span className="loading loading-spinner loading-sm text-gray-400"></span>}
                  disabled={isLoadingAddressFields}
                  placeholder="Ex.: Rua Ipanema"
                  name="street"
                  defaultValue={address.street}
                />
              </FormControl>

              <FormControl labelTop="Número" className="col-span-1" required>
                <TextInput
                  placeholder="Ex.: 25"
                  name="number"
                  defaultValue={address.number}
                />
              </FormControl>

              <FormControl labelTop="Bairro" className="col-span-4" required>
                <TextInputCustom
                  after={isLoadingAddressFields && <span className="loading loading-spinner loading-sm text-gray-400"></span>}
                  disabled={isLoadingAddressFields}
                  placeholder="Ex.: Colina de Laranjeiras"
                  name="neighborhood"
                  defaultValue={address.neighborhood}
                />
              </FormControl>

              <FormControl
                labelTop="Complemento"
                labelBottom="Bloco, apto ou casa"
                className="col-span-4"
              >
                <TextInput
                  placeholder="Ex.: Bloco 6 Apto 1234"
                  name="complement"
                  defaultValue={address.complement}
                />
              </FormControl>

              <FormControl labelTop="Cidade" className="col-span-3" required>
                <TextInputCustom
                  after={isLoadingAddressFields && <span className="loading loading-spinner loading-sm text-gray-400"></span>}
                  disabled={isLoadingAddressFields}
                  placeholder="Ex.: Serra"
                  name="city"
                  defaultValue={address.city}
                />
              </FormControl>

              <FormControl labelTop="UF" className="col-span-1">
                <TextInput
                  placeholder="Ex.: ES"
                  name="state"
                  readOnly
                  disabled
                  defaultValue={address.state}
                />
              </FormControl>
            </div>
          </div>

          <Divider />

          <div className="modal-action flex gap-2 col-span-4">
            <button
              type="button"
              className="btn grow"
              onClick={handleCloseModal}
            >
              Fechar
            </button>
            <button
              type="button"
              className="btn grow btn-primary"
              disabled={isLoadingAddressFields}
              onClick={handleConfirm}
            >
              Confirmar
            </button>
          </div>
        </div>
        <div className="modal-backdrop">
          <button type="button" onClick={handleCloseModal}>
            close
          </button>
        </div>
      </dialog>
    </div>
  );
}

export default AddressInput;
