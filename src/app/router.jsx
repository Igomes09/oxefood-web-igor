import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmpresaPage from "../features/empresa/page/EmpresaPage";
import Home from "../features/home/page/Home";
import ProdutoPage from "../features/produto/page/ProdutoPage";

import ClienteForm from "../features/cliente/page/ClienteForm";
import ClientePage from "../features/cliente/page/ClientePage";

export default function Router() {

   return (

       <BrowserRouter>

           <Routes>
               <Route path="/cliente" element={<ClientePage />} />
               <Route path="/cliente-form" element={<ClienteForm />} />
               <Route path="/home" element={<Home />}/>
               <Route path="/produto" element={<ProdutoPage />}/>
               <Route path="/empresa" element={<EmpresaPage />}/>
           </Routes>

       </BrowserRouter>

   );
}
