import React from 'react';

import Image from "next/image";
import Logo from "@/assets/logo.png";
import Text from "@/components/Text";

const Divider = () => <hr className="h-px my-4 bg-gray-200 border-0" />;

const SmallSavorySnacks = ({ name, description, image }) => (
  <div className="flex items-center bg-white flex-row max-w-xl">
    <img className="object-cover w-auto rounded-lg h-24" src={image} alt="" />
    <div className="flex flex-col grow justify-between px-4 leading-normal">
      <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 ">
        {name}
      </h5>
      <p className="mb-2 font-normal text-gray-700 ">{description}</p>
      <div>
        <input
          type="text"
          id="first_name"
          className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Quantidade"
          required
        />
      </div>
    </div>
  </div>
);

const Stepper = ({ steps, active }) => {
  return (
    <ol className="flex justify-center text-base font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
      {steps.map(({ name, done }, index) => (
        <li key={name} className={`flex md:w-full items-center ${index === active ? 'text-gray-900': ''} ${done ? 'text-blue-600' : ''} sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10`}>
            <span className={`flex items-center ${index < steps.length - 1 ? "after:content-['/']" : ''} sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500`}>
                {done ? (
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                  </svg>
                ) : (
                  <span className="me-2">{index + 1}</span>
                )}
                {name}
            </span>
        </li>        
      ))}
    </ol>
  )
}

export default function Home() {
  return (
    <main className="flex flex-col justify-items-center gap-6 min-h-screen py-12 px-4">
      <Image src={Logo} className="place-self-center mb-4" />

      <Stepper
        steps={[
          { name: 'Escolha', done: false },
          { name: 'Entrega', done: false },
          { name: 'Finalização', done: false },
        ]}
        active={0}
      />

      <div>
        <Divider />

        {[
          {
            name: "Quibe",
            description: "Carne temperada",
            image:
              "https://delivery.mariaangu.com.br/wp-content/uploads/2020/07/Quibe-pequeno-1.jpg",
          },
          {
            name: "Coxinha",
            description: "Coxinha de frango",
            image:
              "https://www.receiteria.com.br/wp-content/uploads/coxinha-sem-gluten-00.jpeg",
          },
          {
            name: "Risole",
            description: "Risole de carne",
            image:
              "https://saboresdeminassalgados.com.br/dev/wp-content/uploads/2020/05/risolebaixo.jpg",
          },
          {
            name: "Risole",
            description: "Risole de carne",
            image:
              "https://saboresdeminassalgados.com.br/dev/wp-content/uploads/2020/05/risolebaixo.jpg",
          },
          {
            name: "Risole",
            description: "Risole de carne",
            image:
              "https://saboresdeminassalgados.com.br/dev/wp-content/uploads/2020/05/risolebaixo.jpg",
          },
          {
            name: "Risole",
            description: "Risole de carne",
            image:
              "https://saboresdeminassalgados.com.br/dev/wp-content/uploads/2020/05/risolebaixo.jpg",
          },
        ].map(({ name, description, image }, index, list) => (
          <React.Fragment key={name}>
            <SmallSavorySnacks
              name={name}
              description={description}
              image={image}
            />

            {index < list.length - 1 && <Divider />}
          </React.Fragment>
        ))}

        <div className='h-14' />

        <div className="fixed right-0 bottom-0 z-10 bg-white w-full pt-6 pb-4 pr-4 border-t-2">
          <div className="pb-6 pr-4 flex flex-col text-end">
            <p>Quantidade: 100</p>
            <p>Subtotal: R$ 80</p>
          </div>

          <div className="flex justify-end">
            <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200">Voltar</button>
            <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none ">Ir para a entrega</button>
          </div>
        </div>

      </div>
        
    </main>
  );
}
