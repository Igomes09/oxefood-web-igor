import { useEffect, useState } from "react";
import { IMaskInput } from 'react-imask';
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import BackButton from "../../../shared/components/BackButton";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import Footer from "../../../shared/components/Footer";
import Menu from "../../../shared/components/Menu";
import SaveButton from "../../../shared/components/SaveButton";
import { atualizar, buscarPorId, cadastrar } from "../../../shared/services/crudService";
import { MAPPING_CONTROLLER_EMPRESA } from "../../empresa/service/empresaService";

export default function EmpresaForm() {

    const { idEmpresa } = useParams();
    const [empresa, setEmpresa] = useState({
        id: null,
        nomeFantasia: "",
        nomeEmpresarial: "",
        cnpj: "",
        fone: "",
        foneAlternativo: "",

    });

    useEffect(() => {

        if (idEmpresa) {
            carregarEmpresa();
        }


    }, [idEmpresa]);

    async function carregarEmpresa() {

        try {

            const data = await buscarPorId(
                MAPPING_CONTROLLER_EMPRESA,
                idEmpresa
            );

            setEmpresa({
                id: data.id,
                nomeFantasia: data.nomeFantasia ?? "",
                nomeEmpresarial: data.nomeEmpresarial ?? "",
                cnpj: data.cnpj ?? "",
                fone: data.fone ?? "",
                foneAlternativo: data.foneAlternativo ?? ""
            });

        } catch (erro) {
            toast.error("Erro ao carregar Empresa.");
        }
    }



    async function salvar() {

        try {
            if (idEmpresa) {
                await atualizar(MAPPING_CONTROLLER_EMPRESA, empresa);
                toast.success("Empresa alterada com sucesso!");
            } else {
                await cadastrar(MAPPING_CONTROLLER_EMPRESA, empresa);
                toast.success("Empresa cadastrada com sucesso!");
            }
        } catch (erro) {
            toast.error("Erro ao salvar Empresa.");
        }
    }


    return (

        <div>
            <Menu />

            {idEmpresa ?
                <Breadcrumbs items={[
                    { label: "Empresa" },
                    { label: "Alterar" }
                ]} />
                :
                <Breadcrumbs items={[
                    { label: "Empresa" },
                    { label: "Cadastrar" }
                ]} />
            }

            <div style={{ marginTop: '40px', marginLeft: '10%', marginRight: '10%' }}>

                <div className="overflow-x-auto shadow-sm">

                    <div className="flex items-center justify-between mb-6" style={{ marginTop: '20px', marginLeft: '10px', marginRight: '10px' }}>

                        <h1 className="text-3xl font-bold text-gray-800">
                            {idEmpresa ? "Alterar Empresa" : "Nova Empresa"}
                        </h1>

                    </div>

                    <div className="divider divider-info" />

                    <div className="overflow-x-auto" style={{ padding: '30px' }}>
                        <form>

                            <div className="flex w-full" >
                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>

                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="nome">Nome Fantasia</label>
                                        <input
                                            type="text"
                                            id="nomeFantasia"
                                            className="input input-bordered w-full"
                                            value={empresa.nomeFantasia}
                                            onChange={(e) =>
                                                setEmpresa({ ...empresa, nomeFantasia: e.target.value })
                                            }
                                        />
                                    </fieldset>
                                </div>

                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>

                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="nome">Nome Empresarial (Razão Social)</label>
                                        <input
                                            type="text"
                                            id="nomeEmpresarial"
                                            className="input input-bordered w-full"
                                            value={empresa.nomeEmpresarial}
                                            onChange={(e) =>
                                                setEmpresa({ ...empresa, nomeEmpresarial: e.target.value })
                                            }
                                        />
                                    </fieldset>

                                </div>
                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>

                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="cnpj">CNPJ</label>
                                        <IMaskInput
                                            mask="00.000.000/0000-00"
                                            value={empresa.cnpj}
                                            onAccept={(value) =>
                                                setEmpresa({ ...empresa, cnpj: value })
                                            }
                                            className="input input-bordered w-full"
                                            id="cnpj"
                                        />
                                    </fieldset>

                                </div>
                            </div>

                            <div className="flex w-full" >
                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>

                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="fone">Fone</label>
                                        <IMaskInput
                                            mask="(00) 0000-0000"
                                            value={empresa.fone}
                                            onAccept={(value) =>
                                                setEmpresa({ ...empresa, fone: value })
                                            }
                                            className="input input-bordered w-full"
                                            id="fone"
                                        />
                                    </fieldset>

                                </div>
                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>

                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="foneAlternativo">Fone Alternativo</label>
                                        <IMaskInput
                                            mask="(00) 0000-0000"
                                            value={empresa.foneAlternativo}
                                            onAccept={(value) =>
                                                setEmpresa({ ...empresa, foneAlternativo: value })
                                            }
                                            className="input input-bordered w-full"
                                            id="foneAlternativo"
                                        />
                                    </fieldset>
                                </div>
                            </div>
                            <div className="flex w-full" >
                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>

                                    <div style={{ marginTop: '50px', textAlign: 'left' }}>
                                        <BackButton destino="/empresa" />
                                    </div>

                                </div>
                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>

                                    <div style={{ marginTop: '50px', textAlign: 'right' }}>
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
