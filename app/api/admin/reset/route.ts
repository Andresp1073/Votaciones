import { NextResponse } from "next/server"
import { reiniciarVotacion } from "@/lib/data"

export async function POST() {
  try {
    await reiniciarVotacion()
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error al reiniciar la votación:", error)
    return NextResponse.json({ error: "Error al reiniciar la votación" }, { status: 500 })
  }
}

