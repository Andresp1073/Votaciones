"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function ResetPage() {
  const router = useRouter()
  const [confirming, setConfirming] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleReset = async () => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/admin/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        // Redirect after 2 seconds
        setTimeout(() => {
          router.push("/admin")
        }, 2000)
      } else {
        setError(data.error || "Error al reiniciar la votación")
      }
    } catch (err) {
      setError("Ocurrió un error al reiniciar la votación")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-red-600">Reiniciar Votación</h1>
            <Link href="/admin" className="text-blue-600 hover:text-blue-800 font-medium">
              Volver al panel
            </Link>
          </div>

          {success ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              La votación ha sido reiniciada exitosamente. Redirigiendo...
            </div>
          ) : (
            <>
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>
              )}

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-yellow-700">
                      <strong>Advertencia:</strong> Esta acción eliminará todos los votos registrados y no se puede
                      deshacer.
                    </p>
                  </div>
                </div>
              </div>

              {!confirming ? (
                <button
                  onClick={() => setConfirming(true)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition duration-200"
                >
                  Reiniciar Votación
                </button>
              ) : (
                <div className="space-y-4">
                  <p className="text-gray-700 font-medium">¿Estás seguro de que deseas reiniciar la votación?</p>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => setConfirming(false)}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition duration-200"
                      disabled={loading}
                    >
                      Cancelar
                    </button>

                    <button
                      onClick={handleReset}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition duration-200"
                      disabled={loading}
                    >
                      {loading ? "Procesando..." : "Confirmar Reinicio"}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

