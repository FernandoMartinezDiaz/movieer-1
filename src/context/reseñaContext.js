import React, { useEffect, createContext, useState } from "react";
import { database } from "../components/db";

// Crear el contexto de las notas
export const ReseñasContext = createContext({});

export const ReseñaContextProvider = (props) => {
  // Obtener los valores iniciales para el contexto
  // se obtienen desde los props
  const { reseñas: initialReseñas, children } = props;

  // Almacenar los valores en el estado
  const [lasReseñas, setLasReseñas] = useState(initialReseñas);
  

  // Cargar u obtener las notas
  useEffect(() => {
    refreshReseñas();
  }, []);

  const refreshReseñas = () => {
    return database.getReseñas(setLasReseñas);
  };
  
  const addNewReseña = async (pelicula, reseña) =>
  {
    await database.insertReseñas(pelicula,reseña, refreshReseñas);
    return refreshReseñas();
  };

  // Crear el objeto de contexto
  const reseñaContext = {
    lasReseñas,
    addNewReseña,
  };

  // Pasar los valores al proveedor y retornarlo
  return (
    <ReseñasContext.Provider value={reseñaContext}>
      {children}
    </ReseñasContext.Provider>
  );
};