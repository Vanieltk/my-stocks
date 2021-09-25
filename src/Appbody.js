import React, { useState, useEffect} from 'react'
import { set, useForm } from "react-hook-form";
import "./table.css"

const Appbody = () => {

  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  const [lista, setLista] = useState([]);
  const [alterar, setAlterar] = useState(false);
  const [data_id, setData_id] = useState(0);

  const onSubmit = (data, e) => {
    data.id= new Date().getTime()
    console.log(data);

    const stocks = localStorage.getItem("stocks")
      ? JSON.parse(localStorage.getItem("stocks"))
      : "";
                    
    localStorage.setItem("stocks", JSON.stringify([...stocks, data]));

    setLista([...lista, data]);

    setValue("acao", "")
    setValue("setor", "")
    setValue("empresa", "")
    setValue("preco", "")
  }

  const ano_atual = new Date().getFullYear();

  useEffect(() => {
    setLista(localStorage.getItem("stocks")
    ? JSON.parse(localStorage.getItem("stocks"))
    : [])
  }, [])


  const handleClick = e => {
    const tr = e.target.closest("tr");

    const id = Number(tr.getAttribute("data-id"));
    
    if (e.target.classList.contains("fa-edit")) {      

      setValue("acao", tr.cells[0].innerText);
      setValue("setor", tr.cells[1].innerText);
      setValue("empresa", tr.cells[2].innerText);
      setValue("preco", tr.cells[3].innerText);

      setAlterar(true);
      setData_id(id);

    }else if (e.target.classList.contains("fa-trash-alt")){
      const acao =tr.cells[0].innerText

      if(window.confirm(`Confirma a exclusão da Ação "${acao}"?`)){
        const novaLista = lista.filter((stock) =>{return stock.id !== id})

        localStorage.setItem("stocks", JSON.stringify(novaLista))

        setLista(novaLista)
      }
    }
  }

  const onUpdate = data => {
    const stocks = JSON.parse(localStorage.getItem("stocks"));

    const stocks2 =[]

    for(const stock of stocks){
      if (stock.id == data_id){
        data.id =data_id
        stocks2.push(data)
      }else{
        stocks2.push(stock)
      }
    }

    localStorage.setItem(stocks, JSON.stringify(stocks2))
    setLista(stocks2)

    setValue("acao", "")
    setValue("setor", "")
    setValue("empresa", "")
    setValue("preco", "")

    setAlterar(false)
  }
  return (
    <div className="row">
      <div className="col-sm-12 capa">
        <img
          src="stock.png"
          alt="My Stocks"
          className="img-fluid mx-auto d-block"
        />
      </div>

      <div className="container mt-2">
        <form onSubmit={ alterar ? handleSubmit(onUpdate) : handleSubmit(onSubmit)}>
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
                className={alterar ? "d-none" : "btn btn-primary"}
                value="Adicionar"
              />
                <input
                type="submit"
                className={alterar ?  "btn btn-success" : "d-none" }
                value="Alterar"
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
      
        <div className="container mt-2" >
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
                <tr key={stock.id} data-id={stock.id} onClick={handleClick}>
                  <td>{stock.acao}</td>
                  <td>{stock.setor}</td>
                  <td>{stock.empresa}</td>
                  <td>{stock.preco}</td>
                  <td>
                    <i class="far fa-edit text-success mr-2" title= "Alterar"></i>
                    <i class="fas fa-trash-alt" title="Exlcuir"></i>
                  </td>
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
