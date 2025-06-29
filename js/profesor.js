const { createApp, reactive, ref, onMounted } = Vue;

createApp({
  setup() {
    //funciones
    function guardarProfesor() {
      localStorage.setItem('profesores', JSON.stringify(data));
    }

    function nombreValido(valor) {
      const str = String(valor).trim();
      return str.length > 0 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(str);
    }

    function agregarProfesor() {
      try{
        if (!nombreValido(nuevoProfesor.nombreProfesor)){
          throw new Error("Nombre del profesor no es valido.")
        }
        if(!nombreValido(nuevoProfesor.correo)){
          throw new Error("Correo no valido.")
        }
        data.push({
          nombreProfesor: nuevoProfesor.nombreProfesor,
          correo: nuevoProfesor.correo
        });
        console.log("Profesor agregado:", nuevoProfesor);
        guardarProfesor();
        Object.assign(nuevoProfesor, {
          nombreProfesor: '',
          correo: ''
        })
      }catch (error){
        alert(error.message);
      }
    }

    function eliminarProfesor(indice) {
      if (confirm("¿Estás seguro de eliminar esta profesor?")) {
        data.splice(indice, 1);
        guardarProfesor();
      }
    }
    const menuAbierto = ref(false);

    const nuevoProfesor = reactive({
        nombreProfesor: '',
        correo: ''
    });

    const data = reactive(JSON.parse(localStorage.getItem('profesores') || '[]'));

    

    onMounted(() => {
    
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
