import React, {useReduser} from 'react';

const reducer = (state, action) => {
  return state;
};

function App() {

  const [state, dispatch] = useReducer({
    user: null,
    tasks: []
  })

  return (
    <div>
      App
    </div>
  );
};

export default App;
