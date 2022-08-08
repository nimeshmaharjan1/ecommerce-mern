import "./App.scss";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import HomeView from "./pages/HomeView";
import SingleProduct from "./pages/SingleProduct";
import NoMatch from "./pages/NoMatch";
import AllProducts from "./pages/AllProducts";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

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
      <Route path="/sign-in" element={<SignIn />}></Route>
      <Route path="/sign-up" element={<SignUp />}></Route>
    </Routes>
  );
}

export default App;
