import app from "./app.js";
import connectdb from "./utils/db.js";
const PORT = process.env.PORT || 5000;

connectdb().then(() => {
  app.listen(PORT,() => {
      console.log(`Server is up and running at PORT ${PORT}`)
    });
});
