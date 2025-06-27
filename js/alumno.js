const { createApp, reactive, ref, onMounted } = Vue;

createApp({
  setup() {
    const menuAbierto = ref(false);

    const nuevoAlumno = reactive({
      rutAlumno: '',
      nombreAlumno: '',
      edadAlumno: '',
      correo: '',
      asignatura: '', // ← corregido (antes era "asignaturas")
      nombreProfesor: ''
    });

    const data = reactive(JSON.parse(localStorage.getItem('data') || '[]'));

    const profesores = ref([]);
    const asignaturas = ref([]);

    function guardarAlumno() {
      localStorage.setItem('data', JSON.stringify(data));
    }

    function agregarAlumno() {
      if (
        nuevoAlumno.rutAlumno &&
        nuevoAlumno.nombreAlumno &&
        nuevoAlumno.edadAlumno &&
        nuevoAlumno.correo &&
        nuevoAlumno.asignatura && // ← corregido
        nuevoAlumno.nombreProfesor
      ) {
        data.push({ ...nuevoAlumno });
        nuevoAlumno.rutAlumno = '';
        nuevoAlumno.nombreAlumno = '';
        nuevoAlumno.edadAlumno = '';
        nuevoAlumno.correo = '';
        nuevoAlumno.asignatura = '';
        nuevoAlumno.nombreProfesor = '';
        guardarAlumno();
      } else {
        alert("Por favor, completa todos los campos.");
      }
    }

    function eliminarAlumno(indice) {
      if (confirm("¿Estás seguro de eliminar este alumno?")) {
        data.splice(indice, 1);
        guardarAlumno();
      }
    }

    onMounted(() => {
      profesores.value = JSON.parse(localStorage.getItem('profesores') || '[]');
      asignaturas.value = JSON.parse(localStorage.getItem('asignaturas') || '[]');
    });

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
