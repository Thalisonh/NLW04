import { EntityRepository, Repository } from "typeorm";
import { User } from '../models/User';


@EntityRepository(User)
class UsersRepostitory extends Repository<User> {}

export { UsersRepostitory };
