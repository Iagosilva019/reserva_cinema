<template>

 

  <div class="sala">
    <h2>Escolha seu assento</h2>

    <button
      v-for="assento in assentos"
      :key="assento.sessao"
      :class="['assento', { reservado: assento.reservado }]"
      :disabled="assento.reservado"
      @click="reservar(assento)"
    >

    {{ assento.fila }}{{ assento.numero }}

    </button>

  </div>

   <button
    class="btn btn-secondary"
    @click="$emit('voltar')"
    >
    Voltar
    </button>

</template>





<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"

const props = defineProps({
  sessao: Object
})

const assentos = ref([])

const carregarAssentos = async () => {

  if (!props.sessao.id) return

  const res = await axios.get(
    `http://localhost:5000/assentos/${props.sessao.id}`
  )
  assentos.value = res.data
}

onMounted(() => {
  carregarAssentos()
})


const reservar = async (assento) => {
  const usuario = JSON.parse(localStorage.getItem('usuario'))
  
  console.log("usuario:",usuario)

  if (assento.reservado) return

  try {
    await axios.post("http://localhost:5000/reservar", {
      usuario_id: usuario.id, // precisa ter isso salvo
      assento_id: assento.id
    })

    assento.reservado = true
    alert("Assento reservado!")

  } catch (error) {
    console.log(error)
    alert("Erro ao reservar (talvez já esteja ocupado)")
  }

}




</script>







<style>


.sala{
  padding: 20px;
  background-color: #cdd2d6;
  margin: 10px;
  color: black;
}



    .assento{
  background-color: green;
  color:white;
  padding:10px;
  margin:5px;
  border:none;
  border-radius:5px;
  cursor:pointer;
}

.reservado{
  background-color: red;
  cursor:not-allowed;
}
 

</style>