import { FormProvider, useForm } from "react-hook-form";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import Notes from "./pages/Notes";
import Register from "./pages/Register";

function PrivateRoute({ children }: any) {
  if (localStorage.key(0) !== "token") {
    return <Navigate to="/login" />;
  }

  return children;
}

function App() {
  const formMethods = useForm();

  return (
    <FormProvider {...formMethods}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Notes />
                </PrivateRoute>
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FormProvider>
  );
}

export default App;
