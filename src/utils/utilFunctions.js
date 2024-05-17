export function clearEmptyFields(data) {
  const newData = {};
  for (let key in data) {
    if (data[key] !== "") {
      newData[key] = data[key];
    }
  }
  return newData;
}




