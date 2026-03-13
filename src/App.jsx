import AppProviders from "./app/AppProviders.jsx";
import AppRoutes from "./app/AppRoutes.jsx";

function App() {
    return (
        <AppProviders>
            <AppRoutes />
        </AppProviders>
    );
}

export default App;
