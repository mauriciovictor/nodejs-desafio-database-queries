import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
  
    
    const games = await this.repository
      .createQueryBuilder('games')
      .where(`upper(title) like upper('%${param}%')`)
      .getMany();
    
    return games;
      // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query('select count(*) count from games'); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const user = await getRepository(User)
      .createQueryBuilder('users')
      .innerJoinAndSelect('users.games', 'games')
      .where(`games.id = '${id}'`)
      .getMany();

    return user;
      // Complete usando query builder
  }
}
