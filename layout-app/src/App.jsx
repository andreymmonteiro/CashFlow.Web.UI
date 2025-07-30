import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";

function Dashboard() {
  return <h1>Dashboard Preview</h1>;
}
function Settings() {
  return <h1>Settings Preview</h1>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
