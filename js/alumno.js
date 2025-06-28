const { createApp, reactive, ref, onMounted } = Vue;

createApp({
  setup() {
    // funciones
    function guardarAlumno() {
      localStorage.setItem('data', JSON.stringify(data));
    }
    function validarRut(rut) {
      return /^[0-9]+-[0-9kK]{1}$/.test(rut.trim());
    }
    function esEdadValida(edad) {
      const num = Number(edad);
      return Number.isInteger(num) && num > 16 && num < 100; 
    }
    function validarCorreo(correo) {
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(correo.trim());
    }
    function nombreValido(valor) {
      const str = String(valor).trim();
      return str.length > 0 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(str);
    }
    function agregarAlumno() {
      try {
        if (!validarRut(nuevoAlumno.rutAlumno)) {
          throw new Error("RUT inválido. Debe tener el formato '12345678-9'.");
        }
        if (!nombreValido(nuevoAlumno.nombreAlumno)) {
          throw new Error("Nombre inválido. Solo se permiten letras y espacios.");
        }
        if (!esEdadValida(nuevoAlumno.edadAlumno)) {
          throw new Error("Edad inválida. Debe ser un número entre 17 y 70.");
        }
        if (!validarCorreo(nuevoAlumno.correo)) {
          throw new Error("Correo electrónico inválido.");
        }
        if (!nuevoAlumno.asignatura) {
          throw new Error("Debe seleccionar una asignatura.");
        }
        if (!nuevoAlumno.nombreProfesor) {
          throw new Error("Debe seleccionar un profesor.");
        }

        data.push({
          rutAlumno: nuevoAlumno.rutAlumno,
          nombreAlumno: nuevoAlumno.nombreAlumno,
          edadAlumno: nuevoAlumno.edadAlumno,
          correo: nuevoAlumno.correo,
          asignatura: nuevoAlumno.asignatura,
          nombreProfesor: nuevoAlumno.nombreProfesor
        });
        console.log("Alumno agregado:", nuevoAlumno);
        guardarAlumno();
        Object.assign(nuevoAlumno, {
          rutAlumno: '',
          nombreAlumno: '',
          edadAlumno: '',
          correo: '',
          asignatura: '',
          nombreProfesor: ''
        });
      } catch (error) {
        alert(error.message);
      }
    }
    function eliminarAlumno(indice) {
      if (confirm("¿Estás seguro de eliminar este alumno?")) {
        data.splice(indice, 1);
        guardarAlumno();
      }
    }
    
    // costantes 
    const menuAbierto = ref(false);

    const nuevoAlumno = reactive({
      rutAlumno: '',
      nombreAlumno: '',
      edadAlumno: '',
      correo: '',
      asignatura: '',
      nombreProfesor: ''
    });

    const data = reactive(JSON.parse(localStorage.getItem('data') || '[]'));

    const profesores = ref([]);
    const asignaturas = ref([]);

    onMounted(() => {
      profesores.value = JSON.parse(localStorage.getItem('profesores') || '[]');
      asignaturas.value = JSON.parse(localStorage.getItem('asignaturas') || '[]');
    });
    // Retornamos los datos y funciones para que estén disponibles en la plantilla
    return {
      menuAbierto,
      nuevoAlumno,
      data,
      agregarAlumno,
      eliminarAlumno,
      profesores,
      asignaturas
    };
  }
}).mount('#app');
