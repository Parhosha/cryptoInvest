import { Provider } from 'react-redux';
import { store } from './features/Redux/redux'
import Statistic from './features/Components/Statistic';
import ReactTooltip from 'react-tooltip';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Form from './features/Components/Form/index';
import { ROUTE } from './constants/routes';

import style from './App.module.sass'


function App() {
  const notify = () => toast.error("Error, end of period setup before start!");

  return (
    <Provider store={store}>
      <div className={style.App}>
        <BrowserRouter>
          <Routes>
            <>
              <Route path={ROUTE.DEFAULT} element={<Form notify={notify} />} />
              <Route path={ROUTE.STATISTIC} element={<Statistic />} />
            </>
          </Routes>
        </BrowserRouter>
      </div>

      <ToastContainer />
      <ReactTooltip />
    </Provider>
  );
}
export default App;
