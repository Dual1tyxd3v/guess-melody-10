import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getMistakes = (state: State): number => state[NameSpace.Game].mistakes;
export const getStep = (state: State): number => state[NameSpace.Game].step;
