import "bootstrap/dist/css/bootstrap.min.css";

import Index from "./router/index";

function App() {
  console.log("process.env.REACT_APP_BE_BASE_URI", process.env.REACT_APP_BE_BASE_URI)
  return (
    <div className="App">
      <Index />
    </div>
  );
}

export default App;
