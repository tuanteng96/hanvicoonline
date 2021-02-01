export const getPayOrder = () => {
    const PayOrder = localStorage.getItem("PayOrder");
    if (PayOrder) return JSON.parse(PayOrder);
    else return null;
};
export const removePayOrder = () => {
    localStorage.removeItem('PayOrder');
}
export const setPayOrder = (PayOrder) => {
    localStorage.setItem('PayOrder', JSON.stringify(PayOrder));
}
export const addCart = (item) => {
    let cartStr = localStorage.getItem("cart");
    if (cartStr === null) cartStr = [];
    else cartStr = JSON.parse(cartStr);
    const indexUpdate = cartStr.findIndex(obj => obj.Product.ID === item.Product.ID);
    if (indexUpdate < 0) {
        cartStr.push(item);
    } else {
        const hisQty = cartStr[indexUpdate].Quantity;
        cartStr[indexUpdate].Quantity = hisQty + item.Quantity;
    }
    localStorage.setItem("cart", JSON.stringify(cartStr));
    // for (let i = 0; i < cart.length; i++)
    //   if (cart[i].product.id === product.id) return;

    // cartStr.push(item);
    // localStorage.setItem("cart", JSON.stringify(cartStr));
};

export const decreaseCart = (id) => {
    let cartStr = localStorage.getItem("cart");
    if (cartStr === null) cartStr = [];
    else cartStr = JSON.parse(cartStr);
    const indexUpdate = cartStr.findIndex(obj => obj.Product.ID === id);
    if (indexUpdate < 0) {
        return;
    } else {
        const hisQty = cartStr[indexUpdate].Quantity;
        if (hisQty === 1) {
            cartStr.splice(indexUpdate, 1);
        } else {
            cartStr[indexUpdate].Quantity = hisQty - 1;
        }
    }
    localStorage.setItem("cart", JSON.stringify(cartStr));
}
export const incrementCart = (id) => {
    let cartStr = localStorage.getItem("cart");
    if (cartStr === null) cartStr = [];
    else cartStr = JSON.parse(cartStr);
    const indexUpdate = cartStr.findIndex(obj => obj.Product.ID === id);
    if (indexUpdate < 0) {
        return;
    } else {
        const hisQty = cartStr[indexUpdate].Quantity;
        cartStr[indexUpdate].Quantity = hisQty + 1;
    }
    localStorage.setItem("cart", JSON.stringify(cartStr));
}