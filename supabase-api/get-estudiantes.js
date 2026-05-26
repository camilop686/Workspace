const url =
  "https://TU-PROYECTO.supabase.co/rest/v1/estudiantes";

const headers = {
  apikey: "TU_ANON_KEY",
  Authorization: "Bearer TU_ANON_KEY",
  "Content-Type": "application/json",
};

async function obtenerEstudiantes() {
  try {

    console.log("Consultando API...");

    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    const data = await response.json();

    console.log("Respuesta de la API:");
    console.log(data);

    console.table(data);

  } catch (error) {

    console.log("Error:");
    console.log(error);

  }
}

obtenerEstudiantes();