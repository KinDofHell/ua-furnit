import "./App.css";

import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./layouts/header/Header";

import Main from "./layouts/main/Main";
import Home from "./pages/Home";
const Contacts = lazy(() => import("./pages/Contacts"));
const Questions = lazy(() => import("./pages/Questions"));

const ItemsPage = lazy(() => import("./pages/itemsPages/ItemsPage"));

function App() {
  return (
    <article className="App">
      <Header />
      <Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/furniture/kitchen"
            element={
              <Suspense fallback={<>Loading...</>}>
                <ItemsPage type="kitchen" />
              </Suspense>
            }
          />
          <Route
            path="/furniture/bathroom"
            element={
              <Suspense fallback={<>Loading...</>}>
                <ItemsPage type="bathroom" />
              </Suspense>
            }
          />
          <Route
            path="/furniture/bedroom"
            element={
              <Suspense fallback={<>Loading...</>}>
                <ItemsPage type="bedroom" />
              </Suspense>
            }
          />
          <Route
            path="/contacts"
            element={
              <Suspense fallback={<>Loading...</>}>
                <Contacts />
              </Suspense>
            }
          />
          <Route
            path="/questions"
            element={
              <Suspense fallback={<>Loading...</>}>
                <Questions />
              </Suspense>
            }
          />
        </Routes>
      </Main>
    </article>
  );
}

export default App;
