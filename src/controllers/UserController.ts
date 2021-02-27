import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepostitory } from "../repositories/UsersRepository";

class UserController {

    async create(request: Request, response: Response) {
        const { name, email } = request.body;
        
        const usersRepostitory = getCustomRepository(UsersRepostitory);

        const userAlreadyExists = await usersRepostitory.findOne({
            email
        });

        if(userAlreadyExists) {
            return response.status(400).json({
                error: "User already exists!",
            })
        }

        const user = usersRepostitory.create({
            name, email,
        });

        await usersRepostitory.save(user);

        return response.status(201).json(user);

    }
}

export { UserController };
