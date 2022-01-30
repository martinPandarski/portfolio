import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./components/Index/Index";
import { AnimateSharedLayout } from "framer-motion";

function App() {
  return (
    <AnimateSharedLayout type="crossfade">
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/:id" element={<Index />} />
        </Routes>
      </Router>
    </AnimateSharedLayout>
  );
}

export default App;
