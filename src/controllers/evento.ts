import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class criarEvento {
    async handle(req: Request, res: Response) {
        try {
            const { nome, data, descricao, categoriaId, localId } = req.body;

            //Validando se o ID etá no banco de dados.
            const idCategoriaEncontrado = await prismaClient.categoria.findFirst({
                where: { id: categoriaId },
            })
            if (!idCategoriaEncontrado) {
                return res.status(400).json({ mensagem: "Este ID da categoria não está registrado no banco de dados" })
            }

            //Validando se o ID da tabela local etá no banco de dados.
            const idLocalEncontrado = await prismaClient.local.findFirst({
                where: { id: localId },
            })
            if (!idLocalEncontrado) {
                return res.status(400).json({ mensagem: "Este ID do local não está registrado no banco de dados" })
            }

            //craindo um novo evento no banco de dados.
            const evento = await prismaClient.evento.create({
                data: {
                    nome,
                    data,
                    descricao,
                    categoriaId,
                    localId,
                },
            });
            res.status(201).json(evento);
        } catch (error) {
            return res.status(500).json({ error: "erro no servidor ao criar evento" });
        }
    }
}
export class listarEvento {
    async handle(req: Request, res: Response) {
        try {
            //listando todos os eventos.
            const evento = await prismaClient.evento.findMany({
                select: {
                    id: true,
                    nome: true,
                    data: true,
                    descricao: true,
                    categoria: { select: { categoria: true } },
                    local: { select: { local: true } },
                },
            });
            //iterando todos objetos com o .map() e personalizando a resposta.
            const respostaFormatada = evento.map((evento) => ({
                id: evento.id,
                nome: evento.nome,
                data: evento.data,
                descricao: evento.descricao,
                categoria: evento.categoria.categoria,
                local: evento.local.local,
            }));
            return res.status(200).json(respostaFormatada);
        }
        catch (error) {
            return res.status(500).json({ error: "erro no servidor ao listar evento" });
        }
    }
}

export class atualizarEvento {
    async handle(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const { nome, data, descricao, categoriaId, localId } = req.body;

            //Validando se o ID da tabela evento etá no banco de dados.
            const idEventoEncontrado = await prismaClient.evento.findFirst({
                where: { id },
            })
            if (!idEventoEncontrado) {
                return res.status(400).json({ mensagem: "Este ID do Evento não está registrado no banco de dados" })
            }

            //Validando se o ID da tabela categoria etá no banco de dados.
            const idCategoriaEncontrado = await prismaClient.categoria.findFirst({
                where: { id: categoriaId },
            })
            if (!idCategoriaEncontrado) {
                return res.status(400).json({ mensagem: "Este ID da categoria não está registrado no banco de dados" })
            }

            //Validando se o ID da tabela local etá no banco de dados.
            const idLocalEncontrado = await prismaClient.local.findFirst({
                where: { id: localId },
            })
            if (!idLocalEncontrado) {
                return res.status(400).json({ mensagem: "Este ID do local não está registrado no banco de dados" })
            }

            //atualizando o evento
            const evento = await prismaClient.evento.update({
                where: { id: id },
                data: {
                    nome,
                    data,
                    descricao,
                    categoriaId,
                    localId,
                },
            });
            return res.status(200).json(evento);
        } catch (error) {
            console.log(error);

            return res.status(500).json({ error: "erro no servidor ao atualizar evento" });
        }
    };
}
export class deletarEvento {
    async handle(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);

            //Validando se o ID do evento está no banco de dados.
            const idEncontrado = await prismaClient.evento.findFirst({
                where: { id },
            })
            if (!idEncontrado) {
                return res.status(400).json({ mensagem: "Este ID do evento não está registrado no banco de dados" })
            }
            //deletando o evento.
            await prismaClient.evento.delete({
                where: { id: id },
            });
            return res.json({ message: 'Evento excluído com sucesso.' });
        } catch (error) {
            return res.status(500).json({ error: "erro no servidor ao atualizar evento" });
        }
    };
}