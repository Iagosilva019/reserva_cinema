<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin" class="login-form">
      <h2>Entrar</h2>
      
      <div class="input-group">
        <label>E-mail</label>
        <input type="email" v-model="email" placeholder="seu@email.com" required>
      </div>
      
      <div class="input-group">
        <label>Senha</label>
        <input type="password" v-model="password" placeholder="******" required>
      </div>
      
      <button type="submit">Entrar</button>
     
      <button
       type="button"
       @click="$emit('telacad')"
      >Quero cadastrar</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>







<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const error = ref('');
const emit = defineEmits(['loginSucesso','telacad'])



import axios from "axios"

const handleLogin = async () => {

  try {
    const res = await axios.post("http://localhost:5000/login", {
      email: email.value,
      senha: password.value
    })

    // 🔥 SALVA O USUÁRIO
    localStorage.setItem(
      "usuario",
      JSON.stringify(res.data.usuario)
    )

    alert("Login realizado com sucesso!")

    emit("LoginSucesso")

  } catch (err) {
    error.value = "E-mail ou senha incorretos"
  }

}



</script>







<style scoped>
.login-container {
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
