const PORT =
    process
        .env
        .PORT ??
    8001
const express = require("express")
const app =
    express()
const pool = require("./db")

// get all toods
app.get(
    "/todos",
    async (
        req,
        res
    ) => {
        try {
            const todos =
                await pool.query(
                    "SELECT * FROM todos"
                )
            res.json(
                todos.rows
            )
        } catch (error) {
            console.log(
                error
            )
        }
    }
)

app.listen(
    PORT,
    () =>
        console.log(
            `Server running on PORT ${PORT}`
        )
)
