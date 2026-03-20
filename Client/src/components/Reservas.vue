<template>
  <div>

    <h2>🎟 Minhas Reservas</h2>

    <button @click="$emit('telareserva')">⬅ Voltar</button>

    <div v-if="reservas.length === 0">
      <p>Nenhuma reserva encontrada.</p>
    </div>

    <div v-for="r in reservas" :key="r.id" class="card">

      <p><strong>Filme:</strong> {{ r.assentos.sessoes.filmes.nome }}</p>
      <p><strong>Horário:</strong> {{ r.assentos.sessoes.horario }}</p>
      <p><strong>Assento:</strong> {{ r.assentos.fila }}{{ r.assentos.numero }}</p>

      <button @click="cancelar(r)">Cancelar</button>

    </div>

  </div>
</template>

<script setup>

import { ref, onMounted } from "vue"
import axios from "axios"

const reservas = ref([])

const usuario = JSON.parse(localStorage.getItem("usuario"))

const carregarReservas = async () => {

  const res = await axios.get(
    `http://localhost:5000/reservas/${usuario.id}`
  )

  reservas.value = res.data
}
const cancelar = async (reserva) => {

  await axios.delete(
    `http://localhost:5000/reservas/${reserva.id}`
  )

  alert("Reserva cancelada!")

  carregarReservas()
}

onMounted(() => {
  carregarReservas()
})

</script>

<style>

.card{
  background: white;
  color: black;
  padding: 15px;
  margin-top: 10px;
  border-radius: 10px;
}

button{
  margin-top: 10px;
}

</style>