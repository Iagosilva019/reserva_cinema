<template>

<div class="containerff">

<h2 class="mb-4">Filmes em Cartaz</h2>

<div class="row">

  <div
    class="col-md-4"
    v-for="filme in filmes"
    :key="filme.id"
  >

    <div class="card mb-3 shadow">

      <div class="card-body text-center">

        <h5 class="card-title">
          {{ filme.nome }}
        </h5>

        <button
          class="btn btn-primary"
          @click="$emit('selecionarFilme', filme)"
        >
          Ver Sessões
        </button>

      </div>

    </div>

  </div>

</div>

</div>

</template>



<script>

import axios from "axios"

export default {

  data(){
    return{
    filmes:[]
  }
  },

  mounted(){

    axios.get("http://localhost:5000/filmes")
      .then(res=>{
        this.filmes = res.data
      })
      .catch(err=>{
        console.log(err)
      })

  }

}

</script>



<style>

.containerff{
  padding: 20px;
  background-color: #cdd2d6;
  margin: 10px;
  color: black;
}



</style>