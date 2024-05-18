/* eslint-disable react/prop-types */
import {  MaterialReactTable,  useMaterialReactTable} from "material-react-table";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { ErrorAlert, SuccessAlert } from "../../Alerts";
import { errorStore, successStore, tokenStatusStore } from "../../../store/useStore"
import { parseValues, parseUpdateValues } from "../Products/helpers/validation/parseValues";
import { useCreate,  useUpdate,  useDelete,  useGet,  checkTokenStatus,} from "../../../hooks/queryData";
import { useEffect, useMemo, useState } from "react";
import { validateData } from "../Products/helpers/validation/validators";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

export const TableContainer = ({ keyword }) => {
  const [validationErrors, setValidationErrors] = useState({});

  const errorStatus = errorStore.getState().state.statusCode;
  const successStatus = successStore.getState().state.statusCode;
  const token = localStorage.getItem("token");  
  const tokenState = tokenStatusStore.getState().state.isLoggedIn;
  const navigate = useNavigate();
  useEffect(() => {
    if (!tokenState) {
      navigate("/");
      localStorage.removeItem("token");
    }
  }, [tokenState, navigate]);


  console.log(
    validationErrors?.handle, 
    validationErrors?.title,
    validationErrors?.description,
    validationErrors?.sku,
    validationErrors?.grams,
    validationErrors?.price,
    validationErrors?.comparePrice,
    validationErrors?.barcode,
    validationErrors?.isActiveA,
  )

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
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.handle,
          helperText: validationErrors?.handle,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              handle: undefined,
            }),
        },
      },
      {
        accessorKey: "title",
        header: "Title",
        enableEditing: true,
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.title,
          helperText: validationErrors?.tile,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              title: undefined,
            }),
        },
      },
      {
        accessorKey: "description",
        header: "Description",
        enableEditing: true,
        muiEditTextFieldProps: {
          error: !!validationErrors?.description,
          helperText: validationErrors?.description,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              description: undefined,
            }),
        },
      },
      {
        accessorKey: "sku",
        header: "SKU",
        enableEditing: true,
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.sku,
          helperText: validationErrors?.sku,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              sku: undefined,
            }),
        },
      },
      {
        accessorKey: "grams",
        header: "Grams",
        enableEditing: true,
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.grams,
          helperText: validationErrors?.grams,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              grams: undefined,
            }),
        },
      },
      {
        accessorKey: "stock",
        header: "Stock",
        enableEditing: true,
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.stock,
          helperText: validationErrors?.stock,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              stock: undefined,
            }),
        },
      },
      {
        accessorKey: "price",
        header: "Price",
        enableEditing: true,
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.price,
          helperText: validationErrors?.price,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              price: undefined,
            }),
        },
      },
      {
        accessorKey: "comparePrice",
        header: "Compare Price",
        enableEditing: true,
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.comparePrice,
          helperText: validationErrors?.comparePrice,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              comparePrice: undefined,
            }),
        },
      },
      {
        accessorKey: "barcode",
        header: "Barcode",
        enableEditing: true,
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.barcode,
          helperText: validationErrors?.barcode,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              barcode: undefined,
            }),
        },
      },
      {
        accessorKey: "isActive",
        header: "Is Active",
        enableEditing: true,
        type: "boolean",
        editSelectOptions:
          [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.isActive,
          helperText: validationErrors?.isActive,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              isActive: undefined,
            }),
        },
      },
    ],
    [validationErrors]
  );

  //call GET hook
  const { data: fetchedData = [], isError, isFetching, isLoading} = useGet(keyword);

  //call CREATE hook
  const { mutateAsync: createData, isPending: isCreating } = useCreate(keyword);

  //call UPDATE hook
  const { mutateAsync: updateData, isPending: isUpdating } = useUpdate(keyword);
 
  //call DELETE hook
  const { mutateAsync: deleteData, isPending: isDeleting } = useDelete(keyword);


  //CREATE action
  const handleCreateData = async ({ values, table }) => {
    const parsedValues = parseValues(values)
    const newValidationErrors = validateData(parsedValues);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createData(parsedValues);
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveData = async ({ values, table }) => {
    const parsedValues = parseUpdateValues(values)
    const newValidationErrors = validateData(parsedValues);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateData(parsedValues);
    table.setEditingRow(null); //exit editing mode
  };

  //DELETE action
  const openDeleteConfirmModal = (row) => {
    if (window.confirm(`Are you sure you want to delete this ${keyword.toLowerCase()}?`)) {
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
        overflow: "auto",
        maxHeight: "600px",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: "200px",
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
      showProgressBars: isFetching || checkTokenStatus(token),
    },
  });

  return (
    <div className="md:flex-col md:justify-center md:items-center md:w-full md:h-screen md:p-8">
      {errorStatus ? <ErrorAlert /> : null }
      {successStatus ? <SuccessAlert /> : null}
      <MaterialReactTable table={table} />
    </div>
  );
};
