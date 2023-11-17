import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";


export class criarLocal {
    async handle(req: Request, res: Response) {
        try {
            const { local } = req.body;

            //passando todas letras pra maiúsculas.
            const localUpperCase = local.toUpperCase();

            //validando se o local ja existe no banco de dados.
            const localRepetido = await prismaClient.local.findFirst({
                where: { local: localUpperCase }
            })
            if (localRepetido) {
                return res.status(400).json({ mensagem: "Este local já está inserido no banco de dados" })
            }

            //criando o local.
            const novoLocal = await prismaClient.local.create({
                data: {
                    local: localUpperCase
                },
            });
            res.json(novoLocal);
        } catch (error) {
            return res.status(500).json({ mensagem: "Erro no servidor ao criar local" });
        }
    };
}
export class listarLocal {
    async handle(req: Request, res: Response) {
        try {
            //listando todos os locais.
            const locais = await prismaClient.local.findMany();
            res.json(locais);
        } catch (error) {
            return res.status(500).json({ mensagem: "Erro no servidor ao listar local" });
        }
    };
}
export class atualizarLocal {
    async handle(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const { local } = req.body;

            //Validando se o ID etá no banco de dados.
            const idEncontrado = await prismaClient.local.findFirst({
                where: { id },
            })
            if (!idEncontrado) {
                return res.status(400).json({ mensagem: "Este ID do local não está registrado no banco de dados" })
            }

            //passando todas letras pra maiúsculas.
            const localUpperCase = local.toUpperCase();

            //validando se o campo local já existe no banco de dados.
            const localRepetido = await prismaClient.local.findFirst({
                where: { local: localUpperCase }
            })
            if (localRepetido) {
                return res.status(400).json({ mensagem: "Este local já está inserido no banco de dados" })
            }

            //atualizando o local.
            const novoLocal = await prismaClient.local.update({
                where: { id },
                data: {
                    local: localUpperCase
                },
            });
            res.json(novoLocal);
        } catch (error) {
            return res.status(500).json({ mensagem: "Erro no servidor ao atualizar local" });
        }
    };
}
export class deletarLocal {
    async handle(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);

            //Validando se o ID etá no banco de dados.
            const idEncontrado = await prismaClient.local.findFirst({
                where: { id },
            })
            if (!idEncontrado) {
                return res.status(400).json({ mensagem: "Este ID do local não está registrado no banco de dados" })
            }

            //deletando o local.
            await prismaClient.local.delete({
                where: { id },
            });
            res.json({ message: 'Local excluído com sucesso.' });
        } catch (error) {
            return res.status(500).json({ mensagem: "Erro no servidor ao deletar local" });
        }
    };
}