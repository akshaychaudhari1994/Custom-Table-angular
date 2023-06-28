const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const orderController = require("./controllers/orderController");
const { default: mongoose } = require("mongoose");

const router = express.Router();

router.post("/order/create", orderController.createOder);
router.get("/order/get/:id", orderController.getOrder);
router.patch("/order/update/:id", orderController.updateOrder);
router.delete("/order/delete/:id", orderController.deleteOrder);
router.post("/order/list", orderController.getOrderList);

app.use(router);
mongoose
  .connect("mongodb://127.0.0.1:27017/basic-orders")
  .then(() => {
    console.log("database connection done");
    app.listen(3000, () => {
      console.log("app is running on 3000");
    });
  })
  .catch((error) => {
    console.log("error in connection with db");
  });
