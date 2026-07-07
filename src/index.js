import connectDb from "./config/db.js"
import app from "./app.js"
connectDb().then(() => {
    app.listen(process.env.PORT,'0.0.0.0', () => {
        console.log(`server is running on port ${process.env.PORT}`)
    })
}).catch((err) => {
    console.log(err);
})

