import { createContext, useState } from "react";

// 1. Crear el context
export const ShowEditMenuContext = createContext();

// 2. Crear un provider
export function ShowEditMenuProvider({ children }) {
 
  const [isShowEditMenu, setIsShowEditMenu] = useState(false);
  
  const [isShowAddMenu, setIsShowAddMenu] = useState(false);
  const [ContactoID, setContactoID] = useState(null);
  
  return (
    <ShowEditMenuContext.Provider value={
      { isShowEditMenu, setIsShowEditMenu, ContactoID, setContactoID,isShowAddMenu, setIsShowAddMenu }}>
      {children}
    </ShowEditMenuContext.Provider>
  );
}
 