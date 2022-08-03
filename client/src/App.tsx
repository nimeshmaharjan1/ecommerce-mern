import "./App.scss";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import HomeView from "./pages/HomeView";
import SingleProduct from "./components/products/SingleProduct";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomeView />} />
        <Route path="/product/:id" element={<SingleProduct />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
