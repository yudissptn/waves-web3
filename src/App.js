import { useState } from "react";
import "./App.css";
import { Signer } from "@waves/signer";
import { ProviderSeed } from "@waves/provider-seed";
import { libs } from "@waves/waves-transactions";

const seed = libs.crypto.randomSeed(15);
const signer = new Signer({
  // Specify URL of the node on Testnet
  NODE_URL: "https://nodes-testnet.wavesnodes.com",
});
signer.setProvider(new ProviderSeed(seed));

function App() {
  const [isConnected, setIsConnected] = useState({ state: false, address: "" });
  const [isAuthSigner, setIsAuthSigner] = useState({
    state: false,
    address: "",
  });

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

  const authWavesSigner = async () => {
    try {
      const userData = await signer.login(); // calling Waves Signer
      console.log(userData);
      setIsAuthSigner({ state: true, address: userData.address });
    } catch (e) {
      console.error("login rejected"); // handling user auth reject
    }
  };

  const invokeSigner = () => {
    signer
      .invoke({
        dApp: "3MuN7D8r19zdvSpAd1L91Gs88bcgwUFy2mn",
        fee: 0.004,
        payment: [
          {
            amount: 677728840,
            assetId: "WAVES",
          },
        ],
        call: {
          function: "faucet",
          args: [
            { type: "integer", value: 1 },
            { type: "binary", value: "base64:AAA=" },
            { type: "string", value: "foo" },
          ],
        },
      })
      .broadcast()
      .then(console.log);
  };

  const sendDataSigner = () => {
    signer
      .data({
        data: [{ key: "lastCall", value: String(new Date()), type: "string" }],
      })
      .broadcast()
      .then(console.log);
  };

  const transferSigner = () => {
    signer
      .transfer({
        recipient: "3MuN7D8r19zdvSpAd1L91Gs88bcgwUFy2mn",
        amount: 1,
      })
      .broadcast()
      .then(console.log);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Learn Web 3 on Waves</h1>
      </header>
      <main>
        {!isConnected.state ? (
          <div>
            <p>Press button to connect to waves keeper</p>
            <button onClick={authWavesKeeper}>Auth</button>
          </div>
        ) : (
          <h3>Successfully connected to wallet: {isConnected.address}</h3>
        )}
        <div>
          <h3>Waves Signer</h3>
          {!isAuthSigner.state ? (
            <button onClick={authWavesSigner}>Authorization</button>
          ) : (
            <p>{`Authorized as ${isAuthSigner.address}`}</p>
          )}
          <button onClick={invokeSigner}>Invoke Script</button>
          <button onClick={sendDataSigner}>Send Data</button>
          <button onClick={transferSigner}>Send Transfer</button>
        </div>
      </main>
    </div>
  );
}

export default App;
