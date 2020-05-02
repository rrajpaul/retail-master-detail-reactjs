import { ADD_MASTER, UPDATE_MASTER, DELETE_MASTER, ADD_DETAIL, UPDATE_DETAIL, DELETE_DETAIL} from "../constants/action-types";
import configInfo from "../config.json"; 

const configMaster = configInfo.masterConfig;
const configDetail = configInfo.detailConfig;

const initialState = {
    masterData: [],
    detailData: []
};

function rootReducer(state = initialState, action) {
    switch(action.type) {
    case ADD_MASTER:
        state.entity_data.push(action.payload);
        break;
    case UPDATE_MASTER:
        const index = state.masterData.findIndex(p => p[configMaster.keyFieldName] === action.payload[keyFieldName])

        if(index !== -1) {
            state.masterData[index] = action.payload;
        }
        break;
    case DELETE_MASTER:
        let modifiedData = action.payload.filter(function (obj) {
            return obj[configMaster.keyFieldName] !== parseInt(action.payload[configMaster.keyFieldName]);
        });
        state.masterData = modifiedData;
        break;      
    case ADD_DETAIL:
            state.detailData.push(action.payload);
            break;
    case UPDATE_DETAIL:
            const index = state.detailData.findIndex(p => p[configDetail.keyFieldName] === action.payload[configDetail.keyFieldName])
    
            if(index !== -1) {
                state.detailData[index] = action.payload;
            }
            break;
    case DELETE_DETAIL:
            let modifiedData = action.payload.filter(function (obj) {
                return obj[keyFieldName] !== parseInt(action.payload[configDetail.keyFieldName]);
            });
            state.detailData = modifiedData;
            break;                   
    default:
      throw error("Unknown action");
  } 
  return state;
}

export default rootReducer;