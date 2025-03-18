import { BrowserRouter } from 'react-router-dom';
import Router from './routes';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <BrowserRouter basename="/">
        <Router />
      </BrowserRouter>
    </div>
  );
};

export default App;
