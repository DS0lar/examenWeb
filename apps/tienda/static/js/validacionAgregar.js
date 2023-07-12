//EXPRESIONES
var numeros = /^[0-9]+$/;
var simbolos = /[!@#$%^&*(),.?":{}|<>]/;
var letrasRegex = /^[A-Za-z]+$/;
var extensionesPermitidas = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
var btnAgregar = document.getElementById('btn-agregar');


// Agregar el evento "blur" al campo SKU
document.getElementById('sku').addEventListener('blur', validarSKU);
document.getElementById('sku').addEventListener('input', validarSKU);
document.getElementById('nombre').addEventListener('blur', validarNOMBRE);
document.getElementById('nombre').addEventListener('input', validarNOMBRE);
document.getElementById('precio').addEventListener('blur', validarPRECIO);
document.getElementById('precio').addEventListener('input', validarPRECIO);
document.getElementById('cantidad').addEventListener('blur', validarCANTIDAD);
document.getElementById('cantidad').addEventListener('input', validarCANTIDAD);
document.getElementById('tipo').addEventListener('blur', validarTipo);
document.getElementById('tipo').addEventListener('input', validarTipo);
document.getElementById('tipoA').addEventListener('blur', validarTipoA);
document.getElementById('tipoA').addEventListener('input', validarTipoA);
document.getElementById('proveedor').addEventListener('blur', validarPROVEEDOR);
document.getElementById('proveedor').addEventListener('input', validarPROVEEDOR);
document.getElementById('descripcion').addEventListener('blur', validarDESCRIPCION);
document.getElementById('descripcion').addEventListener('input', validarDESCRIPCION);
document.getElementById('imagen').addEventListener('blur', validarIMAGEN);


function validarSKU() {
  var skuInput = document.getElementById('sku');
  var skuError = document.getElementById('sku-error');

  if (skuInput.value === '') {
    skuError.style.display = 'block';
    skuError.textContent = 'Por favor, ingrese un SKU válido.';
    return false;
  } else if (!numeros.test(skuInput.value)) {
    skuError.style.display = 'block';
    skuError.textContent = 'Este campo admite solo dígitos.';
    return false;
  } else {
    // Realizar solicitud AJAX al servidor
    $.ajax({
      url: '/validar_sku/',  // URL de la vista de Django que valida el SKU
      data: {
        sku: skuInput.value
      },
      success: function(response) {
        if (response.existe_sku) {
          skuError.style.display = 'block';
          skuError.textContent = 'El SKU ya existe. Por favor, modifíquelo.';
          btnAgregar.disabled = true;
        } else {
          skuError.style.display = 'none';
          btnAgregar.disabled = false;
        }
      }
    });
    return true;
  }
}



function validarNOMBRE() {
  var nombreInput = document.getElementById('nombre');
  var nombreError = document.getElementById('nombre-error');

  if (nombreInput.value === '') {
    nombreError.style.display = 'block';
    nombreError.textContent = 'Por favor, ingrese un nombre válido.';
    return false;

  }else if(simbolos.test(nombreInput.value)) {
    nombreError.style.display = 'block';
    nombreError.textContent = 'Este campo no admite signos.';
    return false;

  }else if (/^\s/.test(nombreInput.value)) {
    nombreError.style.display = 'block';
    nombreError.textContent = 'El nombre no puede comenzar con un espacio.';
    return false;
  

  } else if (numeros.test(nombreInput.value)) {
    nombreError.style.display = 'block';
    nombreError.textContent = 'El nombre no puede ser solo digitos.';
    return false;

  } else if(nombreInput.value.length > 50 || nombreInput.value.length <2){
    nombreError.style.display = 'block';
    nombreError.textContent = 'El valor debe ser más de 2 caracteres y no debe exceder los 50 caracteres.';
    return false;
    
  }else {
    nombreError.style.display = 'none';
    return true;
  }
}


function validarPRECIO() {
  var precioInput = document.getElementById('precio');
  var precioError = document.getElementById('precio-error');

  if (precioInput.value === '') {
    precioError.style.display = 'block';
    precioError.textContent = 'Por favor, ingrese un precio válido.';
    return false;

  }else if(!numeros.test(precioInput.value)) {
    precioError.style.display = 'block';
    precioError.textContent = 'Este campo admite solo digitos.';
    return false;
  
  } else if(precioInput.value.length < 4){
    precioError.style.display = 'block';
    precioError.textContent = 'El campo debe contener más de 4 digitos';
    return false;
    
  } else {
    precioError.style.display = 'none';
    return true;
  }
}


function validarCANTIDAD() {
  var cantidadInput = document.getElementById('cantidad');
  var cantidadError = document.getElementById('cantidad-error');

  if (cantidadInput.value === '') {
    cantidadError.style.display = 'block';
    cantidadError.textContent = 'Por favor, ingrese una cantidad válida.';
    return false;

  }else if(!numeros.test(cantidadInput.value)) {
    cantidadError.style.display = 'block';
    cantidadError.textContent = 'Este campo admite solo digitos.';
    return false;
  
  } else if(cantidadInput.value.length > 4){
    cantidadError.style.display = 'block';
    cantidadError.textContent = 'El campo debe contener no más de 4 digitos';
    return false;
    
  } else {
    cantidadError.style.display = 'none';
    return true;
  }
}


function validarTipo() {
  var tipoInput = document.getElementById('tipo').value
  var tipoError = document.getElementById('tipo-error');

  if (tipoInput === '0') {
    tipoError.style.display = 'block';
    tipoError.textContent = 'Por favor, ingrese un tipo producto.';
    return false;

  }else{
    tipoError.style.display = 'none';
    return true;
  }
}

function validarTipoA() {
  var tipoAInput = document.getElementById('tipoA').value
  var tipoAError = document.getElementById('tipoA-error');

  if (tipoAInput === '0') {
    tipoAError.style.display = 'block';
    tipoAError.textContent = 'Por favor, ingrese un tipo producto.';
    return false;

  }else{
    tipoAError.style.display = 'none';
    return true;
  }
}

function validarPROVEEDOR() {
  var proveedorInput = document.getElementById('proveedor');
  var proveedorError = document.getElementById('proveedor-error');

  if (proveedorInput.value === '') {
    proveedorError.style.display = 'block';
    proveedorError.textContent = 'Por favor, ingrese un proveedor válido.';
    return false;

  }else if (/^\s/.test(proveedorInput.value)) {
    nombreError.style.display = 'block';
    nombreError.textContent = 'El campo no puede comenzar con un espacio.';
    return false;

  }else if(simbolos.test(proveedorInput.value)) {
    proveedorError.style.display = 'block';
    proveedorError.textContent = 'Este campo no admite signos.';
    return false;

  } else if(proveedorInput.value.length > 100){
    proveedorError.style.display = 'block';
    proveedorError.textContent = 'El valor no debe exceder los 100 caracteres.';
    return false;
    
  }else {
    proveedorError.style.display = 'none';
    return true;
  }
}

function validarDESCRIPCION() {
  var descripcionInput = document.getElementById('descripcion');
  var descripcionError = document.getElementById('descripcion-error');

  if (descripcionInput.value === '') {
    descripcionError.style.display = 'block';
    descripcionError.textContent = 'Por favor, ingrese una descripcion válida.';
    return false;
  
  } else if(descripcionInput.value.length > 200){
    descripcionError.style.display = 'block';
    descripcionError.textContent = 'El valor no debe exceder los 200 caracteres.';
    return false;
  }else if (/^\s/.test(descripcionInput.value)) {
    nombreError.style.display = 'block';
    nombreError.textContent = 'El campo no puede comenzar con un espacio.';
    return false;
    
  }else {
    descripcionError.style.display = 'none';
    return true;
  }
}


function validarIMAGEN() {
  var imagenInput = document.getElementById('imagen');
  var imagenError = document.getElementById('imagen-error');

  if (imagenInput.value === '') {
    imagenError.style.display = 'block';
    imagenError.textContent = 'Por favor, ingrese una imagen válida.';
    return false;

  } else if(!extensionesPermitidas.test(imagenInput.value)){
    imagenError.style.display = 'block';
    imagenError.textContent = 'El formato de la imagen no es válido. Se permiten archivos en formato JPG, JPEG, PNG y GIF.';
    return false;
    
  }else {
    imagenError.style.display = 'none';
    return true;
  }
}





document.getElementById('formulario').addEventListener('submit', function (e) {
  e.preventDefault();

  // validar campos
  var skuValido = validarSKU();
  var nombreValido = validarNOMBRE();
  var precioValido = validarPRECIO();
  var cantidadValido = validarCANTIDAD();
  var tipoValido = validarTipo();
  var proveedorValido = validarPROVEEDOR();
  var descripcionValido = validarDESCRIPCION();
  var imagenValido = validarIMAGEN();

  if (skuValido && nombreValido && precioValido && cantidadValido && tipoValido && proveedorValido && descripcionValido && imagenValido) {
    this.submit();
  } else {
    document.getElementById('formularioMensaje').style.display = 'block';
  }
});