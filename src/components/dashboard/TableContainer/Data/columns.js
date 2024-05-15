export function selectColumn({validationErrors, setValidationErrors, usStates, keyword}) {
  const columnsColecction = {
    // ... return product column configuration
    product: [
      {
        accessorKey: 'id',
        header: 'Id',
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: 'handle',
        header: 'Handle',
        enableEditing: false,
      },
      {
        accessorKey: 'title',
        header: 'Title',
        enableEditing: true,
      },
      {
        accessorKey: 'description',
        header: 'Description',
        enableEditing: true,
      },
      {
        accessorKey: 'sku',
        header: 'SKU',
        enableEditing: true,
      },
      {
        accessorKey: 'grams',
        header: 'Grams',
        enableEditing: true,
      },
      {
        accessorKey: 'stock',
        header: 'Stock',
        enableEditing: true,
      },
      {
        accessorKey: 'price',
        header: 'Price',
        enableEditing: true,
      },
      {
        accessorKey: 'comparePrice',
        header: 'Compare Price',
        enableEditing: true,
      },
      {
        accessorKey: 'barcode',
        header: 'Barcode',
        enableEditing: false,
      },
      {
        accessorKey: 'isActive',
        header: 'Is Active',
        enableEditing: true,
      },
    ],

    usersFake: [
      {
        accessorKey: 'id',
        header: 'Id',
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: 'firstName',
        header: 'First Name',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.firstName,
          helperText: validationErrors?.firstName,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              firstName: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.lastName,
          helperText: validationErrors?.lastName,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              lastName: undefined,
            }),
        },
      },
      {
        accessorKey: 'email',
        header: 'Email',
        muiEditTextFieldProps: {
          type: 'email',
          required: true,
          error: !!validationErrors?.email,
          helperText: validationErrors?.email,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              email: undefined,
            }),
        },
      },
      {
        accessorKey: 'state',
        header: 'State',
        editVariant: 'select',
        editSelectOptions: usStates,
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.state,
          helperText: validationErrors?.state,
        },
      },
    ]
    
  }

  return columnsColecction[keyword];
}
  
  
  

  