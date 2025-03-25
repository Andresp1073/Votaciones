import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-blue-800 mb-6">Sistema de Votaciones Escolares</h1>
          <p className="text-lg text-gray-700 mb-8">
            Bienvenido al sistema de votaciones para la elección del personero estudiantil. Cada estudiante puede votar
            una sola vez por su candidato preferido.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <Link
              href="/votar"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition duration-200 flex flex-col items-center"
            >
              <span className="text-xl mb-2">Registrar Voto</span>
              <span className="text-sm">Ingresa tus datos y vota por tu candidato</span>
            </Link>

            <Link
              href="/candidatos"
              className="bg-white hover:bg-gray-50 text-blue-600 font-medium py-3 px-6 rounded-lg shadow-md border border-blue-200 transition duration-200 flex flex-col items-center"
            >
              <span className="text-xl mb-2">Ver Candidatos</span>
              <span className="text-sm">Conoce a los candidatos y sus propuestas</span>
            </Link>
          </div>

          <div className="mt-12">
            <Link href="/admin" className="text-blue-600 hover:text-blue-800 underline">
              Acceso Administrador
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

