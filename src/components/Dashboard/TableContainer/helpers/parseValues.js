export const parseValues = (values) => {

    // eslint-disable-next-line no-unused-vars
    const { id, isActive, stock, price, comparePrice, ...rest } = values;
    

    let newValues;
    if (isActive === "") {
        newValues = {
            stock: Number(stock),
            price: Number(price),
            comparePrice: Number(comparePrice),
            ...rest
        }
    } else if (isActive === true || isActive == false) {
        newValues = {
            stock: Number(stock),
            price: Number(price),
            comparePrice: Number(comparePrice),
            isActive,
            ...rest
        }
    }

    return newValues;

}

export const parseUpdateValues = (values) => {

    const parsedValues = parseValues(values);

    const { id, ...rest } = parsedValues;

    return {
        id,
        rest
    };

}