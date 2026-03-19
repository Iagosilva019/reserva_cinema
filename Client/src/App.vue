<template>

<div class="container mt-4">

  <h1 class="text-center mb-4">
    🎬 Sistema de Reserva de Cinema
  </h1>


  <Cadastro
   v-if="tela === 'cadastro'"
   @telacadastro="telalogin"
  />
  <Login
    v-if="tela === 'login'"
    @LoginSucesso="mostrarFilmes"
    @telacad="ircadastro"
  />
  <Filmes
    v-if="tela === 'filmes'"
    @selecionarFilme="mostrarSessoes"
  />
  <Sessoes
    v-if="tela === 'sessoes'"
    :filme="filmeSelecionado"
    @selecionarSessao="mostrarAssentos"
    @voltar="voltarFilmes"
  />

  <Assentos
    v-if="tela === 'assentos'"
    :sessao="sessaoSelecionada"
    @voltar="voltarSessoes"
  />

</div>

</template>


<script>

import Filmes from "./components/Filmes.vue"
import Sessoes from "./components/Sessoes.vue"
import Assentos from "./components/Assentos.vue"
import Login from "./components/Login.vue"
import Cadastro from "./components/Cadastro.vue";

export default {

  name: "App",

  components: {
    Filmes,
    Sessoes,
    Assentos,
    Login,
    Cadastro
  },

  data(){
    return {

      tela: "login",
      filmeSelecionado: null,
      sessaoSelecionada: null
     

    }
  },

  methods: {
    mostrarFilmes(){
      this.tela = "filmes"
     
    },
    mostrarSessoes(filme){

      this.filmeSelecionado = filme
      this.tela = "sessoes"

    },

    mostrarAssentos(sessao){

      this.sessaoSelecionada = sessao
      this.tela = "assentos"

    },

    voltarFilmes(){

      this.tela = "filmes"

    },

    voltarSessoes(){

      this.tela = "sessoes"

    },
    ircadastro(){
      this.tela = "cadastro"
    },
    telalogin(){
      this.tela = "login"
    }

  }

}

</script>


<style>

::-webkit-scrollbar {
  display: none;
 
}

.container{

 max-width: 900px;
  margin: 40px auto;
  padding: 25px;

  background: rgba(24, 58, 145, 0.9); /* azul com leve transparência */
  color: white;

  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);

  font-family: Arial;

}


h1{
  text-align: center;
}

</style>