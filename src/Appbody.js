import React, { useState } from 'react'
import { useForm } from "react-hook-form";

const Appbody = () => {

  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  const [lista, setLista] = useState([]);

  const onSubmit = (data, e) => {
    console.log(data);

    // se houver dados salvos em localStorage, obtém esses dados (senão, vazio)
    const stocks = localStorage.getItem("stocks")
      ? JSON.parse(localStorage.getItem("stocks"))
      : "";

    // salva em localstorage os dados existentes, acrescentando o preenchido no form                    
    localStorage.setItem("stocks", JSON.stringify([...stocks, data]));

    // atualiza a lista
    setLista([...lista, data]);

    // pode-se limpar cada campo
//    setValue("modelo", "");

    // ou, então, limpar todo o form
    e.target.reset();
  }

  // obtém o ano atual
  const ano_atual = new Date().getFullYear();

  return (
    <div className="row">
      <div className="col-sm-2">
        <img
          src="stock.png"
          alt="My Stocks"
          className="img-fluid mx-auto d-block"
        />
      </div>

      <div className="col-sm-5 mt-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group mb-4">
            <div className="input-group-prepend">
              <span className="input-group-text">Ação:</span>
            </div>
            <input
              type="text"
              className="form-control"
              {...register("acao", {
                required: true,
                minLength: 2,
                maxLength: 30
              })}
              autoFocus
            />
            <div className="input-group-prepend">
              <span className="input-group-text">Setor:</span>
            </div>
            <select
              className="form-control"
              {...register("setor", {
                required: true
              })}
            >
              <option value="">-- Selecione o Setor--</option>
              <option value="Eletrico">Elétrico</option>
              <option value="Tecnologia">Técnologia</option>
              <option value="Commodities">Commodities</option>
              <option value="Financeiro">Financeiro</option>
              <option value="Saude">Saude</option>
            </select>
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Nome da Empresa:</span>
            </div>
            <input
              type="text"
              className="form-control"
              {...register("empresa", {
                required: true,
              })}
            />
            <div className="input-group-prepend">
              <span className="input-group-text">Preço de Compra R$:</span>
            </div>
            <input
              type="number"
              className="form-control"
              {...register("preco", {
                required: true,
                min: 5000,
                max: 100000
              })}
            />
            <div className="input-group-append">
              <input
                type="submit"
                className="btn btn-primary"
                value="Adicionar"
              />
            </div>
          </div>
        </form>
        <div
          className={
            (errors.acao || errors.setor || errors.empresa || errors.preco) &&
            "alert alert-danger"
          }
        >
          {errors.acao && (
            <span>O Codigo da ação dever ser preenchido em (até 30 caracteres); </span>
          )}
          {errors.setor && <span>Setor deve ser selecionado; </span>}

          {errors.preco && (
            <span>Preço deve ser preenchido (entre 5000 e 100000); </span>
          )}
        </div>
        </div>
      
        <div className="col-sm-5 mt-2">
          <div className="input-group-prepend">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Codigo da Ação</th>
              <th>Setor</th>
              <th>Nome da Empresa</th>
              <th>Preço R$</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((stock) => {
              return (
                <tr key={stock.acao}>
                  <td>{stock.acao}</td>
                  <td>{stock.setor}</td>
                  <td>{stock.empresa}</td>
                  <td>{stock.preco}</td>
                  <td></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        </div>
        </div>
      </div>
    
  )
}
export default Appbody
