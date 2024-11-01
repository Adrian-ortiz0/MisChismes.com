let chismes = [];

function guardarChismes() {
  localStorage.setItem("chismes", JSON.stringify(chismes));
}

function cargarChismes() {
  const chismesParse = localStorage.getItem("chismes");
  if (chismesParse) {
    chismes = JSON.parse(chismesParse);
  } else {
    chismes = [];
  }
}

const chismeForm = document.getElementById("chismeForm");
chismeForm.addEventListener("click", function (e) {
  e.preventDefault();
});

const btnGuardarChisme = document.getElementById("btnGuardarChisme");
btnGuardarChisme.addEventListener("click", function () {
  guardandoChisme();
});

const filtroCategoria = document.getElementById("filtroCategoria");
filtroCategoria.addEventListener("change", function () {
  filtrarChismes();
});

const filtroEstado = document.getElementById("filtroEstado");
filtroEstado.addEventListener("click", function () {
  filtrarChismesPorEstado();
});

const busqueda = document.getElementById("busqueda");
busqueda.addEventListener("input", function () {
  filtrarPorDescripcion();
});

function guardandoChisme() {
  cargarChismes();

  const descripcion = document.getElementById("descripcion").value;
  const categoria = document.getElementById("categoria").value;
  const fecha = document.getElementById("fecha").value;
  const estado = document.getElementById("estado").value;
  const comentarios = document.getElementById("comentarios").value;

  const descripcionModificada = descripcion.toLowerCase();

  const chismeExistente = chismes.find(function (chisme) {
    return chisme.descripcion === descripcionModificada;
  });

  if (!descripcionModificada) {
    alert("La descripción no puede estar vacía.");
    return;
  }

  if (chismeExistente) {
    alert("¡Ya ha sido creado un chisme con esta descripción!");
    return;
  }
  const newChisme = {
    descripcion: descripcionModificada,
    categoria: categoria,
    fecha: fecha,
    estado: estado,
    comentarios: comentarios,
  };
  chismes.push(newChisme);
  guardarChismes();
  alert("Chisme registrad con exito!");
  mostrarChismes();
}

function eliminarChisme(index) {
  cargarChismes();
  chismes.splice(index, 1);
  guardarChismes();
  mostrarChismes();
}

function mostrarChismes() {
  cargarChismes();
  const contenedorDeChismes = document.getElementById("listaDeChismes");
  contenedorDeChismes.innerHTML = "";
  const bannerChismes = document.createElement("div");
  bannerChismes.innerHTML = `<div>ID</div><div>Description</div><div>Category</div><div>Date</div><div>Status</div><div>Action</div>`;
  bannerChismes.classList.add("bannerChismes");
  contenedorDeChismes.append(bannerChismes);

  chismes.forEach(function (chisme, id) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("plantillaChismes");
    newDiv.innerHTML = `
      <div>${id + 1}</div>
      <div>${chisme.descripcion}</div>
      <div>${chisme.categoria}</div>
      <div>${chisme.fecha}</div>
      <div>${chisme.estado}</div>
      <div><button class="btn-delete" onclick="eliminarChisme(${id})">Delete</button></div>
    `;
    contenedorDeChismes.appendChild(newDiv);
  });
}

function actualizarListaChismes(listaFiltrada) {
  const contenedorDeChismes = document.getElementById("listaDeChismes");
  contenedorDeChismes.innerHTML = "";
  const bannerChismes = document.createElement("div");
  bannerChismes.innerHTML = `<div>ID</div><div>Description</div><div>Category</div><div>Date</div><div>Status</div><div>Action</div>`;
  bannerChismes.classList.add("bannerChismes");
  contenedorDeChismes.appendChild(bannerChismes);

  listaFiltrada.forEach(function (chisme, id) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("plantillaChismes");
    newDiv.innerHTML = `
      <div>${id + 1}</div>
      <div>${chisme.descripcion}</div>
      <div>${chisme.categoria}</div>
      <div>${chisme.fecha}</div>
      <div>${chisme.estado}</div>
      <div><button class="btn-delete" onclick="eliminarChisme(${chismes.indexOf(
        chisme
      )})">Delete</button></div>
    `;
    contenedorDeChismes.appendChild(newDiv);
  });
}

function filtrarChismes() {
  cargarChismes();
  const filtroCategoria = document.getElementById("filtroCategoria").value;

  let chismesEncontrados;

  if (filtroCategoria === "All") {
    chismesEncontrados = chismes;
  } else {
    chismesEncontrados = chismes.filter(function (chisme) {
      return chisme.categoria === filtroCategoria;
    });
  }
  actualizarListaChismes(chismesEncontrados);
}

function filtrarChismesPorEstado() {
  cargarChismes();
  const filtroEstado = document.getElementById("filtroEstado").value;

  let chismesEncontrados;

  if (filtroEstado === "All") {
    chismesEncontrados = chismes;
  } else {
    chismesEncontrados = chismes.filter(function (chisme) {
      return chisme.estado === filtroEstado;
    });
  }
  actualizarListaChismes(chismesEncontrados);
}

function filtrarPorDescripcion() {
  cargarChismes();
  const busqueda = document.getElementById("busqueda").value;
  let chismesEncontrados;

  if (busqueda === "") {
    chismesEncontrados = chismes;
  } else {
    chismesEncontrados = chismes.filter(function (chisme) {
      return chisme.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    });
  }

  actualizarListaChismes(chismesEncontrados);
}

mostrarChismes();
