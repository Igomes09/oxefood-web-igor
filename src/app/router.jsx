import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClienteForm from "../features/cliente/page/ClienteForm";
import ClientePage from "../features/cliente/page/ClientePage";
import EmpresaForm from "../features/empresa/page/EmpresaForm";
import EmpresaPage from "../features/empresa/page/EmpresaPage";
import ProdutoForm from "../features/produto/page/ProdutoForm";
import ProdutoPage from "../features/produto/page/ProdutoPage";

export default function Router() {

    return (

        <BrowserRouter>

            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/cliente" element={<ClientePage />} />
                <Route path="/cliente-form/:idCliente?" element={<ClienteForm />} />
                <Route path="/produto" element={<ProdutoPage />} />
                <Route path="/produto-form/:idProduto?" element={<ProdutoForm />} />
                <Route path="/empresa-form/:idEmpresa?" element={<EmpresaForm />} />
                <Route path="/empresa" element={<EmpresaPage />} />
            </Routes>

        </BrowserRouter>

    );
}
