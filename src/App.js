import { startTransition, useEffect, useState } from 'react';
import PalapaLogo from './images/image.png';
import Padlock from './icons/padlock.svg';
import { sendNumber, verify } from "./api";
import './App.css';
import Spinner from './Spinner';

function App() {
  
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [page, setPage] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timerText, setTimerText] = useState("0:00");
  const [sendingNumber, setSendingNumber] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);

  const handlePhoneInput = (e) => {
    setPhone(old => {
      if (/^[0-9]*$/.test(e.target.value) && e.target.value.length < 10) return e.target.value;
      else return old;
    });
  }

  const handleCodeInput = (e) => {
    setCode(old => {
      if (/^[0-9]*$/.test(e.target.value) && e.target.value.length < 7) return e.target.value;
      else return old;
    });
  }

  const sendRequest = async () => {
    try {
      // TODO:
      // ideally use React Query or write your own API 
      // sender/provider to avoid boilerplate code with loader state
      setSendingNumber(true);
      await sendNumber(phone);
      setPage(1);
      setTimer(5);
      setSendingNumber(false);
    } catch {}
  }

  const resendOtp = async () => {
    try {
      setSendingNumber(true);
      await sendNumber(phone);
      setTimer(5);
      setSendingNumber(false);
    } catch {}
  }

  const verifyCode = async () => {
    try {
      setSendingCode(true);
      await verify();
      setPage(2);
      setSendingCode(false);
    } catch {}
  }

  useEffect(() => {
    if (timer <= 0) {
      setTimerText("0:00");
      return; 
    }
    
    const timeout = setTimeout(() => setTimer(old => old - 1), 1000);
    const minutes = Math.floor(timer / 60);
    const seconds = timer - minutes * 60;
    setTimerText(minutes + ":" + (seconds < 10 ? "0" : "") + seconds);

    return () => clearTimeout(timeout);
  }, [timer]);

  return (
    <div className="App">
      <img 
        src={PalapaLogo} 
        alt="PALAPA Logo"
        className='App-logo'
      />
      <p className='App-header'>Sign in to your account</p>
      {page === 0 ? (
        <>
        {sendingNumber && <Spinner />}
        <input
          className='App-phone App-phone-first App-phone-last'
          type='text' 
          placeholder='Phone number'
          value={phone}
          onChange={handlePhoneInput}
        />
        <button 
          className='App-button' 
          disabled={phone.length !== 9} 
          onClick={() => sendRequest()}
        >
          <img 
            src={Padlock} 
            alt="Padlock"
            className='App-button-padlock'
          />
          Sign in
        </button>
        </>
      ) : page === 1 ? (
        <>
        {(sendingNumber || sendingCode) && <Spinner />}
        <div className='App-phone-container'>
          <input 
            className='App-phone-static App-phone-first'
            type='text'
            placeholder='Phone number'
            value={phone}
            onChange={() => {}}
          />
          <label 
            for='static-phone-number' 
            onClick={() => setPage(0)}
            className='static-phone-number'
          >
            Edytuj
          </label>
        </div>
        <input
          className='App-phone App-phone-last'
          type='text'
          placeholder='OTP Code'
          value={code}
          onChange={handleCodeInput}
        />
        <div className='App-resume'>
          <div className='App-resume-timer'>{timerText}</div>
          <div 
            className={`App-resume-resend ${timer === 0 ? "App-active-resend" : "App-non-active-resend"}`}
            onClick={() => {
              if (timer === 0) resendOtp();
            }}
          >Re-send OTP</div>
        </div>
        <button 
          className='App-button' 
          disabled={code.length !== 6}
          onClick={() => verifyCode()}
        >
          <img 
            src={Padlock} 
            alt="Padlock"
            className='App-button-padlock'
          />
          Verify
        </button>
        </>
      ) : (
        <>
          <div className='App-success'>Konto zostało zweryfikowane.</div>
        </>
      )}
    </div>
  );
}

export default App;
