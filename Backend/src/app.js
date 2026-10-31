const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()
const frontendOrigin = process.env.FRONTEND_URL?.replace(/\/$/, "")
const allowedOrigins = [ frontendOrigin, "http://localhost:5173" ].filter(Boolean)

if (process.env.NODE_ENV === "production" && !frontendOrigin) {
    throw new Error("FRONTEND_URL is required in production.")
}

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true)
        }

        return callback(new Error("Origin is not allowed by CORS."))
    },
    credentials: true
}))

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)



module.exports = app