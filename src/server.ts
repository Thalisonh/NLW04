import express, { request, response } from 'express';

const app = express();

/**
 * GET => Busca
 * POST => Salvar
 * PUT => Alterar
 * DELETE => Deletar
 * PATCH => Alteração específica
 */

 app.get("/", (request, response) => {
    return response.json({mensagm: "Hello world"})
});

app.post("/", (request, response) => {
    return response.json({mensagem: "Os dados foram salvos com sucesso!"})
})

app.listen(3333,  () => console.log("Servidor rodando"))