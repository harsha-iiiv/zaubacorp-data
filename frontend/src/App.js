import Home from "./components/Home";
import CompaniesList from "./components/List";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

export default function App() {  

  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="list" element={<CompaniesList />}/>
    </Routes>
  </BrowserRouter>
  );
}
