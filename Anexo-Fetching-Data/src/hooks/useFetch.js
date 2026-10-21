import { useState, useEffect } from "react";

export function useFetch(url) {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    let cancelado = false;

    async function traerDatos() {
      try {
        setCargando(true);
        setError(null);

        const respuesta = await fetch(url);

        if (!respuesta.ok) {
          throw new Error("El servidor respondió con estado: " + respuesta.status);
        }

        const json = await respuesta.json();
        if (!cancelado) setDatos(json);
      } catch (e) {
        if (!cancelado) setError(e.message);
      } finally {
        if (!cancelado) setCargando(false);
      }
    }

    traerDatos();

    return () => {
      cancelado = true;
    };
  }, [url]);

  return { datos, cargando, error };
}