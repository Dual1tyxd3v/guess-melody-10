import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { State, AppDispatch } from '../types/state';
// создаем сразу типизированные хуки
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
