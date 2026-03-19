
import cors from "cors"
import express from "express"
import { supabase } from "./supabase.js"

const app = express()

app.use(cors())
app.use(express.json())



app.get("/filmes", async (req, res) => {

  const { data, error } = await supabase
    .from("filmes")
    .select("*")

  res.json(data)

})


app.get("/sessoes/:filme", async (req, res) => {

  console.log("ROTA SESSOES CHAMADA", req.params.filme)
  
  const { data, error } = await supabase
    .from("sessoes")
    .select("*")
    .eq("filme_id", req.params.filme)
    

  if (error) {
    return res.status(500).json(error)
  }

  res.json(data)

})


app.get("/assentos/:sessao", async (req, res) => {

  console.log("ROTA SESSOES CHAMADA", req.params.sessao)
  const { data, error } = await supabase
    .from("assentos")
    .select("*")
    .eq("sessao_id", req.params.sessao)

  if (error) {
    return res.status(500).json(error)
  }

  res.json(data)

})







app.put("/assentos/:id", async (req, res) => {


  console.log("assento reservado", req.params.id)

  const { data, error } = await supabase
    .from("assentos")
    .update({ reservado: true })
    .eq("id", req.params.id)

  if (error) {
    return res.status(500).json(error)
  }

  res.json(data)

})






app.post("/usuarios", async (req, res)=>{

  const {nome, email, senha} = req.body

  const { data, error } = await supabase
    .from("usuarios")
    .insert({
      nome:nome,
      email:email,
      senha:senha })
    

  if (error) {
    return res.status(500).json(error)
  }

  res.json(data)

})


app.post("/login", async (req, res) => {

  const { email, senha } = req.body

  const { data, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("email", email)
    .single()

  if (error) {
    return res.status(500).json(error)
  }

  if (!data) {
    return res.status(401).json({ erro: "Usuário não encontrado" })
  }

  if (data.senha !== senha) {
    return res.status(401).json({ erro: "Senha incorreta" })
  }

  res.json({ mensagem: "Login realizado", usuario: data })
  

})


app.post("/reservar", async (req, res) => {

  const { usuario_id, assento_id } = req.body

  // 1. cria reserva
  const { error } = await supabase
    .from("reservas")
    .insert([{ usuario_id, assento_id }])

  if (error) {
    return res.status(500).json(error)
  }

  // 2. atualiza assento
  await supabase
    .from("assentos")
    .update({ reservado: true })
    .eq("id", assento_id)

  res.json({ mensagem: "Reservado!" })
})






app.listen(5000,()=>{
  console.log("Servidor rodando em http://localhost:5000")
})