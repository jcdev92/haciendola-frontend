/* eslint-disable react/prop-types */
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { ErrorAlert, SuccessAlert } from "../../Alerts";
import {
  errorStore,
  successStore,
  tokenStatusStore,
} from "../../../store/store";
import {
  useCreate,
  useUpdate,
  useDelete,
  useGet,
  checkTokenStatus,
} from "../../../hooks/useQueryData";
import { useEffect, useMemo, useState } from "react";
import {
  validateCreateData,
  validateUpdateData,
  createObjectValidationErrors,
  processCreateData,
  processUpdateData,
} from "../Products/helpers/validators";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { getColumns } from "../Products/data/columns";

export const Table = ({ keyword }) => {
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

  const columns = useMemo(
    () => getColumns(validationErrors, setValidationErrors),
    [validationErrors, setValidationErrors]
  );

  //call GET hook
  const {
    data: fetchedData = [],
    isError,
    isFetching,
    isLoading,
  } = useGet(keyword);

  //call CREATE hook
  const { mutateAsync: createData, isPending: isCreating } = useCreate(keyword);

  //call UPDATE hook
  const { mutateAsync: updateData, isPending: isUpdating } = useUpdate(keyword);

  //call DELETE hook
  const { mutateAsync: deleteData, isPending: isDeleting } = useDelete(keyword);

  //CREATE action
  const handleCreateData = async ({ values, table }) => {
    const parsedValues = processCreateData(values);
    try {
      await validateCreateData(parsedValues);
      setValidationErrors({});
      await createData(parsedValues);
      table.setCreatingRow(null);
    } catch (newValidationErrors) {
      const validationErrorsObject =
        createObjectValidationErrors(newValidationErrors);
      setValidationErrors(validationErrorsObject);
    }
  };

  //UPDATE action
  const handleSaveData = async ({ values, table }) => {
    try {
      const { id, parsedValues } = processUpdateData(values); // Asegúrate de que esto devuelve los valores correctos
      await validateUpdateData(parsedValues);
      setValidationErrors({});
      await updateData({ id, data: parsedValues }); // Pasa los datos correctamente
      table.setEditingRow(null);
    } catch (newValidationErrors) {
      const validationErrorsObject =
        createObjectValidationErrors(newValidationErrors);
      setValidationErrors(validationErrorsObject);
    }
  };

  //DELETE action
  const openDeleteConfirmModal = (row) => {
    if (
      window.confirm(
        `Are you sure you want to delete this ${keyword.toLowerCase()}?`
      )
    ) {
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
    onCreatingRowCancel: () => {
      setValidationErrors({});
      successStore.getState().clearState();
      errorStore.getState().clearState();
    },
    onCreatingRowSave: handleCreateData,
    onEditingRowCancel: () => {
      setValidationErrors({});
      successStore.getState().clearState();
      errorStore.getState().clearState();
    },
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
          setValidationErrors({});
          successStore.getState().clearState();
          errorStore.getState().clearState();
        }}
      >
        Create New {`${keyword}`}
      </Button>
    ),

    state: {
      isLoading: isLoading || checkTokenStatus(token),
      isSaving: isCreating || isUpdating || isDeleting || checkTokenStatus(token),
      showAlertBanner: isError,
      showProgressBars: isFetching || checkTokenStatus(token),
    },
  });

  return (
    <div className="md:flex-col md:justify-center md:items-center md:w-full md:h-screen md:p-8">
      {errorStatus ? <ErrorAlert /> : null}
      {successStatus ? <SuccessAlert /> : null}
      <MaterialReactTable table={table} />
    </div>
  );
};
