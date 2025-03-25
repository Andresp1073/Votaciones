import mysql from "mysql2/promise"

// Configuración de la conexión con las credenciales proporcionadas
const dbConfig = {
  host: process.env.MYSQL_HOST || "localhost",
  port: Number.parseInt(process.env.MYSQL_PORT || "3306"),
  database: process.env.MYSQL_DATABASE || "sistema_votaciones",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "root123",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
}

// Crear un pool de conexiones
const pool = mysql.createPool(dbConfig)

// Verificar la conexión
pool
  .getConnection()
  .then((connection) => {
    console.log("Conectado a la base de datos MySQL correctamente")
    connection.release()
  })
  .catch((err) => {
    console.error("Error al conectar a la base de datos:", err)
  })

export const db = {
  query: async (sql, params) => {
    try {
      const [results] = await pool.execute(sql, params)
      return results
    } catch (error) {
      console.error("Error en la consulta SQL:", error)
      throw error
    }
  },
}

