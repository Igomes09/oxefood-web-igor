import { useEffect, useState } from "react";
import { IMaskInput } from "react-imask";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BackButton from "../../../shared/components/BackButton";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import Footer from "../../../shared/components/Footer";
import Menu from "../../../shared/components/Menu";
import SaveButton from "../../../shared/components/SaveButton";
import {
  atualizar,
  buscarPorId,
  cadastrar,
} from "../../../shared/services/crudService";
import { MAPPING_CONTROLLER_PRODUTO } from "../../produto/service/produtoService";
import { MAPPING_CONTROLLER_CATEGORIA_PRODUTO } from "../../produto/service/categoriaProdutoService";

export default function ProdutoForm() {
  const { idProduto } = useParams();
  const [listaCategoria, setListaCategoria] = useState([]);

  const [produto, setProduto] = useState({
    id: null,
    codigo: "",
    titulo: "",
    descricao: "",
    valorUnitario: "",
    tempoEntregaMaximo: "",
    tempoEntregaMinimo: "",
  });

  useEffect(() => {
    if (idProduto) {
      carregarProduto();
    }

    carregarCategoriasProduto();
  }, [idProduto]);

  async function carregarProduto() {
    try {
      const data = await buscarPorId(MAPPING_CONTROLLER_PRODUTO, idProduto);

      setProduto({
        id: data.id,
        idCategoria: data.categoria.id ?? "",
        titulo: data.titulo ?? "",
        codigo: data.codigo ?? "",
        descricao: data.descricao ?? "",
        valorUnitario: data.valorUnitario ?? "",
        tempoEntregaMaximo: data.tempoEntregaMaximo ?? "",
        tempoEntregaMinimo: data.tempoEntregaMinimo ?? "",
      });
    } catch (erro) {
      toast.error("Erro ao carregar Produto.");
    }
  }

  async function carregarCategoriasProduto() {
    try {
      const data = await listar(MAPPING_CONTROLLER_CATEGORIA_PRODUTO);
      setListaCategoria(data);
    } catch (erro) {
      console.log(erro);
      toast.error("Erro ao carregar as categorias de produto.");
    }
  }

  async function salvar() {
    try {
      if (idProduto) {
        await atualizar(MAPPING_CONTROLLER_PRODUTO, produto);
        toast.success("Produto alterado com sucesso!");
      } else {
        await cadastrar(MAPPING_CONTROLLER_PRODUTO, produto);
        toast.success("Produto cadastrado com sucesso!");
      }
    } catch (erro) {
      toast.error("Erro ao salvar Produto.");
    }
  }

  return (
    <div>
      <Menu />

      {idProduto ? (
        <Breadcrumbs items={[{ label: "Produto" }, { label: "Alterar" }]} />
      ) : (
        <Breadcrumbs items={[{ label: "Produto" }, { label: "Cadastrar" }]} />
      )}

      <div style={{ marginTop: "40px", marginLeft: "10%", marginRight: "10%" }}>
        <div className="overflow-x-auto shadow-sm">
          <div
            className="flex items-center justify-between mb-6"
            style={{
              marginTop: "20px",
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            <h1 className="text-3xl font-bold text-gray-800">
              {idProduto ? "Alterar Produto" : "Novo Produto"}
            </h1>
          </div>

          <div className="divider divider-info" />

          <div className="overflow-x-auto" style={{ padding: "30px" }}>
            <form>
              <div className="flex w-full">
                <div
                  className="card rounded-box grid grow p-8"
                  style={{ padding: "30px" }}
                >
                  <fieldset className="fieldset w-full">
                    <label className="fieldset-legend" htmlFor="titulo">
                      Titulo
                    </label>
                    <input
                      type="text"
                      id="titulo"
                      className="input input-bordered w-full"
                      value={produto.titulo}
                      onChange={(e) =>
                        setProduto({ ...produto, titulo: e.target.value })
                      }
                    />
                  </fieldset>
                </div>
                <div
                  className="card rounded-box grid grow p-8"
                  style={{ padding: "30px" }}
                >
                  <fieldset className="fieldset w-full">
                    <label className="fieldset-legend" htmlFor="codigo">
                      Código
                    </label>
                    <IMaskInput
                      mask="00000"
                      value={produto.codigo}
                      onAccept={(value) =>
                        setProduto({ ...produto, codigo: value })
                      }
                      className="input input-bordered w-full"
                      id="codigo"
                    />
                  </fieldset>
                </div>
              </div>

              <div>
                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Categoria</legend>
                    <select
                      className="select  w-full"
                      value={produto.idCategoria}
                      onChange={(e) =>
                        setProduto({ ...produto, idCategoria: e.target.value })
                      }
                    >
                      <option value="">Selecione ...</option>
                      {listaCategoria.map((categoria, index) => (
                        <option key={index} value={categoria.id}>
                          {categoria.descricao}
                        </option>
                      ))}
                    </select>
                  </fieldset>
                </div>
              </div>

              <div className="flex w-full">
                <div
                  className="card rounded-box grid grow p-8"
                  style={{ padding: "30px" }}
                >
                  <fieldset className="fieldset w-full">
                    <label className="fieldset-legend" htmlFor="valorUnitario">
                      Valor Unitário (R$)
                    </label>
                    <IMaskInput
                      mask="0.00"
                      value={produto.valorUnitario}
                      onAccept={(value) =>
                        setProduto({ ...produto, valorUnitario: value })
                      }
                      className="input input-bordered w-full"
                      id="valorUnitario"
                    />
                  </fieldset>
                </div>
                <div
                  className="card rounded-box grid grow p-8"
                  style={{ padding: "30px" }}
                >
                  <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend" htmlFor="descricao">
                      Descrição
                    </legend>
                    <input
                      type="text"
                      id="descricao"
                      className="input input-bordered w-full"
                      value={produto.descricao}
                      onChange={(e) =>
                        setProduto({ ...produto, descricao: e.target.value })
                      }
                    />
                  </fieldset>
                </div>

                <div
                  className="card rounded-box grid grow p-8"
                  style={{ padding: "30px" }}
                >
                  <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend" htmlFor="tempoEntrega">
                      Tempo Máximo de Entrega
                    </legend>
                    <input
                      type="text"
                      id="tempoEntregaMaximo"
                      className="input input-bordered w-full"
                      value={produto.tempoEntregaMaximo}
                      onChange={(e) =>
                        setProduto({
                          ...produto,
                          tempoEntregaMaximo: e.target.value,
                        })
                      }
                    />
                  </fieldset>
                </div>
              </div>
              <div className="flex w-full">
                <div
                  className="card rounded-box grid grow p-8"
                  style={{ padding: "30px" }}
                >
                  <div style={{ marginTop: "50px", textAlign: "left" }}>
                    <BackButton destino="/produto" />
                  </div>
                </div>
                <div
                  className="card rounded-box grid grow p-8"
                  style={{ padding: "30px" }}
                >
                  <div style={{ marginTop: "50px", textAlign: "right" }}>
                    <SaveButton save={() => salvar()} />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
