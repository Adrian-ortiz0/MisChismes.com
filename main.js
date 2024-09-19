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
}
