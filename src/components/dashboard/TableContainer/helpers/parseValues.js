export const parseCreateValues = (values) => {

    const { id, isActive, stock, price, comparePrice, ...rest } = values;
    
    // string to number
    const stockNumber = Number(stock);
    const priceNumber = Number(price);
    const compareNumber = Number(comparePrice);

    const newValues = {
        stock: stockNumber,
        price: priceNumber,
        comparePrice: compareNumber,
        ...rest
    }

    return newValues;

}

export const parseUpdateValues = (values) => {

    const { id, ...rest } = values;

    const newValues = {
        ...rest
    }

    return {
        id,
        newValues
    };

}