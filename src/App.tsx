import Forms from './features/Components/Form/Forms';
import { Provider } from 'react-redux';
import { store } from './features/Redux/redux'
import Statistic from './features/Components/Statistic/StatisticWrapper';
import ReactTooltip from 'react-tooltip';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import style from './App.module.sass'


function App() {

  return (
    <Provider store={store}>
      <div className={style.App}>

        <BrowserRouter>
          <Routes>
            <>
              <Route path="/" element={<Forms />} />
              <Route path="/Statistic" element={<Statistic />} />
            </>
          </Routes>
        </BrowserRouter>
      </div>

      <ReactTooltip />
    </Provider>
  );
}
export default App;
