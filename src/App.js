import "./App.css";

const getPublicState = async () => {
  try {
    const state = await window.WavesKeeper.publicState();
    console.log(state); // displaying the result in the console
    /*... processing data*/
  } catch (error) {
    console.error(error); // displaying the result in the console
    /*... processing errors */
  }
};

function App() {
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
      <div>
        <p>Press button to connect to waves wallet</p>
        <button onClick={authWavesKeeper}>Auth</button>
      </div>
    </div>
  );
}

export default App;
