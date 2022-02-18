import { useState } from 'react';
import Forms from './features/Components/Form/Forms';
import { Provider } from 'react-redux';
import { store } from './features/Redux/redux'
import Chart from './features/Components/Chart/Chart';
import Statistic from './features/Components/Statistic/Statistic';

import style from './App.module.sass'
import ReactTooltip from 'react-tooltip';

function App() {
  const [step, setStep] = useState('form')

  return (
    <Provider store={store}>
      <div className={style.App}>
        {step === 'form' && <Forms handleState={()=>setStep('analytics')}/>}
        {step === 'analytics' && <>
          <Chart />
          <Statistic />
          <button className={style.backBtn} onClick={()=>setStep('form')}>
            Back
          </button>
        </>}
      </div>
      <ReactTooltip />
    </Provider>
  );
}

export default App;
