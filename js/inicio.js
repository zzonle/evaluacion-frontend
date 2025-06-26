const { createApp, reactive, ref, onMounted } = Vue;

createApp({
  setup() {    
    const datos = reactive(JSON.parse(localStorage.getItem('datos') || '[]'));
    const menuAbierto = ref(false)

    return {
      datos,
      menuAbierto
    };

  }
}).mount('#app');