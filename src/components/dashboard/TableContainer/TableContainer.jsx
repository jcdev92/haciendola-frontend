/* eslint-disable react/prop-types */
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import {
  useCreate,
  useUpdate,
  useDelete,
  useGet,
} from "../../../hooks/queryData";
import { useState } from "react";
import { validateData } from "./helpers/validators";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useMemo } from "react";
import { Loading } from "../../Alerts/Loading";

export const TableContainer = ({ keyword }) => {
  // eslint-disable-next-line no-unused-vars
  const [validationErrors, setValidationErrors] = useState({});



  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "handle",
        header: "Handle",
        enableEditing: true,
      },
      {
        accessorKey: "title",
        header: "Title",
        enableEditing: true,
      },
      {
        accessorKey: "description",
        header: "Description",
        enableEditing: true,
      },
      {
        accessorKey: "sku",
        header: "SKU",
        enableEditing: true,
      },
      {
        accessorKey: "grams",
        header: "Grams",
        enableEditing: true,
      },
      {
        accessorKey: "stock",
        header: "Stock",
        enableEditing: true,
      },
      {
        accessorKey: "price",
        header: "Price",
        enableEditing: true,
      },
      {
        accessorKey: "comparePrice",
        header: "Compare Price",
        enableEditing: true,
      },
      {
        accessorKey: "barcode",
        header: "Barcode",
        enableEditing: false,
      },
      {
        accessorKey: "isActive",
        header: "Is Active",
        enableEditing: true,
      },
    ],
    []
  );



  const { data: fetchedData = [], isError, isFetching, isLoading } = useGet(keyword);

  //call CREATE hook
  const { mutateAsync: createData, isPending: isCreating } = useCreate(keyword);

  //call UPDATE hook
  const { mutateAsync: updateData, isPending: isUpdating } = useUpdate(keyword);

  //call DELETE hook
  const { mutateAsync: deleteData, isPending: isDeleting } = useDelete(keyword);

  //CREATE action
  const handleCreateData = async ({ values, table }) => {
    const newValidationErrors = validateData(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createData(values);
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveData = async ({ values, table }) => {
    const newValidationErrors = validateData(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateData(values);
    table.setEditingRow(null); //exit editing mode
  };

  //DELETE action
  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteData(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedData,
    createDisplayMode: "row", // ('modal', and 'custom' are also available)
    editDisplayMode: "row", // ('modal', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: "500px",
        overflow: "auto",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateData,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveData,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),

    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true);
        }}
      >
        Create New {`${keyword}`}
      </Button>
    ),

    state: {
      isLoading: isLoading,
      isSaving: isCreating || isUpdating || isDeleting,
      showAlertBanner: isError,
      showProgressBars: isFetching,
    },
  });

  return (
    <div className="flex justify-center items-center w-full h-screen p-8">
      {isLoading || isFetching ? <Loading /> : <MaterialReactTable table={table} />}
      {isError ? <p>Error loading data</p> : null}
    </div>
  );
};
