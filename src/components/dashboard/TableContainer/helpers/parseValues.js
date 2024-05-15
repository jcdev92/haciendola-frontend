export const parseValues = (values) => {

    // eslint-disable-next-line no-unused-vars
    const { id, isActive, stock, price, comparePrice, ...rest } = values;
    
    // string to number
    const stockNumber = Number(stock);
    const priceNumber = Number(price);
    const compareNumber = Number(comparePrice);

    let newValues;
    if (isActive === "") {
        newValues = {
            stock: stockNumber,
            price: priceNumber,
            comparePrice: compareNumber,
            ...rest
        }
    } else if (isActive === true || isActive == false) {
        newValues = {
            stock: stockNumber,
            price: priceNumber,
            comparePrice: compareNumber,
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