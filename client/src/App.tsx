import "./App.scss";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import HomeView from "./pages/HomeView";
import SingleProduct from "./pages/SingleProduct";
import NoMatch from "./pages/NoMatch";
import AllProducts from "./pages/AllProducts";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomeView />} />
        <Route path="products">
          <Route index element={<AllProducts />}></Route>
          <Route path=":id" element={<SingleProduct />}></Route>
        </Route>
      </Route>
      <Route path="*" element={<NoMatch />}></Route>
    </Routes>
  );
}

export default App;
