"use client";

import StoreContext from "@/contexts/store";
import { useContext } from "react";

function Admin() {
  const { snacksStore } = useContext(StoreContext);

  return (
    <div>
      <h1 className="text-xl">Configurações</h1>
      <p>Em breve...</p>
    </div>
  );
}

export default Admin;
