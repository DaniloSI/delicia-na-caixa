'use client'

import React from 'react';

import Image from "next/image";
import Logo from "@/assets/logo.png";

import StepperContainer from '@/components/Stepper/StepperContainer';

import snacks from '@/__mocks__/snacks'
import StepperItem from '@/components/Stepper/StepperItem';
import Resume from '@/components/Order/Resume';
import { FormProvider, useForm } from 'react-hook-form';
import SmallSavorySnacks from '@/components/SmallSavorySnacks';
import getMessageFromTemplate from '@/utils/getMessageFromTemplate';
import { encode } from 'urlencode';

const Divider = () => <hr className="h-px my-4 bg-gray-200 border-0" />;

export default function Home() {
  const defaultValues = Object.fromEntries(snacks.map(snack => [snack.name, 0]))
  const methods = useForm({
    defaultValues
  });

  const onSubmit = methods.handleSubmit((data) => {
    const message = encode(getMessageFromTemplate(data))
    window.open(`https://wa.me/5527996324590?text=${message}`)
  })

  return (
    <main className="flex flex-col justify-items-center gap-6 min-h-screen py-8 px-4">
      <Image src={Logo} height={50} className="place-self-center" alt="Logo delícia na caixa" />

      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <StepperContainer
            steps={[
              { name: 'Escolha', done: false },
              { name: 'Entrega', done: false },
              { name: 'Finalização', done: false },
            ]}
          >
            <Divider />

            <StepperItem step={0}>
              {snacks.map(({ fieldName, name, description, image }, index, list) => (
                <React.Fragment key={name}>
                  <SmallSavorySnacks
                    fieldName={fieldName}
                    name={name}
                    description={description}
                    image={image}
                  />

                  {index < list.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </StepperItem>

            <StepperItem step={1}>
              <h2>Página de entrega</h2>
            </StepperItem>

            <div className='h-36' />

            <Resume />
          </StepperContainer>
        </form>
      </FormProvider>
    </main>
  );
}
