let carritoId = 1;
function agregarAlCarrito(nombre, precio, talla, imagen) {
  const lista = document.getElementById('carritoLista');
  const id = carritoId++;
  const item = document.createElement('li');
  item.id = 'carrito-item-' + id;
  item.className = 'd-flex align-items-center mb-3';
  item.innerHTML = `
    <img src="${imagen}" alt="${nombre}" class="me-2 rounded" width="60" height="40">
    <div class="flex-grow-1">
      <span class="fw-bold">${nombre}</span>
      <span class="ms-2 badge bg-secondary">Talla ${talla}</span>
    </div>
    <span class="fw-bold text-danger ms-2">$${precio.toLocaleString()}</span>
    <button class="btn btn-sm btn-outline-danger ms-2" onclick="eliminarDelCarrito(${id})">✕</button>
  `;
  lista.appendChild(item);
  actualizarTotalCarrito();
  mostrarMensajeCarrito(`¡${nombre} (Talla ${talla}) añadida al carrito!`);
}

function mostrarMensajeCarrito(texto) {
  const cont = document.getElementById('mensajeCarrito');
  cont.innerHTML = `
    <div class="alert alert-success alert-dismissible fade show" role="alert">
      ${texto}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
    </div>
  `;
  setTimeout(() => {
    cont.innerHTML = '';
  }, 2000);
}

function eliminarDelCarrito(id) {
  // Elimina el elemento del DOM
  const item = document.getElementById('carrito-item-' + id);
  if (item) item.remove();
  actualizarTotalCarrito();
}

function actualizarTotalCarrito() {
  const lista = document.getElementById('carritoLista');
  let total = 0;
  lista.querySelectorAll('li').forEach(li => {
    const price = li.querySelector('.text-danger');
    if (price) total += parseInt(price.textContent.replace(/\D/g, ''));
  });
  document.getElementById('carritoTotal').textContent = `$${total.toLocaleString()}`;
}