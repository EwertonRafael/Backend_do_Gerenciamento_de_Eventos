import { atualizarCategoria, criarCategoria, deletarCategoria, listarCategoria } from "../controllers/categoria";
import { atualizarLocal, criarLocal, deletarLocal, listarLocal } from '../controllers/local';
import { atualizarEvento, criarEvento, deletarEvento, listarEvento } from '../controllers/evento';
import express from "express";
const rotas = express.Router();

//CRUD da tabela categoria
const criaCategoria = new criarCategoria();
const listaCategoria = new listarCategoria();
const atualizaCategoria = new atualizarCategoria();
const deletaCategoria = new deletarCategoria();
rotas.post('/categoria/criar', criaCategoria.handle)
rotas.get('/categoria/listar', listaCategoria.handle)
rotas.put('/categoria/atualizar/:id', atualizaCategoria.handle)
rotas.delete('/categoria/deletar/:id', deletaCategoria.handle)

//CRUD da tabela local
const criaLocal = new criarLocal();
const listaLocal = new listarLocal();
const atualizaLocal = new atualizarLocal();
const deletaLocal = new deletarLocal();
rotas.post('/local/criar', criaLocal.handle)
rotas.get('/local/listar', listaLocal.handle)
rotas.put('/local/atualizar/:id', atualizaLocal.handle)
rotas.delete('/local/deletar/:id', deletaLocal.handle)

//CRUD da tabela evento
const criaEvento = new criarEvento();
const listaEvento = new listarEvento();
const atualizaEvento = new atualizarEvento();
const deletaEvento = new deletarEvento();
rotas.post('/evento/criar', criaEvento.handle)
rotas.get('/evento/listar', listaEvento.handle)
rotas.put('/evento/atualizar/:id', atualizaEvento.handle)
rotas.delete('/evento/deletar/:id', deletaEvento.handle)

export = rotas 