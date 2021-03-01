import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import { SurveyUsersRepository } from '../repositories/SurveysUsersRepository';

class AnswerController {

    //http://localhost:3333/answers/1?u=41a139b8-39ce-4083-aef6-c773ac5bb02e

    async execute(request: Request, reponse: Response){
        const { value } = request.params;
        const { u } = request.query;

        const surveysUsersRepository = getCustomRepository(SurveyUsersRepository);

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u)
        });

        if(!surveyUser){
            throw new AppError("Survey User does not exists!")
        }

        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);

        return reponse.json(surveyUser);

    }

}

export { AnswerController }