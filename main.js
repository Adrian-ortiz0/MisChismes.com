let chismesGuardados = []
let chismesContados = []

function guardarChismesGuardados(){
localStorage.setItem("chismesGuardados", JSON.stringify(chismesGuardados))
}
    
function cargarChismesGuardados(){
const chismesGuardadosParse = localStorage.getItem("chismesGuardados");
if (chismesGuardadosParse){
chismesGuardados = JSON.parse(chismesGuardadosParse);
}else{
    chismesGuardados = []
}
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------

// Todos los llamados a botones o inputs

const btnGuardarChisme = document.getElementById("btnGuardarChisme")

btnGuardarChisme.addEventListener("click", function(){
    registrarChismes()
})

const btnTodos = document.getElementById("btnTodos")

btnTodos.addEventListener("click", function(){
    traerChismes()
})

const btnLaboral = document.getElementById("btnLaboral")

btnLaboral.addEventListener("click", function(){
    traerChismesLaborales()
})

const btnFamiliar = document.getElementById("btnFamiliar")

btnFamiliar.addEventListener("click", function(){
    traerChismesFamiliares()
})

const btnPersonal = document.getElementById("btnPersonal")

btnPersonal.addEventListener("click", function(){
    traerChismesPersonales()
})

const btnGuardado = document.getElementById("btnGuardado")

btnGuardado.addEventListener("click", function(){
    traerChismesEstadoGuardado()
})

const btnContado = document.getElementById("btnContado")

btnContado.addEventListener("click", function(){
    traerChismesEstadoContado()
})

const btnEstadoTodos = document.getElementById("btnEstadoTodos")

btnEstadoTodos.addEventListener("click", function(){
    traerChismes()
})



//----------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Funciones para ejecutar algo

function registrarChismes(){
    cargarChismesGuardados()
    const descripcion = document.getElementById("descripcion").value
    const categoria = document.getElementById("categoria").value
    const fecha = document.getElementById("fecha").value
    const estado = document.getElementById("estado").value
    const comentarios = document.getElementById("comentarios").value

    if(descripcion === "" ){
        alert("Debe existir la descripción!")
    } else {
    const nuevoChisme = {
        descripcion : descripcion,
        categoria : categoria,
        fecha: fecha,
        estado : estado,
        comentarios : comentarios
    }
    chismesGuardados.push(nuevoChisme)
    guardarChismesGuardados()

    }
    
}

function trayendoChismes(){
    cargarChismesGuardados()
    const busqueda = document.getElementById("busqueda");
    busqueda.addEventListener("input", function(){
        const filtro = busqueda.value.toLowerCase();
        const chismesFiltrados = chismesGuardados.filter(function(chisme){
            return chisme.descripcion.toLowerCase().includes(filtro)
        })
        traerChismesDescripcion(chismesFiltrados)
        console.log(chismesFiltrados)
    })
}

trayendoChismes()

function traerChismesEstadoGuardado(){
    cargarChismesGuardados()
    const listaDeChismes = document.getElementById("listaDeChismes")
    listaDeChismes.innerHTML = ""
    const chismesEstadoGuardado = chismesGuardados.filter(function(chisme){
        return chisme.estado === "Guardado"
    })
    chismesEstadoGuardado.forEach(function(chisme, index){
        const newDiv = document.createElement("div")
        newDiv.classList.add("plantillaChismes")
        newDiv.innerHTML = `
        <div>
        <p>${index + 1}</p>
    </div>
        <div>
        <p>${chisme.descripcion}</p>
    </div>
    <div>
        <p>${chisme.categoria}</p>
    </div>
    <div>
        <p>${chisme.fecha}</p>
    </div>
    <div>
        <p>${chisme.estado}</p>
    </div>
    <div>
    <p>${chisme.comentarios}</p>
    </div>
    <button class="btnsChismes" id="btnEditar">
        Editar
    </button>
    <button class="btnsChismes" id="btnContar">
        Contar
    </button>
    <button class="btnsChismes" id="btnBorrar">
        Borrar
    </button>`
    listaDeChismes.append(newDiv)
    const btnBorrar = document.getElementById("btnBorrar")
    btnBorrar.addEventListener("click", function(){
        chismesGuardados.splice(index, 1)
        guardarChismesGuardados()
        window.location.href="index.html"
    })
    })
}

function traerChismesEstadoContado(){
    cargarChismesGuardados()
    const listaDeChismes = document.getElementById("listaDeChismes")
    listaDeChismes.innerHTML = ""
    const chismesEstadoContado = chismesGuardados.filter(function(chisme){
        return chisme.estado === "Contado"
    })
    chismesEstadoContado.forEach(function(chisme, index){
        const newDiv = document.createElement("div")
        newDiv.classList.add("plantillaChismes")
        newDiv.innerHTML = `
        <div>
        <p>${index + 1}</p>
    </div>
        <div>
        <p>${chisme.descripcion}</p>
    </div>
    <div>
        <p>${chisme.categoria}</p>
    </div>
    <div>
        <p>${chisme.fecha}</p>
    </div>
    <div>
        <p>${chisme.estado}</p>
    </div>
    <div>
    <p>${chisme.comentarios}</p>
    </div>
    <button class="btnsChismes" id="btnEditar">
        Editar
    </button>
    <button class="btnsChismes" id="btnContar">
        Contar
    </button>
    <button class="btnsChismes" id="btnBorrar">
        Borrar
    </button>`
    listaDeChismes.append(newDiv)
    const btnBorrar = document.getElementById("btnBorrar")
    btnBorrar.addEventListener("click", function(){
        chismesGuardados.splice(index, 1)
        guardarChismesGuardados()
        window.location.href="index.html"
    })
    })
}

function traerChismesPersonales(){
    cargarChismesGuardados()
    const listaDeChismes = document.getElementById("listaDeChismes")
    listaDeChismes.innerHTML = ""
    const chismesPersonales = chismesGuardados.filter(function(chisme){
        return chisme.categoria === "Personal"
    })
    chismesPersonales.forEach(function(chisme, index){
        const newDiv = document.createElement("div")
        newDiv.classList.add("plantillaChismes")
        newDiv.innerHTML = `
        <div>
        <p>${index + 1}</p>
    </div>
        <div>
        <p>${chisme.descripcion}</p>
    </div>
    <div>
        <p>${chisme.categoria}</p>
    </div>
    <div>
        <p>${chisme.fecha}</p>
    </div>
    <div>
        <p>${chisme.estado}</p>
    </div>
    <div>
    <p>${chisme.comentarios}</p>
    </div>
    <button class="btnsChismes" id="btnEditar">
        Editar
    </button>
    <button class="btnsChismes" id="btnContar">
        Contar
    </button>
    <button class="btnsChismes" id="btnBorrar">
        Borrar
    </button>`
    listaDeChismes.append(newDiv)
    const btnBorrar = document.getElementById("btnBorrar")
    btnBorrar.addEventListener("click", function(){
        chismesGuardados.splice(index, 1)
        guardarChismesGuardados()
        window.location.href="index.html"
    })
})
}

function traerChismesLaborales(){
    cargarChismesGuardados()
    const listaDeChismes = document.getElementById("listaDeChismes")
    listaDeChismes.innerHTML = ""
    const chismesLaborales = chismesGuardados.filter(function(chisme){
        return chisme.categoria === "Laboral"
    })
    chismesLaborales.forEach(function(chisme, index){
        const newDiv = document.createElement("div")
        newDiv.classList.add("plantillaChismes")
        newDiv.innerHTML = `
        <div>
        <p>${index + 1}</p>
    </div>
        <div>
        <p>${chisme.descripcion}</p>
    </div>
    <div>
        <p>${chisme.categoria}</p>
    </div>
    <div>
        <p>${chisme.fecha}</p>
    </div>
    <div>
        <p>${chisme.estado}</p>
    </div>
    <div>
    <p>${chisme.comentarios}</p>
    </div>
    <button class="btnsChismes" id="btnEditar">
        Editar
    </button>
    <button class="btnsChismes" id="btnContar">
        Contar
    </button>
    <button class="btnsChismes" id="btnBorrar">
        Borrar
    </button>`
    listaDeChismes.append(newDiv)
    const btnBorrar = document.getElementById("btnBorrar")
    btnBorrar.addEventListener("click", function(){
        chismesGuardados.splice(index, 1)
        guardarChismesGuardados()
        window.location.href="index.html"
    })
    })
    
}

function traerChismesFamiliares(){
    cargarChismesGuardados()
    const listaDeChismes = document.getElementById("listaDeChismes")
    listaDeChismes.innerHTML = ""
    const chismesFamiliares = chismesGuardados.filter(function(chisme){
        return chisme.categoria === "Familiar"
    })
    chismesFamiliares.forEach(function(chisme, index){
        const newDiv = document.createElement("div")
        newDiv.classList.add("plantillaChismes")
        newDiv.innerHTML = `
        <div>
        <p>${index + 1}</p>
    </div>
        <div>
        <p>${chisme.descripcion}</p>
    </div>
    <div>
        <p>${chisme.categoria}</p>
    </div>
    <div>
        <p>${chisme.fecha}</p>
    </div>
    <div>
        <p>${chisme.estado}</p>
    </div>
    <div>
    <p>${chisme.comentarios}</p>
    </div>
    <button class="btnsChismes" id="btnEditar">
        Editar
    </button>
    <button class="btnsChismes" id="btnContar">
        Contar
    </button>
    <button class="btnsChismes" id="btnBorrar">
        Borrar
    </button>`
    listaDeChismes.append(newDiv)
    const btnBorrar = document.getElementById("btnBorrar")
    btnBorrar.addEventListener("click", function(){
        chismesGuardados.splice(index, 1)
        guardarChismesGuardados()
        window.location.href="index.html"
    })
    })
    
}

function traerChismes(){
    cargarChismesGuardados()
    const listaDeChismes = document.getElementById("listaDeChismes")
    listaDeChismes.innerHTML = ""
    chismesGuardados.forEach(function(chisme, index){
        const newDiv = document.createElement("div")
        newDiv.classList.add("plantillaChismes")
        newDiv.innerHTML = `
        <div>
        <p>${index + 1}</p>
    </div>
        <div>
        <p>${chisme.descripcion}</p>
    </div>
    <div>
        <p>${chisme.categoria}</p>
    </div>
    <div>
        <p>${chisme.fecha}</p>
    </div>
    <div>
        <p>${chisme.estado}</p>
    </div>
    <div>
    <p>${chisme.comentarios}</p>
    </div>
    <button class="btnsChismes" id="btnEditar">
        Editar
    </button>
    <button class="btnsChismes" id="btnContar">
        Contar
    </button>
    <button class="btnsChismes" id="btnBorrar">
        Borrar
    </button>`
    listaDeChismes.append(newDiv)
    const btnBorrar = document.getElementById("btnBorrar")
    btnBorrar.addEventListener("click", function(){
        chismesGuardados.splice(index, 1)
        guardarChismesGuardados()
        window.location.href="index.html"
    })
    })

}

function traerChismesDescripcion(filtraditos){
    cargarChismesGuardados()
    const listaDeChismes = document.getElementById("listaDeChismes")
    listaDeChismes.innerHTML = ""
    filtraditos.forEach(function(chisme, index){
        const newDiv = document.createElement("div")
        newDiv.classList.add("plantillaChismes")
        newDiv.innerHTML = `
        <div>
        <p>${index + 1}</p>
    </div>
        <div>
        <p>${chisme.descripcion}</p>
    </div>
    <div>
        <p>${chisme.categoria}</p>
    </div>
    <div>
        <p>${chisme.fecha}</p>
    </div>
    <div>
        <p>${chisme.estado}</p>
    </div>
    <div>
    <p>${chisme.comentarios}</p>
    </div>
    <button class="btnsChismes" id="btnEditar">
        Editar
    </button>
    <button class="btnsChismes" id="btnContar">
        Contar
    </button>
    <button class="btnsChismes" id="btnBorrar">
        Borrar
    </button>`
    listaDeChismes.append(newDiv)
    const btnBorrar = document.getElementById("btnBorrar")
    btnBorrar.addEventListener("click", function(){
        chismesGuardados.splice(index, 1)
        guardarChismesGuardados()
        window.location.href="index.html"
    })
    })

}
