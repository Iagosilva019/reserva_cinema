<template>

<div class="container mt-4">

  <h1 class="text-center mb-4">
    🎬 Sistema de Reserva de Cinema
  </h1>

  <!-- BOTÃO LOGIN/LOGOUT -->
  <div class="top-buttons" style="text-align:right; margin-bottom: 10px;">
    <button v-if="!usuarioLogado()" @click="tela='login'">Login</button>

    <button v-if="usuarioLogado()" @click="minhasreservas">
    Minhas Reservas
    </button>
    <button v-if="usuarioLogado()" @click="logout">Sair</button>

 
  </div>

  <Reservas
    v-if="tela === 'reserva'"
    @telareserva="voltarFilmes"
    />

  <Cadastro
    v-if="tela === 'cadastro'"
    @telacadastro="telalogin"
  />

  <Login
    v-if="tela === 'login'"
    @loginSucesso="mostrarFilmes"
    @telacadastro="ircadastro"
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
import Cadastro from "./components/Cadastro.vue"
import Reservas from "./components/Reservas.vue"

export default {

  name: "App",

  components: {
    Filmes,
    Sessoes,
    Assentos,
    Login,
    Cadastro,
    Reservas
  },

  data(){
    return {
      tela: "filmes", // começa direto nos filmes
      telaAnterior: null,
      filmeSelecionado: null,
      sessaoSelecionada: null
    }
  },

  methods: {


    minhasreservas(){

      this.tela = "reserva"

    },

    // 🔍 verifica usuário
    usuarioLogado(){
      return JSON.parse(localStorage.getItem("usuario"))
    },

    // logout
    logout(){
      localStorage.removeItem("usuario")
      this.tela = "filmes"
    },

    //  depois do login
    mostrarFilmes(){

      if (this.telaAnterior === "assentos") {
        this.tela = "assentos"
        this.telaAnterior = null
        return
      }

      this.tela = "filmes"
    },

    mostrarSessoes(filme){
      this.filmeSelecionado = filme
      this.tela = "sessoes"
    },

    mostrarAssentos(sessao){

      const usuario = this.usuarioLogado()

      if (!usuario) {
        this.telaAnterior = "assentos"
        this.sessaoSelecionada = sessao
        this.tela = "login"
        return
      }

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

  background: rgba(24, 58, 145, 0.9);
  color: white;

  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);

  font-family: Arial;
}

h1{
  text-align: center;
}

button{
  background: #4ca1af;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
}

button:hover{
  background: #357f8a;
}

.top-buttons{
  display: flex;
  justify-content: flex-end;
  gap: 10px; /* 🔥 espaçamento automático */
  margin-bottom: 10px;
}

</style>