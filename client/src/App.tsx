import "./App.css";

import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./layouts/header/Header";

import Main from "./layouts/main/Main";
import Home from "./pages/Home";
const Contacts = lazy(() => import("./pages/Contacts"));
const Questions = lazy(() => import("./pages/Questions"));

const ItemsPage = lazy(() => import("./pages/itemsPages/ItemsPage"));
const ItemPage = lazy(() => import("./pages/itemsPages/ItemPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <article className="App">
      <Header />
      <Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/furniture/kitchens"
            element={
              <Suspense fallback={<>Loading...</>}>
                <ItemsPage type="kitchen" itemsPerPage={6} />
              </Suspense>
            }
          />
          <Route
            path="/furniture/kitchens/:id"
            element={
              <Suspense fallback={<>Loading...</>}>
                <ItemPage type="kitchen" />
              </Suspense>
            }
          />
          <Route
            path="/furniture/wardrobes"
            element={
              <Suspense fallback={<>Loading...</>}>
                <ItemsPage type="wardrobes" itemsPerPage={6} />
              </Suspense>
            }
          />
          <Route
            path="/furniture/wardrobes/:id"
            element={
              <Suspense fallback={<>Loading...</>}>
                <ItemPage type="wardrobes" />
              </Suspense>
            }
          />
          <Route
            path="/furniture/nightstands"
            element={
              <Suspense fallback={<>Loading...</>}>
                <ItemsPage type="nightstands" itemsPerPage={6} />
              </Suspense>
            }
          />
          <Route
            path="/furniture/nightstands/:id"
            element={
              <Suspense fallback={<>Loading...</>}>
                <ItemPage type="nightstands" />
              </Suspense>
            }
          />
          <Route
            path="/furniture/shelves"
            element={
              <Suspense fallback={<>Loading...</>}>
                <ItemsPage type="shelves" itemsPerPage={6} />
              </Suspense>
            }
          />
          <Route
            path="/furniture/shelves/:id"
            element={
              <Suspense fallback={<>Loading...</>}>
                <ItemPage type="shelves" />
              </Suspense>
            }
          />
          <Route
            path="/furniture/tables"
            element={
              <Suspense fallback={<>Loading...</>}>
                <ItemsPage type="tables" itemsPerPage={6} />
              </Suspense>
            }
          />
          <Route
            path="/furniture/tables/:id"
            element={
              <Suspense fallback={<>Loading...</>}>
                <ItemPage type="tables" />
              </Suspense>
            }
          />
          <Route
            path="/furniture/dressers"
            element={
              <Suspense fallback={<>Loading...</>}>
                <ItemsPage type="dressers" itemsPerPage={6} />
              </Suspense>
            }
          />
          <Route
            path="/furniture/dressers/:id"
            element={
              <Suspense fallback={<>Loading...</>}>
                <ItemPage type="dressers" />
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
          <Route
            path="*"
            element={
              <Suspense fallback={<>Loading...</>}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </Main>
    </article>
  );
}

export default App;
