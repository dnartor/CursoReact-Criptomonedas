import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import Error from './Error';
import useMoneda from "../hooks/useMoneda";
import useCriptomoneda from "../hooks/useCriptomoneda";
import axios from "axios";

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;
const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {
  const [listaCripto, guardarCripto] = useState([]);
  const [error, guardarError] = useState(false);

  const MONEDAS = [
    { codigo: "USD", nombre: "Dolar de Estados Unidos" },
    { codigo: "MXN", nombre: "Peso Mexicano" },
    { codigo: "EUR", nombre: "Euro" },
    { codigo: "GBP", nombre: "Libra Esterlina" },
  ];
  const [moneda, SelectMonedas] = useMoneda("Elige tu Moneda", "", MONEDAS);

  const [criptoMoneda, SelectCripto] = useCriptomoneda(
    "Elige tu Criptomoneda",
    "",
    listaCripto
  );

  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const resultado = await axios.get(url);
      guardarCripto(resultado.data.Data);
    };
    consultarAPI();
  }, []);

  const cotizarMoneda = e => {
    e.preventDefault();

    if(moneda === '' || criptoMoneda=== ''){
      guardarError(true);
      return;
    }

    guardarError(false);
    guardarMoneda(moneda);
    guardarCriptomoneda(criptoMoneda);
  }
  return (
    <form onSubmit={cotizarMoneda}>
      {error ? <Error mensaje='Todos los campos son obligatorios'/>:null}
      <SelectMonedas />

      <SelectCripto />
      <Boton type="submit" value="Calcular" />
    </form>
  );
};

export default Formulario;
