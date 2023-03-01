import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addJoke, fetchJoke, fetchJokes } from "./redux/slices/jokeSlice";


function App() {
  const [text, setText] = useState();
  const dispatch = useDispatch();
  const { joke, loading, error, jokes } = useSelector(state => state.joke);

  useEffect(() => {
    setText(joke)
  }, [joke])

  return (
    <div className="container">
      <div className="row my-5">
        <div className="col-md-8 mx-auto">
          <div className="card">
            <div className="card-body">
              {
                error && (
                  <div className="alert alert-danger">
                    { error }
                  </div>
                )
              }
              <p className="lead fw-normal">
                <i>{ text }</i>
              </p>
              {
                loading ? 
                  <div className="spinner-border">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  : 
                <button onClick={() => dispatch(fetchJoke())} className="btn btn-lg btn-primary">
                  Tell me a joke
                </button>
              }
              <button
                disabled={!joke}
                onClick={() => dispatch(addJoke(joke))} className="btn btn-lg btn-danger mx-2">
                Save the joke
              </button>
              <button 
                onClick={() => dispatch(fetchJokes())} 
                className="btn btn-lg btn-warning">
                Fetch saved jokes
              </button>
              <ul className="list-group mt-4">
                {
                  jokes?.map((joke, index) => (
                    <li key={index} className="list-group-item">
                      { joke }
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
