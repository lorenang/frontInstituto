export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
      validadores[tipoDeInput](input);
    }
  
    if (input.validity.valid) {
      input.parentElement.classList.remove("input-container--invalid");
      input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
      input.parentElement.classList.add("input-container--invalid");
      input.parentElement.querySelector(".input-message-error").innerHTML =
        mostrarMensajeDeError(tipoDeInput, input);
    }
  }
  
  const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
  ];
  
  const mensajesDeError = {
    email: {
      valueMissing: "El campo correo no puede estar vacío",
      typeMismatch: "El correo no es válido",
    },
    telefono: {
      valueMissing:"El campo telefono no puede estar vacion",
      typeMismatch: "El telefono no es valido"
    },
    password: {
      valueMissing: "El campo contraseña no puede estar vacío",
      patternMismatch:"Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.",
    },
    nacimiento: {
      valueMissing: "Este campo no puede estar vacío",
      customError: "Debes tener al menos 17 años de edad",
    }
};
  
const validadores = {
    nacimiento: input => validarNacimiento(input),
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if(!mayorDeEdad(fechaCliente)) {
        mensaje="Debes tener al menos 18 años de edad";
    }
    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(), 
        fecha.getUTCFullDate()
    );
    return diferenciaFechas <= fechaActual;
}
