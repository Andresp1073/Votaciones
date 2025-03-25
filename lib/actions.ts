"use server"

import { revalidatePath } from "next/cache"
import { verificarEstudianteVoto, guardarVoto } from "./data"

export async function registrarVoto(formData) {
  try {
    const { nombre, grado, candidatoId } = formData

    // Validate input
    if (!nombre || !grado || !candidatoId) {
      return { error: "Todos los campos son requeridos" }
    }

    // Check if student has already voted
    const yaVoto = await verificarEstudianteVoto(nombre, grado)
    if (yaVoto) {
      return { error: "Ya has registrado tu voto anteriormente" }
    }

    // Save the vote
    await guardarVoto(nombre, grado, candidatoId)

    // Revalidate the paths
    revalidatePath("/")
    revalidatePath("/candidatos")
    revalidatePath("/admin")
    revalidatePath("/admin/estudiantes")

    return { success: true }
  } catch (error) {
    console.error("Error registrando voto:", error)
    return { error: "Error al registrar el voto" }
  }
}

