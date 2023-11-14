import "./styles.css";
import React, { useState, useCallback } from "react";
import Button from "@mui/material/Button";
import SelectionDialog from "./SelectionDialog";

const data = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" }
];

export default function App() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [resolvePromise, setResolvePromise] = useState(null);

  const createPromise = useCallback(async () => {
    let resolver;
    const promise = new Promise((resolve, reject) => {
      resolver = resolve;
    });
    return [promise, resolver];
  }, []);

  const handleCloseDialog = (selectedItems) => {
    console.log("##handleCloseDialog Selected Items: ", selectedItems);
    if (resolvePromise) {
      resolvePromise(selectedItems);
      setResolvePromise(null);
    }
    setDialogOpen(false);
  };

  const openDialogAndWaitForSelection = async () => {
    setDialogOpen(true);
    const [promise, resolver] = await createPromise();
    setResolvePromise(() => resolver);
    return promise;
  };

  const handleButtonClick = async () => {
    const selectedItems = await openDialogAndWaitForSelection();
    console.log("##OpenFunc Selected Items: ", selectedItems);
  };

  return (
    <div className="App">
      <h1>DataGrid Selection Dialog</h1>
      <Button variant="contained" color="primary" onClick={handleButtonClick}>
        Open Selection Dialog
      </Button>

      <SelectionDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        data={data}
      />
    </div>
  );
}
