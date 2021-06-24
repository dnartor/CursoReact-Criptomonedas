import React, { Fragment, useState } from "react";

const useMoneda = () => {
  const [state, actualizarState] = useState("");
  const Seleccionar = () => (
    <Fragment>
      <label>Moneda</label>
      <select>
        <option value="MXN">Peso Mexicano</option>
      </select>
    </Fragment>
  );

  return [state,Seleccionar,actualizarState];
};
    
export default useMoneda;
