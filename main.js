let chismes = [];

//---------------------------------------------------------

// Cargar y guardar

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

//---------------------------------------------------------

// LLamadas de eventos

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

//------------------------------------------------------

// Funciones

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

function mostrarChismes() {
  cargarChismes();
  const contenedorDeChismes = document.getElementById("listaDeChismes");
  contenedorDeChismes.innerHTML = "";
  const bannerChismes = document.createElement("div");
  bannerChismes.innerHTML = `<div>ID</div><div>Description</div><div>Category</div><div>Date</div><div>Status</div>`;
  bannerChismes.classList.add("plantillaChismes");
  contenedorDeChismes.append(bannerChismes);

  chismes.forEach(function (chisme, id) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("plantillaChismes");
    newDiv.innerHTML = `<div>${id + 1}</div><div>${
      chisme.descripcion
    }</div><div>${chisme.categoria}</div><div>${chisme.fecha}</div><div>${
      chisme.estado
    }</div>`;
    contenedorDeChismes.appendChild(newDiv);
  });
}
mostrarChismes();

function actualizarListaChismes(listaFiltrada) {
  const contenedorDeChismes = document.getElementById("listaDeChismes");
  contenedorDeChismes.innerHTML = "";
  const bannerChismes = document.createElement("div");
  bannerChismes.innerHTML = `<div>ID</div><div>Description</div><div>Category</div><div>Date</div><div>Status</div>`;
  bannerChismes.classList.add("plantillaChismes");
  contenedorDeChismes.append(bannerChismes);

  listaFiltrada.forEach(function (chisme, id) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("plantillaChismes");
    newDiv.innerHTML = `<div>${id + 1}</div><div>${
      chisme.descripcion
    }</div><div>${chisme.categoria}</div><div>${chisme.fecha}</div><div>${
      chisme.estado
    }</div>`;
    contenedorDeChismes.appendChild(newDiv);
  });
}

function filtrarChismes() {
  cargarChismes();
  const filtroCategoria = document.getElementById("filtroCategoria").value;

  let chismesEncontrados;

  if (filtroCategoria === "All") {
    chismesEncontrados = chismes;
    console.log(chismesEncontrados);
  } else {
    chismesEncontrados = chismes.filter(function (chisme) {
      return chisme.categoria === filtroCategoria;
    });
  }
  actualizarListaChismes(chismesEncontrados);
}
