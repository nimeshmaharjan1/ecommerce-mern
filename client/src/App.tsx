import "./App.scss";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import HomeView from "./pages/HomeView";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomeView />} />
      </Route>
    </Routes>
  );
}

export default App;
