//TYPES
const DEFAULT_TYPE = 'default_type';

//ACTIONS
export const defautAction = () => {
    return {
        type: DEFAULT_TYPE
    };
};

//REDUCER
const INITIAL_STATE = {
    defaultMessage: 'Hello, World!'
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DEFAULT_TYPE:
            return { ...state };
    }
    return state;
};
