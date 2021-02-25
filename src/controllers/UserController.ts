import { Request, Response } from "express"
import { getRepository } from "typeorm";
import { User } from "../models/User"

class UserController {

    async create(request: Request, response: Response) {
        const { name, email } = request.body;
        
        const usersRepostitory = getRepository(User);

        const userAlreadyExists = await usersRepostitory.findOne({
            email
        });

        if(userAlreadyExists) {
            return response.status(400).json({
                error: "User already exists!",
            })
        }

        const user = usersRepostitory.create({
            name, email
        })

        await usersRepostitory.save(user);

        return response.json(user);

    }
}

export { UserController }