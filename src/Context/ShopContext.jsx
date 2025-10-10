import React from "react";
import all_product from "../Components/Assets/all_product"
export var ShopContext = React.createContext(null);
var ShopContextProvider = (props) => {
    var contextValue = { all_product};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;