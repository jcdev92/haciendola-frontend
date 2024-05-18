// src/components/Table/columnsConfig.js

export const getColumns = (validationErrors, setValidationErrors) => [
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
    type: "string",
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
    type: "string",
    muiEditTextFieldProps: {
      required: true,
      error: !!validationErrors?.title,
      helperText: validationErrors?.title,
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
    type: "string",
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
    type: "string",
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
    type: "string",
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
    type: "number",
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
    type: "number",
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
    type: "number",
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
    editSelectOptions: [
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
];
