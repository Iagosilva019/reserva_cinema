<template>

  <div class="containerff">

    <h2 class="mb-4">
    Sessões de {{ filme.nome }}
    </h2>

    <ul class="list-group mb-3">

      <li
      class="list-group-item d-flex justify-content-between align-items-center"
      v-for="sessao in sessoes"
      :key="sessao.id"
      >

      {{ sessao.horario }}

      <button
      class="btn btn-success"
      @click="$emit('selecionarSessao', sessao)"
      >
      Escolher Assentos
      </button>

      </li>

    </ul>

    <button
    class="btn btn-secondary"
    @click="$emit('voltar')"
    >
    Voltar
    </button>

  </div>

</template>







<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"

const props = defineProps({
  filme: Object
})

const emit = defineEmits(["selecionarSessao","voltar"])

const sessoes = ref([])

const carregarSessoes = async () => {

  const res = await axios.get(
    `http://localhost:5000/sessoes/${props.filme.id}`
  )

  sessoes.value = res.data

}

onMounted(() => {
  carregarSessoes()
})
</script>


<style>


.containerff{
  padding: 20px;
  background-color: #cdd2d6;
  margin: 10px;
  color: black;
}


</style>