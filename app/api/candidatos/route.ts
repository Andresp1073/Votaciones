import { NextResponse } from "next/server"
import { getCandidatos } from "@/lib/data"

export async function GET() {
  try {
    const candidatos = await getCandidatos()
    return NextResponse.json(candidatos)
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener los candidatos" }, { status: 500 })
  }
}

