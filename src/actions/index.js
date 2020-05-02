import { 
    ADD_STYLE, 
    EDIT_STYLE, 
    UPDATE_STYLE, 
    DELETE_STYLE, 
    ADD_SKU,
    EDIT_SKU,
    UPDATE_SKU,
    DELETE_SKU
} from "../constants/action-types";

export function addStyle(payload) {
  return { type: ADD_STYLE, payload };
}

export function updateStyle(payload) {
    return { type: UPDATE_STYLE, payload };
}

export function deleteStyle(payload) {
    return { type: DELETE_STYLE, payload };
}

export function addSku(payload) {
    return { type: ADD_SKU, payload };
}
    
export function updateSku(payload) {
    return { type: UPDATE_SKU, payload };
}

export function deleteSku(payload) {
    return { type: DELETE_SKU, payload };
}