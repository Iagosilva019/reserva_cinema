<template>
    <div class="cad-container">
        <form @submit.prevent="Cadastrar" class="login-form">
            <h2>Cadastro</h2>
            

            <div class="input-group">
                <label>Nome</label>
                <input type="text" v-model="nome" required>
            </div>
            <div class="input-group">
                <label>E-mail</label>
                <input type="email" placeholder="seu@email.com" v-model="email" required>
            </div>
            
            <div class="input-group">
                <label>Senha</label>
                <input type="password" v-model="senha" required>
            </div>

            <div class="input-group">
                <label>Confirmar Senha</label>
                <input type="password" v-model="confirmarSenha" required>
            </div>
            
            <button type="submit">Cadastrar</button>
            <button @click="$emit('telacadastro')" type="submit">Entrar</button>
           
        </form>
    </div>
</template>








<script setup>

import { ref } from "vue"
import axios from "axios"

const nome = ref("")
const email = ref("")
const senha = ref("")
const confirmarSenha = ref("")


const Cadastrar = async () => {

 if (senha.value !== confirmarSenha.value) {
    alert("As senhas não coincidem")
    return
  }
  const res = await axios.post(
    "http://localhost:5000/usuarios/",
    {nome:nome.value,
     email:email.value,
     senha:senha.value
    }

  )
  alert("cadastro realizado com sucesso!")

}
</script>







<style scoped>
.cad-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #cdd2d6;
  border-radius: 20px;
}

.login-form {
  background: white;
  width: 80%; /* Ocupa 80% da tela */
  max-width: 500px; /* Mas não passa de 600px */
  margin: 0 auto; /* Centraliza na tela */
  padding: 10px; /* Espaço interno para aumentar o tamanho */
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: black;
  
 
}

h2 { text-align: center; margin-bottom: 1.5rem; }

.input-group { margin-bottom: 1rem; }

label { display: block; margin-bottom: 0.5rem; }

input {
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 0.5rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  margin-bottom: 15px;
  cursor: pointer;
}



button:hover { background-color: #3aa876; }

.error { color: red; font-size: 0.8rem; margin-top: 1rem; text-align: center; }
</style>
