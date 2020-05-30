import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  Link,
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from 'react-router-dom';

const Home = () => {
  return <h1>Home</h1>;
};

const Notes = ({ notes }) => {
  return (
    <div>
      <ul>
        {notes.map((note) => {
          return (
            <li key={note.id}>
              <Link to={`/notes/${note.id}`}>{note.content}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const Note = ({ notes }) => {
  const id = useParams().id;
  const note = notes.find((n) => n.id === Number(id));
  if (!note) {
    return <p>No content</p>;
  }
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
    </div>
  );
};

const About = () => {
  return <h3>About</h3>;
};

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Matti Luukkainen',
    },
    {
      id: 2,
      content: 'Browser can execute only Javascript',
      important: false,
      user: 'Matti Luukkainen',
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'Arto Hellas',
    },
  ]);
  const padding = {
    padding: 5,
  };
  return (
    <Router>
      <div>
        <Link style={padding} to='/'>
          Home
        </Link>
        <Link style={padding} to='/notes'>
          Notes
        </Link>
        <Link style={padding} to='/about'>
          About
        </Link>
      </div>

      <Switch>
        <Route path='/notes/:id'>
          <Note notes={notes} />
        </Route>
        <Route path='/notes'>
          <Notes notes={notes} />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
