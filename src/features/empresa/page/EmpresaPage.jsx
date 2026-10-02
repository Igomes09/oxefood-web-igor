import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import CrudActions from "../../../shared/components/CrudActions";
import Footer from "../../../shared/components/Footer";
import Menu from "../../../shared/components/Menu";
import NewButton from "../../../shared/components/NewButton";
import { buscarPorId, listar, remover } from "../../../shared/services/crudService";
import { MAPPING_CONTROLLER_EMPRESA } from "../service/EmpresaService";

export default function EmpresaPage() {

    const [lista, setLista] = useState([]);
    const navigate = useNavigate();
    const [Empresa, setEmpresa] = useState({
        id: null,
        cnpj: "",
        nomeEmpresarial: "",
        nomeFantasia: "",
        fone: "",
        foneAlternativo: ""
    });


    useEffect(() => {
        carregar();
    }, []);

    async function carregar() {

        const data = await listar(MAPPING_CONTROLLER_EMPRESA);
        setLista(data);
    }

    function editar(id) {

        navigate(`/Empresa-form/${id}`);
    }



    async function confirmarRemover(id) {
        if (!confirm("Deseja realmente excluir esta Empresa?")) {
            return;
        }

        try {

            await remover(MAPPING_CONTROLLER_EMPRESA, id);
            await carregar();
            toast.success("Empresa removida com sucesso!");

        } catch (erro) {

            console.error(erro);
            toast.error("Erro ao tentar remover a Empresa.");
        }
    }

    async function detalhar(id) {

        try {

            const data = await buscarPorId(
                MAPPING_CONTROLLER_EMPRESA,
                id
            );

            setEmpresa({
                id: data.id,
                nomeEmpresarial: data.nomeEmpresarial ?? "",
                nomeFantasia: data.nomeFantasia ?? "",
                cnpj: data.cnpj ?? "",
                fone: data.fone ?? "",
                foneAlternativo: data.foneAlternativo ?? ""
            });

            document.getElementById('modal-detalhar').showModal()

        } catch (erro) {
            toast.error("Erro ao carregar Empresa.");
        }
    }


    return (
        <div>
            <Menu />
            <Breadcrumbs items={[
                { label: "Empresa" },
                { label: "Listar" }
            ]} />

            <div style={{ marginTop: '40px', marginLeft: '10%', marginRight: '10%' }}>
                <div className="overflow-x-auto shadow-sm">
                    <div className="flex items-center justify-between mb-6" style={{ marginTop: '20px', marginLeft: '10px', marginRight: '10px' }}>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Empresas
                        </h1>
                        <NewButton destino="/Empresa-form" />
                    </div>
                    <div className="divider divider-info" />
                    <div className="overflow-x-auto" style={{ marginTop: '30px' }}>
                        <table className="table table-zebra">
                            <thead>
                                <tr style={{ textAlign: 'center' }}>
                                    <th>Cnpj</th>
                                    <th>Nome Empresarial</th>
                                    <th>Nome Fantasia</th>
                                    <th>Telefone</th>
                                    <th>Telefone Alternativo</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lista.map(empresa => (
                                    <tr key={empresa.id}>
                                        <td style={{ width: '50%' }}>{empresa.nomeEmpresarial}</td>
                                        <td style={{ textAlign: 'center' }}>{empresa.cnpj}</td>
                                        <td style={{ textAlign: 'center' }}>{empresa.nomeFantasia}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            <CrudActions
                                                onDetail={() => detalhar(empresa.id)}
                                                onEdit={() => editar(empresa.id)}
                                                onDelete={() => confirmarRemover(empresa.id)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <dialog id="modal-detalhar" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Dados do Empresa</h3>
                    <div className="divider" />
                    <p className="py-4">
                        <strong>Nome:</strong> {Empresa.nomeFantasia}
                    </p>
                    <p className="py-4">
                        <strong>CNPJ:</strong> {Empresa.cnpj}
                    </p>
                    <p className="py-4">
                        <strong>Nome Empresarial:</strong> {Empresa.nomeEmpresarial}
                    </p>
                    <p className="py-4">
                        <strong>Fone:</strong> {Empresa.fone}
                    </p>
                    <p className="py-4">
                        <strong>Fone Alternativo:</strong> {Empresa.foneAlternativo}
                    </p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Fechar</button>
                        </form>
                    </div>
                </div>
            </dialog>

            <Footer />
        </div>
    );
}
