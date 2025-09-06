let filtroBusqueda = '';
let filtroTalla = 'Todas las tallas';
let filtroOrden = 'Más populares';

const zapatillas = Array.from({ length: 50 }, (_, i) => {
  const nombre = `Modelo ${i + 1}`;
  const precio = Math.floor(59990 + Math.random() * 40000); // precios entre 59.990 y 99.990
  const tallaMin = 38 + Math.floor(Math.random() * 3); // 38, 39, 40
  const tallaMax = tallaMin + Math.floor(Math.random() * 5) + 1; // hasta 44
  return {
    id: i + 1,
    nombre,
    precio,
    imagen: '../assets/img/zapatillas/zapatilla.png',
    tallaMin,
    tallaMax
  };
});

const zapatillasPorPagina = 12;
let paginaActual = 1;

function renderZapatillas() {
  const grid = document.getElementById('zapatillasGrid');
  grid.innerHTML = '';

  // Filtrar por búsqueda
  let filtradas = zapatillas.filter(z => 
    z.nombre.toLowerCase().includes(filtroBusqueda.toLowerCase())
  );

  // Filtrar por talla
  if (filtroTalla !== 'Todas las tallas') {
    const tallaNum = parseInt(filtroTalla);
    filtradas = filtradas.filter(z => tallaNum >= z.tallaMin && tallaNum <= z.tallaMax);
  }

  // Ordenar
  if (filtroOrden === 'Precio: menor a mayor') {
    filtradas.sort((a, b) => a.precio - b.precio);
  } else if (filtroOrden === 'Precio: mayor a menor') {
    filtradas.sort((a, b) => b.precio - a.precio);
  }

  // Paginación
  const inicio = (paginaActual - 1) * zapatillasPorPagina;
  const fin = inicio + zapatillasPorPagina;
  filtradas.slice(inicio, fin).forEach(z => {
    const tallas = [];
    for (let t = z.tallaMin; t <= z.tallaMax; t++) tallas.push(t);

    const card = document.createElement('div');
    card.className = 'col-12 col-md-6 col-lg-3';
    card.innerHTML = `
      <div class="card producto-card shadow-sm border-0 rounded-4 h-100">
        <div class="overflow-hidden rounded-4">
          <img src="${z.imagen}" class="card-img-top producto-img" alt="${z.nombre}">
        </div>
        <div class="card-body d-flex flex-column">
          <h5 class="card-title fw-bold" style="color: var(--negro-empresa);">${z.nombre}</h5>
          <p class="card-text text-danger fw-bold mb-2">$${z.precio.toLocaleString()}</p>
          <div class="mb-3">
            <label for="talla-${z.id}" class="form-label text-muted">Talla:</label>
            <select id="talla-${z.id}" class="form-select">
              ${tallas.map(t => `<option value="${t}">${t}</option>`).join('')}
            </select>
          </div>
          <div class="mt-auto d-flex gap-2">
            <a href="producto-detalle.html?id=${z.id}" class="btn btn-danger fw-bold flex-grow-1">Ver detalle</a>
            <button class="btn btn-outline-danger fw-bold flex-grow-1" onclick="agregarAlCarrito('${z.nombre}', ${z.precio}, document.getElementById('talla-${z.id}').value, '${z.imagen}')">Añadir al carrito</button>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  renderPaginacion(filtradas.length);
}

function renderPaginacion(totalFiltradas = zapatillas.length) {
  const totalPaginas = Math.ceil(totalFiltradas / zapatillasPorPagina);
  const paginacion = document.getElementById('paginacion');
  paginacion.innerHTML = '';

  for (let i = 1; i <= totalPaginas; i++) {
    const li = document.createElement('li');
    li.className = `page-item${i === paginaActual ? ' active' : ''}`;
    li.innerHTML = `<button class="page-link">${i}</button>`;
    li.querySelector('button').onclick = () => {
      paginaActual = i;
      renderZapatillas();
      window.scrollTo({ top: document.getElementById('productos-lista').offsetTop, behavior: 'smooth' });
    };
    paginacion.appendChild(li);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Filtros
  document.getElementById('busquedaProducto').addEventListener('input', e => {
    filtroBusqueda = e.target.value;
    paginaActual = 1;
    renderZapatillas();
  });

  document.getElementById('filtroTalla').addEventListener('change', e => {
    filtroTalla = e.target.value;
    paginaActual = 1;
    renderZapatillas();
  });

  document.getElementById('ordenarPor').addEventListener('change', e => {
    filtroOrden = e.target.value;
    paginaActual = 1;
    renderZapatillas();
  });

  // Evita el submit del formulario
  document.querySelector('#productos-filtros form').addEventListener('submit', e => {
    e.preventDefault();
    renderZapatillas();
  });

  renderZapatillas();
});