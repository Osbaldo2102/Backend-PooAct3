class Pedido {
  constructor(producto, cantidad) {
    this.producto = producto;
    this.cantidad = cantidad;
    this.estado = "pendiente";
  }
}

module.exports = Pedido;