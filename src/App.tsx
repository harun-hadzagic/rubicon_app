import DefaultPage from "./pages/DefaultPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DetailsPage from "./pages/DetailsPage";
import Header from "./components/header/Header";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/search" />} />
          <Route path="/search" element={<DefaultPage />} />
          <Route path="/movies/:id" element={<DetailsPage type="movie" />} />
          <Route path="/tv/:id" element={<DetailsPage type="tv" />} />
          <Route path="/*" element={<Navigate to="/search" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
