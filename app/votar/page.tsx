"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { registrarVoto } from "@/lib/actions"

export default function VotarPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const candidatoId = searchParams.get("candidatoId")

  const [formData, setFormData] = useState({
    nombre: "",
    grado: "",
    candidatoId: candidatoId || "",
  })

  const [candidatos, setCandidatos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    // Fetch candidatos
    fetch("/api/candidatos")
      .then((res) => res.json())
      .then((data) => {
        setCandidatos(data)
        setLoading(false)
      })
      .catch((err) => {
        setError("Error al cargar los candidatos")
        setLoading(false)
      })
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!formData.nombre.trim()) {
      setError("Por favor ingresa tu nombre completo")
      return
    }

    if (!formData.grado.trim()) {
      setError("Por favor selecciona tu grado")
      return
    }

    if (!formData.candidatoId) {
      setError("Por favor selecciona un candidato")
      return
    }

    try {
      const result = await registrarVoto(formData)

      if (result.error) {
        setError(result.error)
      } else {
        setSuccess(true)
        // Redirect after 2 seconds
        setTimeout(() => {
          router.push("/")
        }, 2000)
      }
    } catch (err) {
      setError("Ocurrió un error al registrar tu voto. Intenta nuevamente.")
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-blue-800">Registrar Voto</h1>
            <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
              Volver al inicio
            </Link>
          </div>

          {success ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              ¡Tu voto ha sido registrado exitosamente! Redirigiendo...
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>
              )}

              <div className="mb-4">
                <label htmlFor="nombre" className="block text-gray-700 font-medium mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ingresa tu nombre completo"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="grado" className="block text-gray-700 font-medium mb-2">
                  Grado
                </label>
                <select
                  id="grado"
                  name="grado"
                  value={formData.grado}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecciona tu grado</option>
                  <option value="6°">6°</option>
                  <option value="7°">7°</option>
                  <option value="8°">8°</option>
                  <option value="9°">9°</option>
                  <option value="10°">10°</option>
                  <option value="11°">11°</option>
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="candidatoId" className="block text-gray-700 font-medium mb-2">
                  Candidato
                </label>
                <select
                  id="candidatoId"
                  name="candidatoId"
                  value={formData.candidatoId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecciona un candidato</option>
                  {candidatos.map((candidato) => (
                    <option key={candidato.id} value={candidato.id}>
                      {candidato.nombre} - {candidato.grado}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-between">
                <Link
                  href="/candidatos"
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition duration-200"
                >
                  Ver candidatos
                </Link>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition duration-200"
                >
                  Registrar Voto
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

