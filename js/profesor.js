const { createApp, reactive, ref, onMounted } = Vue;

createApp({
  setup() {
    const menuAbierto = ref(false);

    const nuevoProfesor = reactive({
        nombreProfesor: '',
        correo: ''
    });

    const data = reactive(JSON.parse(localStorage.getItem('profesores') || '[]'));

    function guardarProfesor() {
      localStorage.setItem('profesores', JSON.stringify(data));
    }

    function agregarProfesor() {
      if (nuevoProfesor.nombreProfesor && nuevoProfesor.correo) {
        data.push({ ...nuevoProfesor });
        nuevoProfesor.nombreProfesor = '';
        nuevoProfesor.correo = '';
        guardarProfesor();
      } else {
        alert("Por favor, completa todos los campos.");
      }
    }

    function eliminarProfesor(indice) {
      if (confirm("¿Estás seguro de eliminar esta profesor?")) {
        data.splice(indice, 1);
        guardarProfesor();
      }
    }

    onMounted(() => {
      // Si necesitas cargar datos relacionados, puedes hacerlo aquí
    });

    return {
      menuAbierto,
      nuevoProfesor,
      data,
      agregarProfesor,
      eliminarProfesor
    };
  }
}).mount('#app');
