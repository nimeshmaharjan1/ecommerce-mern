import "./App.scss";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import HomeView from "./pages/HomeView";
import SingleProduct from "./pages/SingleProduct";
import NoMatch from "./pages/NoMatch";
import AllProducts from "./pages/AllProducts";

function App() {
  return (
    // http://10.10.30.187:5000
    // "proxy": "http://192.168.1.71:5000"
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomeView />} />
        <Route path="products">
          <Route index element={<AllProducts />}></Route>
          <Route path=":keyword" element={<AllProducts />}></Route>
        </Route>
        <Route path="product">
          <Route path=":id" element={<SingleProduct />}></Route>
        </Route>
      </Route>
      <Route path="*" element={<NoMatch />}></Route>
    </Routes>
  );
}

export default App;
