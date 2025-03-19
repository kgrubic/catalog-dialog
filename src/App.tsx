import { useState } from "react";
import "./App.css";
import Dialog from "./components/Dialog";

import CategoryDialog from "./components/CategoryDialog";

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <button className="btn" onClick={() => setIsDialogOpen(true)}>
        Open Dialog
      </button>
      <Dialog open={isDialogOpen}>
        <CategoryDialog setIsDialogOpen={setIsDialogOpen} />
      </Dialog>
    </>
  );
}

export default App;
