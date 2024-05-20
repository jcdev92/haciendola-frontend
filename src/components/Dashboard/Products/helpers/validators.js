import * as yup from 'yup';

const validationCreateDataSchema = yup.object().shape({
  handle: yup.string().required('Handle is required'),
  title: yup.string().required('Title is required'),
  description: yup.string().optional(),
  sku: yup.string().required('SKU is required').length(11, 'SKU must be 11 characters'), 
  grams: yup.string().required('Grams must be a string'),
  stock: yup.number().positive('Stock must be a positive number').integer('Stock must be an integer'), 
  price: yup.number().positive('Price must be a positive number'),
  comparePrice: yup.number().positive('Compare Price must be a positive number'),
  barcode: yup.string().required('Barcode is required').length(13, 'Barcode must be 13 characters'), 
  isActive: yup.boolean().optional()
});

export const validateCreateData = (value) => {
  return validationCreateDataSchema.validate(value, { abortEarly: false });
}


const validationUpdateDataSchema = yup.object().shape({
  title: yup.string().optional(),
  description: yup.string().optional(),
  sku: yup.string().length(11, 'SKU must be 11 characters'),
  grams: yup.string(),
  stock: yup.number().positive('Stock must be a positive number').integer('Stock must be an integer'),
  price: yup.number().positive('Price must be a positive number'),
  comparePrice: yup.number().positive('Compare Price must be a positive number'),
  barcode: yup.string().length(13, 'Barcode must be 13 characters'),
  isActive: yup.boolean().optional()
});

export const validateUpdateData = (value) => {
  return validationUpdateDataSchema.validate(value, { abortEarly: false });
}

export const createObjectValidationErrors = (newValidationErrors) => {
  const newArr = newValidationErrors.inner.map((error) => ({
      [error.path]: error.message,
  }));

  //transform array to object
  const newObject = Object.assign({}, ...newArr);
  return newObject;
}


 // Helper function to process data
 export const processCreateData = (values) => {
  let cleanedEmptyValues = clearEmptyValues(values);
  
  if (cleanedEmptyValues.price) {
    cleanedEmptyValues = {
      ...cleanedEmptyValues,
      price: parseFloat(cleanedEmptyValues.price),
    };
  }

  if (cleanedEmptyValues.comparePrice) {
    cleanedEmptyValues = {
      ...cleanedEmptyValues,
      comparePrice: parseFloat(cleanedEmptyValues.comparePrice),
    };
  }

  if (cleanedEmptyValues.stock) {
    cleanedEmptyValues = {
      ...cleanedEmptyValues,
      stock: parseInt(cleanedEmptyValues.stock, 10),
    };
  }

  if (cleanedEmptyValues.id) {
    delete cleanedEmptyValues.id;
  }
  
  return cleanedEmptyValues;
};

export const processUpdateData = (values) => {
  const { id, ...rest} = values
  const parsedValues = processCreateData(rest);
  return {
    id,
    parsedValues
  };
}


export function clearEmptyValues(data) {
  const newData = {};
  for (let key in data) {
    if (data[key] !== "") {
      newData[key] = data[key];
    }
  }
  return newData;
}


export const processArray = (array) => {
    array.forEach(element => {
        if (element.isActive === true) {
            element.isActive = 'YES'
        }
        if (element.isActive === false) {
            element.isActive = 'NO'
        }
    });
    return array
}

