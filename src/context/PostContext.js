import createDataContext from './createDataContext';

const reducer = (state, action) => {
    return state;
};


export const { Context, Provider } = createDataContext(
    reducer,
    {},
    []
);