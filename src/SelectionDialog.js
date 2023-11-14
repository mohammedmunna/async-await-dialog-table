// SelectionDialog.js
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";

const SelectionDialog = ({ open, onClose, data }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);

  console.log({ selectedItems });

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 }
  ];

  const handleSelectionChange = (selection) => {
    console.log({ selection });

    setSelectedItems(selection);
    setRowSelectionModel(selection);
  };

  const handleConfirm = () => {
    onClose(selectedItems);
  };

  const getSelectedItems = () => {
    return new Promise((resolve) => {
      onClose((selectedItems) => {
        resolve(selectedItems);
      });
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent style={{ height: 400, width: 600 }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={10}
          checkboxSelection
          rowSelectionModel={rowSelectionModel}
          onRowSelectionModelChange={handleSelectionChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SelectionDialog;
