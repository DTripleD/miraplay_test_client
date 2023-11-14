import "./App.css";
import { Route, Routes } from "react-router-dom";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import RestrictedRoute from "./components/RestrictedRoute";
import PrivateRoute from "./components/PrivateRoute";
import { lazy } from "react";
import { toastOptions } from "./shared/toastOptions.js";

import { Toaster } from "react-hot-toast";

const SignInPage = lazy(() => import("./pages/SignInPage/SignInPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage/SignUpPage"));
const MainPage = lazy(() => import("./pages/MainPage/MainPage.jsx"));

function App() {
  const isLoading = false;

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route
            index
            element={
              <RestrictedRoute component={<SignInPage />} redirectTo="/main" />
            }
          />
          <Route
            path="/signup"
            element={
              <RestrictedRoute component={<SignUpPage />} redirectTo="/main" />
            }
          />
          <Route
            path="/main"
            element={<PrivateRoute component={<MainPage />} />}
          />
        </Route>
      </Routes>

      <Toaster toastOptions={toastOptions} />
    </>
  );
}

export default App;
