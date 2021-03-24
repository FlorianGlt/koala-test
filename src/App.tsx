import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import ContractListItem from "./Components/ContractListItem";
import "./App.css";
import { Contract, DetailedContract } from "./Utils/Interfaces";
import Globe from "./Assets/Icons/ezgif.com-gif-maker.gif";

function App() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(
    null
  );

  useEffect(() => {
    fetch("http://localhost:9090/contract")
      .then((res) => res.json())
      .then(setContracts);
  }, []);

  useEffect(() => {
    if (selectedContract) {
      setIsFetching(true);
      fetch(`http://localhost:9090/contract/${selectedContract.id}`)
        .then((res) => res.json())
        .then((contract) => {
          setIsFetching(false);
          setSelectedContract(contract);
        });
    }
  }, [selectedContract]);

  const renderListItem = (contract: Contract) => {
    return (
      <ContractListItem
        contract={contract}
        onSelect={setSelectedContract}
        isSelected={!!selectedContract && selectedContract.id === contract.id}
      />
    );
  };

  return (
    <div className="app">
      <Navbar />
      <div className="app-container">
        <div className="section1">
          <h1 className="title">Your flights</h1>
          <div className="list">{contracts.map(renderListItem)}</div>
        </div>
        <div className="section2">
          {isFetching && (
            <img src={Globe} className="spinning-globe" alt="globe-spinning" />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
