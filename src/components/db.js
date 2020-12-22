import React from "react";
import * as SQLite from "expo-sqlite";

// https://docs.expo.io/versions/latest/sdk/sqlite/
// Crea y abre la base de datos
const db = SQLite.openDatabase("movieerReseña.db");

// Funcionalidades de la base de datos

const getReseñas = (setReseñasFunc) => {
  db.transaction((tx) => {
    tx.executeSql(
      "select * from reseñas",
      [],
      (_, { rows: { _array } }) => {
        setReseñasFunc(_array);
        //console.log(_array);
      },
      (_t, error) => {
        console.log("Error al momento de obtener las reseña");
        console.log(error);
      },
      (_t, _success) => {
        console.log("Reseñas obtenidas");
      }
    );
  });
};

// Obtener la reseña por el id
const getReseñaById = (id, setReseñaFunc) => {
  db.transaction((tx) => {
    tx.executeSql(
      "select * from reseñas where id = ?",
      [id],
      (_, { rows: { _array } }) => {
        setReseñaFunc(_array);
      },
      (_t, error) => {
        console.log("Error al momento de obtener las reseñas");
        console.log(error);
      },
      (_t, _success) => {
        console.log("Reseña obtenidas");
      }
    );
  });
};

// Insertar notas
const insertReseñas = async (pelicula, reseña, successFunc) => {
  db.transaction(
    (tx) => {
      tx.executeSql("insert into reseñas ( pelicula ,reseña, status) values (?,?,?)", [pelicula,
        reseña,
        "NUEVA",
      ]);
    },
    (_t, error) => {
      console.log("Error al insertar la reseña");
      console.log(error);
    },
    (_t, _success) => {
      successFunc;
    }
  );
};

// Borrar la base de datos
const dropDatabaseTableAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql("drop table reseñas");
      },
      (_t, error) => {
        console.log("Error al eliminar la tabla de reseñas");
        reject(error);
      },
      (_t, result) => {
        resolve(result);
      }
    );
  });
};

// Creación de la tabla de notas
const setupDatabaseTableAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists reseñas (id integer primary key autoincrement, pelicula text not null, reseña text not null, status text not null);"
        );
      },
      (_t, error) => {
        console.log("Error al momento de crear la tabla");
        console.log(error);
        reject(error);
      },
      (_t, success) => {
        console.log("Tabla creada!");
        resolve(success);
      }
    );
  });
};

// Agrega una nota por defecto
const setupReseñasAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql("insert into reseñas (pelicula, reseña, status) values (?,?,?)", [
          "Movieer",
          "Bienvenido a FastReseñas",
          "NUEVA",
        ]);
      },
      (_t, error) => {
        console.log("Error al momento de insertar los valores por defecto");
        console.log(error);
        reject(error);
      },
      (_t, success) => {
        resolve(success);
      }
    );
  });
};

export const database = {
  getReseñas,
  insertReseñas,
  dropDatabaseTableAsync,
  setupDatabaseTableAsync,
  setupReseñasAsync,
  getReseñaById,
};