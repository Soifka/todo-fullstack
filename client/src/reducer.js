import { ACTION_TYPES } from "./actions/actionTypes";

const initialState = {
  user: null,
  tasks: [],
  isLoading: false,
  error: null
}

const reducer = (state = initialState, action) => {
  console.log(action);
    switch (action.type) {
      case ACTION_TYPES.LOGIN_USER_ERROR:
        case ACTION_TYPES.REGISTER_USER_ERROR:
          case ACTION_TYPES.GET_TASKS_ERROR:
            case ACTION_TYPES.CREATE_TASK_ERROR:
              case ACTION_TYPES.DELETE_TASK_ERROR:
                case ACTION_TYPES.AUTH_USER_ERROR: {
                  const { error } = action;
                  return {
                    ...state,
                    error
                    //isLoading: false
                  }
                }
              
      case ACTION_TYPES.LOGIN_USER_SUCCESS:
        case ACTION_TYPES.AUTH_USER_SUCCESS:
          case ACTION_TYPES.REGISTER_USER_SUCCESS: {
            const { data } = action;  // DATA NEED YOUR ATTENTION!!!
            return {
              ...state,
              user: data,
              error: null
              //isLoading: false
            }
          }
      
      case ACTION_TYPES.GET_TASKS_SUCCESS: {
        const { data } = action;  // DATA NEED YOUR ATTENTION!!!
        return {
          ...state,
          tasks: data,
          error: null
          //isLoading: false
        }
      }

      case ACTION_TYPES.CREATE_TASK_SUCCESS: {
        const { data: newTask } = action;  // DATA NEED YOUR ATTENTION!!!
        return {
          ...state,
          tasks: [...state.tasks, newTask],
          error: null
          //isLoading: false
        }
      }

        case ACTION_TYPES.DELETE_TASK_SUCCESS: {
          const { data: deletedTask } = action;
          const tasks = state.tasks.filter(todo => todo._id !== deletedTask._id);
          return {
            ...state,
            tasks,
            erorr: null
            //isLoading: false
          }
        }

      case ACTION_TYPES.LOGOUT_REQUEST: {
        return {
          ...initialState
        }
      }
      
      case "NOTIFICATION": {
        const { data } = action;
        return {
          ...state,
          notification: data
        }
      }

      default:
        return state;
    }
  };

  export default reducer;