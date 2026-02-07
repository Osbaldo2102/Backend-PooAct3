const express = require('express');
const router = express.Router();
const PedidosController = require('../controllers/pedidos.controller');

router.get("/", (req, res) => PedidosController.getAll(req, res));
router.get("/:id", (req, res) => PedidosController.getById(req, res));
router.post("/", (req, res) => PedidosController.create(req, res));
router.put("/:id", (req, res) => PedidosController.update(req, res));
router.delete("/:id", (req, res) => PedidosController.delete(req, res));

module.exports = router;