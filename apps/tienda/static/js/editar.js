$(document).ready(function() {
  var currentImageSrc = "{{prod.imagen_url.url}}";
  $("#imagen-preview").attr("src", currentImageSrc).show();
  $("#formulario").validate({
    rules: {
      nombre: {
        required: true,
        minlength: 2,
        maxlength: 100,
        noLeadingSpace: true
      },
      precio: {
        required: true,
        minlength: 4,
        noSpecialChars: true,
        noPlusMinus: true
      },
      cantidad: {
        required: true,
        maxlength: 4,
        noSpecialChars: true,
        noPlusMinus: true
      },
      tipo: {
        required: true
      },
      tipoA: {
        required: true
      },
      proveedor: {
        required: true,
        maxlength: 100,
        noLeadingSpace: true
      },
      descripcion: {
        required: true,
        noLeadingSpace: true
      },
      imagen: {
        required: false
      }
    },
    messages: {
      nombre: {
        required: "Ingrese un nombre.",
        minlength: "El nombre debe tener al menos 2 caracteres.",
        maxlength: "El nombre no puede exceder los 100 caracteres."
      },
      precio: {
        required: "Ingrese un precio.",
        minlength: "El precio debe tener al menos 4 caracteres.",
        noSpecialChars: "El campo no puede contener signos o caracteres especiales.",
        noPlusMinus: "No se admite el signo '+' o '-'."
      },
      cantidad: {
        required: "Ingrese una cantidad.",
        maxlength: "La cantidad no puede exceder los 4 caracteres.",
        noSpecialChars: "El campo no puede contener signos o caracteres especiales.",
        noPlusMinus: "No se admite el signo '+' o '-'."
      },
      tipo: {
        required: "Seleccione un tipo de producto."
      },
      tipoA: {
        required: "Seleccione un tipo de animal."
      },
      proveedor: {
        required: "Ingrese un proveedor.",
        maxlength: "El proveedor no puede exceder los 100 caracteres."
      },
      descripcion: {
        required: "Ingrese una descripción."
      },
   
    },

    errorPlacement: function(error, element) {
      if (element.attr("name") == "imagen") {
        error.insertAfter(element.parent());
      } else {
        error.insertAfter(element);
      }
    },
    submitHandler: function(form) {
      // Submit the form
      form.submit();
    }
  });

  // Regla personalizada para evitar caracteres especiales
  $.validator.addMethod("noSpecialChars", function(value, element) {
    return this.optional(element) || /^[a-zA-Z0-9\s]+$/.test(value);
  }, "No se permiten caracteres especiales.");

  $.validator.addMethod("noLeadingSpace", function(value, element) {
    return this.optional(element) || /^\S.*$/.test(value);
  }, "No se permiten espacios en blanco al principio del campo.");

  $.validator.addMethod("noPlusMinus", function(value, element) {
    return this.optional(element) || !/[+-]/.test(value);
  }, "No se permiten los símbolos '+' o '-'.");
  // Code for showing image preview
  function mostrarImagenPreview(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        $("#imagen-preview").attr("src", e.target.result).show();
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      $("#imagen-preview").hide();
    }
  }
  
  function mostrarImagenInicial() {
    var imagenInicial = $("#imagen").prop("src");
    if (imagenInicial) {
      $("#imagen-preview").attr("src", imagenInicial).show();
    } else {
      $("#imagen-preview").hide();
    }
  }
  
  $(document).ready(function() {
    mostrarImagenInicial();
    $("#imagen").on("change", mostrarImagenPreview);
  });
  // Code for canceling the form
  $("#cancelar").click(function() {
    form.reset();
    $("#imagen-preview").hide();
  });

  // Code for canceling the form
  $("#cancel").click(function() {
    window.location.href = "/agregar";
  });
});