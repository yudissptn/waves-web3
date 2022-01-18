import { useState } from "react";
import "./App.css";

function App() {
  const [isConnected, setIsConnected] = useState({ state: false, address: "" });

  const getPublicState = async () => {
    try {
      const state = await window.WavesKeeper.publicState();
      console.log(state); // displaying the result in the console
      /*... processing data*/
      setIsConnected({ state: true, address: state.account.address });
    } catch (error) {
      console.error(error); // displaying the result in the console
      /*... processing errors */
    }
  };

  const authWavesKeeper = async () => {
    if (window.WavesKeeper) {
      await getPublicState();
    } else {
      alert("Install waves keeper extensions");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Learn Web 3 on Waves</h1>
      </header>
      {!isConnected.state ? (
        <div>
          <p>Press button to connect to waves wallet</p>
          <button onClick={authWavesKeeper}>Auth</button>
        </div>
      ) : (
        <h3>Successfully connected to wallet: {isConnected.address}</h3>
      )}
    </div>
  );
}

export default App;
