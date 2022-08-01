import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomeView from "./views/HomeView";
import Header from "./components/Header";
function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomeView />}></Route>
      </Routes>
    </main>
  );
}

export default App;
