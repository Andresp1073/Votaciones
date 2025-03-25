import Link from "next/link"
import { getCandidatos } from "@/lib/data"

export default async function CandidatosPage() {
  const candidatos = await getCandidatos()

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-blue-800">Candidatos a Personero</h1>
            <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
              Volver al inicio
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {candidatos.map((candidato) => (
              <div key={candidato.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">{candidato.nombre}</h2>
                  <p className="text-gray-600 mb-4">Grado: {candidato.grado}</p>

                  <h3 className="font-medium text-gray-800 mb-2">Propuestas:</h3>
                  <ul className="list-disc pl-5 mb-4 text-gray-700">
                    {candidato.propuestas.map((propuesta, index) => (
                      <li key={index}>{propuesta}</li>
                    ))}
                  </ul>

                  <Link
                    href={`/votar?candidatoId=${candidato.id}`}
                    className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition duration-200"
                  >
                    Votar por este candidato
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

