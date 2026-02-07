class PedidosRepository {
    constructor() {
        this.pedidos = [];
        this.nextID = 1;
    }

    create(pedido) {
        pedido.id = this.nextID++;
        this.pedidos.push(pedido);
        return pedido;      
    }

    getAll() {
        return this.pedidos;
    }

    getById(id) {
        return this.pedidos.find(pedido => pedido.id === id);
    }

    update(id, updatedPedido) {
        const pedido = this.getById(id);
        if (!pedido) return null;

        Object.assign(pedido, updatedPedido);
        return pedido;
    }

    delete(id) {
        const index = this.pedidos.findIndex(pedido => pedido.id === id);
        if (index === -1) return false;

        this.pedidos.splice(index, 1);
        return true;
        }

    }

    module.exports = PedidosRepository;