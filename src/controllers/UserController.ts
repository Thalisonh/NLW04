import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { UsersRepostitory } from "../repositories/UsersRepository";
import * as yup from 'yup';

class UserController {

    async create(request: Request, response: Response) {
        const { name, email } = request.body;

        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required(),
        })

        try{
            await schema.validate(request.body, {abortEarly: false})
        }catch(err){
            throw new AppError(err);
        }
        
        const usersRepostitory = getCustomRepository(UsersRepostitory);

        const userAlreadyExists = await usersRepostitory.findOne({
            email
        });

        if(userAlreadyExists) {
            throw new AppError("User already exists!");
        }

        const user = usersRepostitory.create({
            name, email,
        });

        await usersRepostitory.save(user);

        return response.status(201).json(user);

    }
}

export { UserController };
