const { createApp, reactive, ref, onMounted } = Vue;

createApp({
  setup() {
    const menuAbierto = ref(false);

    const nuevaAsignatura = reactive({
      nombreAsignatura: '',
      sede: ''
    });

    const data = reactive(JSON.parse(localStorage.getItem('asignaturas') || '[]'));

    function guardarAsignatura() {
      localStorage.setItem('asignaturas', JSON.stringify(data));
    }

    function agregarAsignatura() {
      if (nuevaAsignatura.nombreAsignatura && nuevaAsignatura.sede) {
        data.push({ ...nuevaAsignatura });
        nuevaAsignatura.nombreAsignatura = '';
        nuevaAsignatura.sede = '';
        guardarAsignatura();
      } else {
        alert("Por favor, completa todos los campos.");
      }
    }

    function eliminarAsignatura(indice) {
      if (confirm("¿Estás seguro de eliminar esta asignatura?")) {
        data.splice(indice, 1);
        guardarAsignatura();
      }
    }

    onMounted(() => {
      // Si necesitas cargar datos relacionados, puedes hacerlo aquí
    });

    return {
      menuAbierto,
      nuevaAsignatura,
      data,
      agregarAsignatura,
      eliminarAsignatura
    };
  }
}).mount('#app');
