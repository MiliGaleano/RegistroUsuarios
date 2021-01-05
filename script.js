let listaUsuarios = [
    {id: 1,
    nombre: 'mili',
    edad: 1993-01-27,
    sexo: 'femenino',
    mail: 'mmiligaleano@gmail.com'}
];

localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));

// fecha actual
let hoy = new Date();
let dia = hoy.getDate();
let mesMenos1 = hoy.getMonth();
let mes = mesMenos1+1;
let anio= hoy.getFullYear();
let fecha_actual = String(anio+"-"+mes+"-"+dia);

// sumar usuario a la lista del localstorage
function newUsuario(id, nombre, edad, sexo, mail){
    let listaStorage = JSON.parse(localStorage.getItem('listaUsuarios'));
    let usuario = {
        id: id,
        nombre: nombre,
        edad: edad,
        sexo: sexo,
        mail: mail
    };
    listaStorage.push(usuario);
    localStorage.setItem('listaUsuarios', JSON.stringify(listaStorage));
}

// abrir modal
function abrirModal(x){
    document.getElementById('modalForm').style.display= 'flex';
    if (x.id !== 'new') {
        document.getElementById('guardarboton').setAttribute('onclick', 'editarUsuario("'+x.id+'")');
    } else {
        document.getElementById('guardarboton').setAttribute('onclick', 'guardarUsuario()');
    }
}

// cerrar modal
function cerrarModal(x){
    if (x === 'modalForm') {
    document.getElementById(x).style.display= 'none';
    document.getElementById('formulario').reset();
    } else {
    document.getElementById(x).style.display= 'none';
    }
}

// nuevo usuario
function guardarUsuario(){
    let listaStorage = JSON.parse(localStorage.getItem('listaUsuarios'));
    let usNombre = document.getElementById('nombre').value;
    let usEdad = document.getElementById('fechanac').value;
    let usSexo;
    let usSexorad = document.getElementsByClassName('radio');
        for (let i = 0; i < usSexorad.length; i++) {
            if (usSexorad[i].checked) {
                usSexo = usSexorad[i].value;
                break;
              }
        }
    let usMail = document.getElementById('mail').value;
    if (usMail.includes('@') === false){
        alert('Email inválido');
    } else if (usNombre === '' || usEdad === '' || usSexo === undefined || usMail === '') {
        alert('Completar todos los campos');
    } else {
    newUsuario(listaStorage.length+1, (usNombre[0].toUpperCase() + usNombre.slice(1)), usEdad, usSexo, usMail);
    cerrarModal('modalForm');
    console.log(listaStorage);
    cargarUsuarios(0,5);
    paginado();
    }
}

// imprimir lista en pantalla
function cargarUsuarios(x,y) {
    let listaStorage = JSON.parse(localStorage.getItem('listaUsuarios'));
    for (let a = 0; a < 5; a++) {
        document.getElementById('usuario'+a).style.display = 'none';  
    }
    for (let i = x; i < y; i++) {
                if (listaStorage[i] === undefined) {  
                break;
            }
            calcularEdad(listaStorage[i].edad);
            document.getElementById('usuario'+(i-x)).style.display = 'flex';
            let columnasUsuario = document.getElementsByClassName('us'+(i-x));
                for (let j = 0; j < columnasUsuario.length; j++) {
                    columnasUsuario[j].innerHTML = listaStorage[i][Object.keys(listaStorage[0])[j]];
                }  
            document.getElementsByClassName('columna3')[i+(1-x)].innerHTML= aniosUsuario;
            let botonesUsuario = document.getElementsByClassName('boton'+(i-x));
            botonesUsuario[0].setAttribute("onclick", "abrirModal(this)");
            botonesUsuario[0].setAttribute("id", "editar-"+listaStorage[i].id);
            botonesUsuario[1].setAttribute("onclick", "modalEliminar(this)");
            botonesUsuario[1].setAttribute("id", "borrar-"+listaStorage[i].id);
    }
    // pagina actual
    let paginas = document.getElementsByClassName('pagina');
    let actual = x/5;
    for (let i = 0; i < paginas.length; i++) {
        paginas[i].setAttribute('class', 'pagina');
    }
    paginas[actual].setAttribute('class', 'pagina actual');
}

// modal confirmación eliminar
function modalEliminar(x) {
    let listaStorage = JSON.parse(localStorage.getItem('listaUsuarios'));
    let numUsuario = x.id[x.id.length-1];
    document.getElementById('modalEliminar').style.display = 'flex';
    document.getElementById('h1eliminar').innerHTML = 'Se eliminará a '+listaStorage[numUsuario-1].nombre;
    document.getElementsByClassName('eliminarusuario')[0].setAttribute('id', 'usuario'+(numUsuario-1));
}

// eliminar usuario
function eliminarUsuario(x) {
    let listaStorage = JSON.parse(localStorage.getItem('listaUsuarios'));
    let usuarioAEliminar = x.id[x.id.length-1];
    console.log(listaStorage[usuarioAEliminar].nombre);
    listaStorage.splice( usuarioAEliminar, 1 );
            for (let i = usuarioAEliminar; i < listaStorage.length; i++) {
            listaStorage[i].id =  listaStorage[i].id - 1;
        }
    document.getElementById('modalEliminar').style.display = 'none';
    localStorage.setItem('listaUsuarios', JSON.stringify(listaStorage));
    cargarUsuarios(0,5);
    paginado();
}

// editar usuario
function editarUsuario(x) {
    let listaStorage = JSON.parse(localStorage.getItem('listaUsuarios'));
    let usuarioAEditar = x[x.length-1];
    let usNombre = document.getElementById('nombre').value;
    if (usNombre !== "") {
        listaStorage[usuarioAEditar-1].nombre = (usNombre[0].toUpperCase() + usNombre.slice(1));
    }
    let usEdad = document.getElementById('fechanac').value;
    if (usEdad !== "") {
        listaStorage[usuarioAEditar-1].edad = usEdad;
    }
    let usSexo;
    let usSexorad = document.getElementsByClassName('radio');
        for (let i = 0; i < usSexorad.length; i++) {
            if (usSexorad[i].checked) {
                usSexo = usSexorad[i].value;
                break;
              }
        }
    if (usSexo !== undefined) {
        listaStorage[usuarioAEditar-1].sexo = usSexo;
    }
    let usMail = document.getElementById('mail').value;
    if (usMail !== "") {
        if (usMail.includes('@') === true){
            listaStorage[usuarioAEditar-1].mail = usMail;
        } else {
            alert('Email inválido');
        }
    }
    document.getElementById('modalForm').style.display = 'none';
    localStorage.setItem('listaUsuarios', JSON.stringify(listaStorage));
    cargarUsuarios(0,5);
    paginado();
    document.getElementById('formulario').reset();
}

// agregar paginado
function paginado() {
    let listaStorage = JSON.parse(localStorage.getItem('listaUsuarios'));
        if (listaStorage.length > 5) {
        document.getElementsByClassName('pagina')[0].style.display = 'flex';
        document.getElementsByClassName('pagina')[0].setAttribute("onclick", "cargarUsuarios(0,5);");
        document.getElementsByClassName('pagina')[1].style.display = 'flex';
        document.getElementsByClassName('pagina')[1].setAttribute("onclick", "cargarUsuarios(5,10);");
        if (listaStorage.length > 10) {
            let numdepags = Math.ceil(listaStorage.length/5);
            let padre = document.getElementById('paginado');
                    while (padre.firstChild) {
                        padre.removeChild(padre.firstChild);
                        }
                for (let i = 0; i <  Math.ceil(numdepags); i++) {
                    let pagnueva = document.createElement('div');
                    pagnueva.setAttribute("class", "pagina");
                    pagnueva.setAttribute("id", 'pag'+i);
                    pagnueva.setAttribute("onclick", "cargarUsuarios("+(i*5)+","+((i*5)+5)+")");
                    pagnueva.style.display = 'flex';
                    pagnueva.innerHTML = i+1;
                    padre.appendChild(pagnueva);
                }
                document.getElementById('pag0').setAttribute('class', 'pagina actual');
        } 
    }
}

// calcular edad usuario
let aniosUsuario;
function calcularEdad(x) {
    let fechaUsuario = x.split('-');
    if (mes === parseInt(fechaUsuario[1])){
        if (dia < fechaUsuario[2]){
            aniosUsuario = (anio - fechaUsuario[0]) - 1;
        } else {
            aniosUsuario = anio - fechaUsuario[0];
        }
    } else if (mes < fechaUsuario[1]){
        aniosUsuario = (anio - fechaUsuario[0]) - 1;
    } else {
        aniosUsuario = anio - fechaUsuario[0];
    }
    console.log(aniosUsuario);
    return aniosUsuario;
}

cargarUsuarios(0,5);
paginado();
