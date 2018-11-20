import { EnthusiasmAction } from '../actionCreators/index';
import { demo } from '../types/index';
import { INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM } from '../constants/index';
import initState from '../initState';

export function enthusiasm(state = initState.demo, action: EnthusiasmAction): demo {
    switch (action.type) {
        case INCREMENT_ENTHUSIASM:
            return { ...state, enthusiasmLevel: state.enthusiasmLevel! + 1 };
        case DECREMENT_ENTHUSIASM:
            return { ...state, enthusiasmLevel: Math.max(1, state.enthusiasmLevel! - 1) };
    }
    return state;
}