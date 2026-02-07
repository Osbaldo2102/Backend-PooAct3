const Pedido = require('../models/pedido.model');
const PedidosRepository = require('../repositories/pedidos.repository');

class PedidosController {
    constructor() {
        this.pedidosRepository = new PedidosRepository();
    }

    getAll(req, res) {
        res.json(this.pedidosRepository.getAll());
    }

    getById(req, res) {
        const id = Number(req.params.id);
        const pedido = this.pedidosRepository.getById(id);

        if (!pedido) {
            return res.status(404).json({ error: "Pedido no encontrado" });
        }

        res.json(pedido);
    }

    create(req, res) {
        const { producto, cantidad } = req.body;

        if (!producto || typeof cantidad !== "number" || cantidad <= 0) {
            return res.status(400).json({ error: 'Datos inválidos para crear el pedido' });
        }

        if (cantidad <= 0) {
            return res.status(400).json({ error: 'La cantidad debe ser mayor a 0' });
        }

        const nuevoPedido = new Pedido(producto, cantidad);
        const pedidoCreado = this.pedidosRepository.create(nuevoPedido);
        res.status(201).json(pedidoCreado);
    }

    update(req, res) {
        const id = Number(req.params.id);
        const { estado } = req.body;

        const pedido = this.pedidosRepository.getById(id);
        if (!pedido) {
            return res.status(404).json({ error: "Pedido no encontrado" });
        }

        if (pedido.estado !== 'pendiente') {
            return res.status(400).json({ error: 'Solo se pueden actualizar pedidos en estado pendiente' });
        }

        if (!["confirmado", "cancelado"].includes(estado)) {
            return res.status(400).json({ error: 'Estado inválido. Solo se permiten "confirmado" o "cancelado"' });
        }

        const pedidoActualizado = this.pedidosRepository.update(id, { estado });
        res.json(pedidoActualizado);
    }

    delete(req, res) {
        const id = Number(req.params.id);
        const pedido = this.pedidosRepository.getById(id);

        if (!pedido) {
            return res.status(404).json({ error: "Pedido no encontrado" });
        }

        if (pedido.estado !== 'pendiente') {
            return res.status(400).json({ error: 'Solo se pueden eliminar pedidos en estado pendiente' });
        }

        this.pedidosRepository.delete(id);
        res.status(204).send();
    }
}

module.exports = new PedidosController();