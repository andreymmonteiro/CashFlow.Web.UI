import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css"; // <-- Tailwind import

const container = document.getElementById("root");
const root = createRoot(container); // create the root
root.render(<App />); // render your app
