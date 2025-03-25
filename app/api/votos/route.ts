import { NextResponse } from "next/server"
import { verificarEstudianteVoto, guardarVoto } from "@/lib/data"

export async function POST(request) {
  try {
    const { nombre, grado, candidatoId } = await request.json()

    // Validate input
    if (!nombre || !grado || !candidatoId) {
      return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 })
    }

    // Check if student has already voted
    const yaVoto = await verificarEstudianteVoto(nombre, grado)
    if (yaVoto) {
      return NextResponse.json({ error: "Ya has registrado tu voto anteriormente" }, { status: 400 })
    }

    // Save the vote
    await guardarVoto(nombre, grado, candidatoId)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error registrando voto:", error)
    return NextResponse.json({ error: "Error al registrar el voto" }, { status: 500 })
  }
}

