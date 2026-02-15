const express = require("express");
const cors = require("cors");
const v1 = require("./src/routes/v1");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.json());
const router = express.Router();

router.use("/api/v1", v1);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
