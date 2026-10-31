require("dotenv").config()
const app = require("./src/app")
const connectToDB = require("./src/config/database")

async function startServer() {
    const port = process.env.PORT ? Number(process.env.PORT) : 3000

    if (!Number.isInteger(port) || port < 1 || port > 65535) {
        throw new Error("PORT must be a valid TCP port number.")
    }

    await connectToDB()

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
}

startServer().catch((error) => {
    console.error("Failed to start server:", error)
    process.exitCode = 1
})