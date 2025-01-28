import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import { TableProvider } from "./context/index.tsx";

createRoot(document.getElementById("root")!).render(
	<TableProvider>
		<App />
	</TableProvider>
);
