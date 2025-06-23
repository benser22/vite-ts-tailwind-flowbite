import { Suspense } from "react";
import { BrowserRouter } from "react-router";
import { AppRouter } from "./router/router";

function App() {
  return (
    <main>
      <BrowserRouter>
        <Suspense fallback={<p>loading</p>}>
          <AppRouter />
        </Suspense>
      </BrowserRouter>
    </main>
  );
}

export default App;
