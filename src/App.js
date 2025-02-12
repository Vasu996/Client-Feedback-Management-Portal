import { AuthProvider } from "./context/AuthContext";
import FileUpload from "./components/FileUpload";
import Login from "./Pages/Login";

function App() {
  return (
    <AuthProvider>
      <>
        <Login />
        <h1>Employee Training & Knowledge Base</h1>
        <FileUpload />
      </>
    </AuthProvider>
  );
}

export default App;
