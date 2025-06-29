const { createApp, reactive, ref, onMounted } = Vue;

createApp({
  setup() {
    //funciones
    function guardarAsignatura() {
      localStorage.setItem('asignaturas', JSON.stringify(data));
    }
    function nombreValido(valor) {
      const str = String(valor).trim();
      return str.length > 0 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(str);
    }
    function agregarAsignatura() {
      try {
        if (!nombreValido(nuevaAsignatura.nombreAsignatura)){
          throw new Error("Nombre de la asignatura no es valido.")
        }
        if (!nombreValido(nuevaAsignatura.sede)){
          throw new Error("Nombre de la sede no es valido.")
        }
        data.push({
          nombreAsignatura: nuevaAsignatura.nombreAsignatura,
          sede: nuevaAsignatura.sede
        });
        console.log("Asignatura agregada:", nuevaAsignatura);
        guardarAsignatura();
        Object.assign(nuevaAsignatura,{
          nombreAsignatura: '',
          sede: ''
        });
      } catch(error) {
        alert(error.message);
      }
    }

    function eliminarAsignatura(indice) {
      if (confirm("¿Estás seguro de eliminar esta asignatura?")) {
        data.splice(indice, 1);
        guardarAsignatura();
      }
    }

    //constantes
    const menuAbierto = ref(false);
    const nuevaAsignatura = reactive({
      nombreAsignatura: '',
      sede: ''
    });
    const data = reactive(JSON.parse(localStorage.getItem('asignaturas') || '[]'));

    
    onMounted(() => {
      
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