const { createApp, reactive, ref, onMounted } = Vue;

createApp({
  setup() {    
    const data = reactive(JSON.parse(localStorage.getItem('data') || '[]'));
    const menuAbierto = ref(false)

    return {
      data,
      menuAbierto
    };

  }
}).mount('#app');