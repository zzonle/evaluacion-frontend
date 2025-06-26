const { createApp, reactive, ref, onMounted } = Vue;

createApp({
  setup() {
    const nuevoAlumno = reactive({ 
        rutAlumno: '',
        nombreAlumno: '', 
        asigantura: '', 
        nombreProfesor: ''
    });
    const data = reactive(JSON.parse(localStorage.getItem('data') || '[]'));

    function guardarAlumno() {
      localStorage.setItem('nuevoAlumno', JSON.stringify(nuevoAlumno));
    }

    function agregarAlumno() {
      if (nuevoAlumno.rutAlumno && nuevoAlumno.nombreAlumno && nuevoAlumno.asigantura && nuevoAlumno.nombreProfesor) {
        data.push({
            rutAlumno: nuevoAlumno.rutAlumno,
            nombreAlumno: nuevoAlumno.nombreAlumno,
            asigantura: nuevoAlumno.asigantura,
            nombreProfesor: nuevoAlumno.nombreProfesor
        });
        nuevoAlumno.rutAlumno = '';
        nuevoAlumno.nombreAlumno = '';
        nuevoAlumno.asigantura = '',
        nuevoAlumno.nombreProfesor = '',
        guardarAlumno();
      }
    }

    function eliminarAlumno(indice){
        data.splice(indice, 1);
        guardarAlumno();
    }

    const nombreProfesor = ref([]);
    const asigantura = ref([]);

    onMounted(() => {
        nombreProfesor.value = JSON.parse(localStorage.getItem('nombreProfesor') || '[]');
        asigantura.value = JSON.parse(localStorage.getItem('asigantura') || '[]');
    });


    return {
        nuevoAlumno,
        data,
        agregarAlumno,
        eliminarAlumno,
        nombreProfesor,
        asigantura
    };

  }
}).mount('#app');