import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClienteForm from "../features/cliente/page/ClienteForm";
import ClientePage from "../features/cliente/page/ClientePage";
import EmpresaForm from "../features/empresa/page/EmpresaForm";
import EmpresaPage from "../features/empresa/page/EmpresaPage";
import Home from "../features/home/page/Home";
import ProdutoForm from "../features/produto/page/ProdutoForm";
import ProdutoPage from "../features/produto/page/ProdutoPage";
import AuthenticationForm from "features/authentication/page/AuthenticationForm"

export default function Router() {

    return (

        <BrowserRouter>

            <Routes>
                <Route path="/" element={<AuthenticationForm />} />
                 <Route 
                    path="/home" 
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    } 
                />

                <Route 
                    path="/cliente" 
                    element={
                        <ProtectedRoute>
                            <ClientePage />
                        </ProtectedRoute>
                    } 
                />

                <Route path="/cliente-form/:idCliente?" element={
                        <ProtectedRoute>
                            <ClienteForm />
                        </ProtectedRoute>
                    } />

                <Route path="/produto" element={
                        <ProtectedRoute>
                            <ProdutoPage />
                        </ProtectedRoute>
                    } />
                <Route path="/produto-form/:idProduto?" element={
                        <ProtectedRoute>
                            <ProdutoForm />
                        </ProtectedRoute>
                    } />
                <Route path="/empresa-form/:idEmpresa?" element={
                        <ProtectedRoute>
                            <EmpresaForm />
                        </ProtectedRoute>
                    } />
                <Route path="/empresa" element={
                        <ProtectedRoute>
                            <EmpresaPage />
                        </ProtectedRoute>
                    } />
            </Routes>

        </BrowserRouter>

    );
}
