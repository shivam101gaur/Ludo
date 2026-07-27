import { Service, signal } from '@angular/core';
import { User } from '../../shared/models/user.model';

@Service()
export class GameStateService {
  players_ = signal<User[]>([]);

}
