const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	sku: /^[A-Z0-9]{1,40}$/, // Letras MAYUS, numeros 
	nombre: /^[a-zA-Z0-9À-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    proveedor: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	precio: /^\d{4,8}$/, // 4 a 8 numeros.
    descripcion: /^[a-zA-ZÀ-ÿ0-9\s]{0,200}$/, // Letras, numeros y espacios, pueden llevar acentos.
    cantidad: /^\d{1,6}$/ ,// 1 a 6 numeros.
    imagen: /(\.jpg|\.jpeg|\.png|\.gif)$/i, // Letra, numeros y 

}

const campos = {
    Sku:            false,
    Nombre:         false,
    Proveedor:      false,
    Precio:         false,
    Descripcion:    false,
    Cantidad:       false,
    tipo:           false,
    Imagen:         false

}


//variables
var boton = document.getElementById('prueba');
var lista = document.getElementById('lista');
var data = [];
var cant = 0;


boton.addEventListener("click", agregar);
document.getElementById("prueba").disabled = true;
function agregar(){
    var sku= document.getElementById('sku').value;
    var nombre= document.getElementById('nombre').value;
    var precio= parseFloat(document.getElementById('precio').value);
    var cantidad= parseFloat(document.getElementById('cantidad').value);
    var vTipo = document.getElementById('tipo').value
    var tipoC= "";
    var proveedor= document.getElementById('proveedor').value;

    if (vTipo == "1") {

        tipoC = "ALIEMENTO"
        
    }else if(vTipo == "2"){

        tipoC = "JUGUETE"
    }else{
        tipoC="ACCESORIO"
    }

    var total=precio*cantidad;
    console.log(total);

    data.push({
        "id":cant,
        "sku":sku,
        "nombre": nombre,
        "precio": precio,
        "cantidad": cantidad,
        "tipo": tipoC,
        "proveedor": proveedor,
        "total":total
    });

    var id_row= 'row'+ cant;
    var fila = '<tr id='+ id_row+ '><td>'+sku+'</td><td>'+nombre +'</td><td>'+precio + 
    '</td><td>' + cantidad + '</td><td>' + tipoC + '</td><td>' + proveedor + '</td><td>' + total + '</td><td> <a href="#" class="btn btn-danger" onclick="eliminar('+
    cant+')";>Eliminar</a><a href="prod-editar.html" class= "btn btn-warning" onclick="cantidad(' + cant + ')";> Editar</a> </td></tr>';
   // agregar a tabla
    $("#lista").append(fila); 
    cant++; 
    formulario.reset();
    document.getElementById("prueba").disabled = true;

    //desbloquear datos
    document.getElementById("sku").disabled = false;
    document.getElementById("nombre").disabled = false;
    document.getElementById("precio").disabled = false;
    document.getElementById("cantidad").disabled = false;
    document.getElementById("tipo").disabled = false;
    document.getElementById("proveedor").disabled = false;
    document.getElementById("descripcion").disabled = false;
    document.getElementById("agregar").disabled = false;
    document.getElementById("url").disabled = false;
}

function eliminar(row){

    $("#row"+row).remove();
    var i = 0;
    var posis = 0;
    for (x of data){
        if(x.id ==row){
            posis = i;
        }
        i++;
    }
    //eliminar
    data.splice(posis,1);

}

function validarTipo(){
    var valorTipo = document.getElementById('tipo');
    if(valorTipo.value==0 || valorTipo.value==""){
        campos.tipo = false;
        document.querySelector('#grupoTipo .formularioInput-error').classList.add('formularioInput-error-activo')

    }else{
        campos.tipo = true;
        document.querySelector('#grupoTipo .formularioInput-error').classList.remove('formularioInput-error-activo')
    }
   

}

const validarFormulario = (e) =>{
    switch(e.target.name){
        case "sku":
            ValidacionCampos(expresiones.sku, e.target, 'Sku');

        break;
    
        case "nombre":
            ValidacionCampos(expresiones.nombre, e.target, 'Nombre');
            
        break;
    
        case "precio":
            ValidacionCampos(expresiones.precio, e.target, 'Precio');
            
        break;
    
        case "cantidad":
            ValidacionCampos(expresiones.cantidad, e.target, 'Cantidad');

        break;
    
        case "descripcion":
            ValidacionCampos(expresiones.descripcion, e.target, 'Descripcion');

        break;
    
        case "proveedor":
            ValidacionCampos(expresiones.proveedor, e.target, 'Proveedor');
        break;

        case "imagen":
            ValidacionCampos(expresiones.imagen, e.target, 'Imagen');
        break;

       

    


    }
}
const ValidacionCampos = (expresion, input, campo)=>{
    if(expresion.test(input.value)){

        document.getElementById(`grupo${campo}`).classList.remove('fomularioGrupo-incorrecto')
        document.querySelector(`#grupo${campo} i`).classList.remove('bi-x-circle-fill');
        document.querySelector(`#grupo${campo} .formularioInput-error`).classList.remove('formularioInput-error-activo')
        campos[campo]=true;

   }else{

        document.getElementById(`grupo${campo}`).classList.add('fomularioGrupo-incorrecto')
        document.querySelector(`#grupo${campo} i`).classList.add('bi-x-circle-fill');
        document.querySelector(`#grupo${campo} .formularioInput-error`).classList.add('formularioInput-error-activo')
        campos[campo]=false;
       

       }
}



   			


inputs.forEach((input) =>{
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario) 

})


formulario.addEventListener('submit', (e) => { 
    e.preventDefault();
    validarTipo();
  

    if(campos.Sku && campos.Nombre && campos.Precio && campos.Cantidad && campos.Proveedor && campos.Descripcion && campos.tipo && campos.Imagen){   
        document.getElementById("prueba").disabled = false;

        //bloquear datos
        document.getElementById("sku").disabled = true;
        document.getElementById("nombre").disabled = true;
        document.getElementById("precio").disabled = true;
        document.getElementById("cantidad").disabled = true;
        document.getElementById("tipo").disabled = true;
        document.getElementById("proveedor").disabled = true;
        document.getElementById("descripcion").disabled = true;
        document.getElementById("agregar").disabled = true;
        document.getElementById("imagen").disabled = true;
        
        
        
       

        document.getElementById('formularioMensaje-exito').classList.add('formularioMensaje-exito-activo');
        
        setTimeout(()=>{
            document.getElementById('formularioMensaje-exito').classList.remove('formularioMensaje-exito-activo')
        }, 5000)
       // campos.Sku=false;
        

       

        
    }else{
        document.getElementById('formularioMensaje').classList.add('formularioMensaje-activo');

        setTimeout(()=>{
            document.getElementById('formularioMensaje').classList.remove('formularioMensaje-activo')
        }, 5000)
    }
})