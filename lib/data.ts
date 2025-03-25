import { db } from "./db"

// Función para convertir el formato de las propuestas
function formatPropuestas(propuestas) {
  if (typeof propuestas === "string") {
    return propuestas.split("\n")
  }
  return propuestas
}

export async function getCandidatos() {
  try {
    const candidatos = await db.query("SELECT id, nombre, grado, propuestas FROM candidatos", [])

    // Formatear las propuestas como array
    return candidatos.map((candidato) => ({
      ...candidato,
      id: candidato.id.toString(), // Convertir a string para mantener compatibilidad
      propuestas: formatPropuestas(candidato.propuestas),
    }))
  } catch (error) {
    console.error("Error al obtener candidatos:", error)
    return [] // Retornar array vacío en caso de error
  }
}

export async function verificarEstudianteVoto(nombre, grado) {
  try {
    const resultado = await db.query(
      "SELECT COUNT(*) as count FROM votos WHERE nombre_estudiante = ? AND grado_estudiante = ?",
      [nombre, grado],
    )

    return resultado[0].count > 0
  } catch (error) {
    console.error("Error al verificar voto:", error)
    throw error
  }
}

export async function guardarVoto(nombre, grado, candidatoId) {
  try {
    await db.query("INSERT INTO votos (nombre_estudiante, grado_estudiante, candidato_id) VALUES (?, ?, ?)", [
      nombre,
      grado,
      candidatoId,
    ])

    return true
  } catch (error) {
    console.error("Error al guardar voto:", error)
    throw error
  }
}

export async function getResultadosVotacion() {
  try {
    const query = `
      SELECT c.id, c.nombre, c.grado, COUNT(v.id) as votos
      FROM candidatos c
      LEFT JOIN votos v ON c.id = v.candidato_id
      GROUP BY c.id, c.nombre, c.grado
      ORDER BY votos DESC
    `

    const resultados = await db.query(query, [])

    return resultados.map((resultado) => ({
      ...resultado,
      id: resultado.id.toString(), // Convertir a string para mantener compatibilidad
      votos: Number.parseInt(resultado.votos), // Asegurar que es un número
    }))
  } catch (error) {
    console.error("Error al obtener resultados:", error)
    return [] // Retornar array vacío en caso de error
  }
}

export async function getEstudiantesVotaron() {
  try {
    const query = `
      SELECT v.id, v.nombre_estudiante as nombre, v.grado_estudiante as grado, 
             c.nombre as candidato, v.fecha_voto as fecha
      FROM votos v
      JOIN candidatos c ON v.candidato_id = c.id
      ORDER BY v.fecha_voto DESC
    `

    const estudiantes = await db.query(query, [])

    return estudiantes.map((estudiante) => ({
      ...estudiante,
      id: estudiante.id.toString(), // Convertir a string para mantener compatibilidad
    }))
  } catch (error) {
    console.error("Error al obtener estudiantes:", error)
    return [] // Retornar array vacío en caso de error
  }
}

export async function reiniciarVotacion() {
  try {
    await db.query("TRUNCATE TABLE votos", [])
    return true
  } catch (error) {
    console.error("Error al reiniciar votación:", error)
    throw error
  }
}

