import express from "express";
import { addProduct,showProducts,deleteProduct,updateProduct,getProduct,displayProducts } from "../controllers/productController.js";

const Router = express.Router();


//admin routes
Router.get("/", showProducts);
Router.get("/all", displayProducts);
Router.post("/", addProduct);
Router.get("/:id", getProduct);
Router.patch("/:id", updateProduct);
Router.delete("/:id", deleteProduct);

export default Router;