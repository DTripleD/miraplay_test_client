import "./App.css";
import { Route, Routes } from "react-router-dom";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import RestrictedRoute from "./components/RestrictedRoute";
import PrivateRoute from "./components/PrivateRoute";
import { lazy, useEffect } from "react";
import { toastOptions } from "./shared/toastOptions.js";
import { current } from "../src/redux/auth/authOperations.js";

import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import Loader from "./components/Loader/Loader.jsx";
import { selectIsLoading } from "./redux/auth/authSelectors.js";

const SignInPage = lazy(() => import("./pages/SignInPage/SignInPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage/SignUpPage"));
const MainPage = lazy(() => import("./pages/MainPage/MainPage.jsx"));

function App() {
  const isLoading = useSelector(selectIsLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(current());
  }, [dispatch]);

  const queryClient = new QueryClient();

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route
              index
              element={
                <RestrictedRoute
                  component={<SignInPage />}
                  redirectTo="/main"
                />
              }
            />
            <Route
              path="/signup"
              element={
                <RestrictedRoute
                  component={<SignUpPage />}
                  redirectTo="/main"
                />
              }
            />
            <Route
              path="/main"
              element={<PrivateRoute component={<MainPage />} />}
            />
          </Route>
        </Routes>

        <Toaster toastOptions={toastOptions} />
      </QueryClientProvider>
    </>
  );
}

export default App;
