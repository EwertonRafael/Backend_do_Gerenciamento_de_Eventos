import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";


export class criarCategoria {
    async handle(req: Request, res: Response) {
        try {
            const { categoria } = req.body;

            //captalizando o campo categoria
            const categoriaToCaptalize = categoria.charAt(0).toUpperCase() + categoria.slice(1);

            //validando se o campo categoria já existe no banco de dados
            const categoriaRepetida = await prismaClient.categoria.findFirst({
                where: { categoria: categoriaToCaptalize }
            })
            if (categoriaRepetida) {
                return res.status(400).json({ mensagem: "Esta categoria já está inserida no banco de dados" })
            }

            //criando uma nova categoria no banco de dados
            const novaCategoria = await prismaClient.categoria.create({
                data: {
                    categoria: categoriaToCaptalize,
                },
            });
            return res.status(201).json(novaCategoria);
        } catch (error) {
            return res.status(500).json({ mensagem: "Erro no servidor ao criar categoria" });
        }
    };
}
export class listarCategoria {
    async handle(req: Request, res: Response) {
        try {
            //listando todas as categorias
            const categorias = await prismaClient.categoria.findMany();
            res.json(categorias);
        } catch (error) {
            return res.status(500).json({ mensagem: "Erro no servidor ao listar categoria" });
        }
    };
}
export class atualizarCategoria {
    async handle(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const { categoria } = req.body;

            //Validando se o ID etá no banco de dados
            const idEncontrado = await prismaClient.categoria.findFirst({
                where: { id },
            })
            if (!idEncontrado) {
                return res.status(400).json({ mensagem: "Este ID da categoria não está registrado no banco de dados" })
            }

            //captalizando o campo categoria
            const categoriatoCaptalize = categoria.charAt(0).toUpperCase() + categoria.slice(1);

            //validando se o campo categoria já existe no banco de dados
            const categoriaRepetida = await prismaClient.categoria.findFirst({
                where: { categoria: categoriatoCaptalize }
            })
            if (categoriaRepetida) {
                return res.status(400).json({ mensagem: "Esta categoria já está inserida no banco de dados" })
            }

            //atualizando categoria
            const novaCategoria = await prismaClient.categoria.update({
                where: { id },
                data: {
                    categoria: categoriatoCaptalize,
                },
            });
            res.json(novaCategoria);
        } catch (error) {
            return res.status(500).json({ mensagem: "Erro no servidor ao atualizar categoria" });
        }
    };
}
export class deletarCategoria {
    async handle(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);

            //Validando se o ID etá no banco de dados
            const idEncontrado = await prismaClient.categoria.findFirst({
                where: { id },
            })
            if (!idEncontrado) {
                return res.status(400).json({ mensagem: "Este ID da categoria não está registrado no banco de dados" })
            }

            //deletando a categoria com base no id.
            await prismaClient.categoria.delete({
                where: { id },
            });
            res.json({ message: 'Categoria excluída com sucesso.' });
        } catch (error) {
            return res.status(500).json({ mensagem: "Erro no servidor ao deletar categoria" });
        }
    };
}