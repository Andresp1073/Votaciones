import { getResultadosVotacion } from "@/lib/data"
import Link from "next/link"

export default async function AdminPage() {
  const resultados = await getResultadosVotacion()

  // Calculate total votes
  const totalVotos = resultados.reduce((sum, candidato) => sum + candidato.votos, 0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-blue-800">Panel de Administración</h1>
            <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
              Volver al inicio
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Resultados de la Votación</h2>
            <p className="text-gray-600 mb-4">Total de votos: {totalVotos}</p>

            <div className="space-y-4">
              {resultados.map((candidato) => {
                const porcentaje = totalVotos > 0 ? Math.round((candidato.votos / totalVotos) * 100) : 0

                return (
                  <div key={candidato.id} className="border-b pb-4">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">
                        {candidato.nombre} ({candidato.grado})
                      </span>
                      <span className="font-medium">
                        {candidato.votos} votos ({porcentaje}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div className="bg-blue-600 h-4 rounded-full" style={{ width: `${porcentaje}%` }}></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Acciones Administrativas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/admin/estudiantes"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded text-center transition duration-200"
              >
                Ver Lista de Estudiantes
              </Link>
              <Link
                href="/admin/reset"
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded text-center transition duration-200"
              >
                Reiniciar Votación
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

