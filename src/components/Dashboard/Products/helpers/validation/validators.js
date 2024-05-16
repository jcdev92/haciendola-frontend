import * as yup from 'yup';

const validationSchema = yup.object().shape({
  handle: yup.string().required('Handle is required'),
  title: yup.string().required('Title is required'),
  description: yup.string().optional(), // Optional field
  sku: yup.string().required('SKU is required').length(11, 'SKU must be 11 characters'), 
  grams: yup.string().required('Grams must be a string'),
  stock: yup.number().positive('Stock must be a positive number').integer('Stock must be an integer'), 
  price: yup.number().positive('Price must be a positive number'),
  comparePrice: yup.number().positive('Compare Price must be a positive number'),
  barcode: yup.string().required('Barcode is required').length(13, 'Barcode must be 13 characters'), 
  isActive: yup.boolean().optional()
});

export const validateData = (value) => {
  return validationSchema.validate(value, { abortEarly: false });
}


