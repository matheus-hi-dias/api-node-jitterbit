function mapOrderInput(data) {
  return {
    orderId: data.numeroPedido.split('-')[0],
    value: data.valorTotal,
    creationDate: new Date(data.dataCriacao),
    items: data.items.map(item => ({
      productId: Number(item.idItem),
      quantity: item.quantidadeItem,
      price: item.valorItem,
    })),
  };
}

export { mapOrderInput };
