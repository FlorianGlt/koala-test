import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import ContractListItem from "./Components/ContractListItem";
import "./App.css";
import { Contract, DetailedContract } from "./Utils/Interfaces";
import Globe from "./Assets/Icons/ezgif.com-gif-maker.gif";
import DetailedContractCard from "./Components/DetailedContractCard";
import Alert from "./Components/Alert";

// Normally I use I18n for text
const errorAlertMessage =
  "Unfortunately, this flight is not eligible for compensation. We thank you for your trust.";
const successAlertMessage =
  "Everything is up to date on our end. \nWe thank you for your trust.";
const errorAlertTitle = "🥲 Sorry";
const successAlertTitle = "😃 Yeah !";

function App() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [selectedContractId, setSelectedContractId] = useState<string | null>(
    null
  );
  const [
    detailedContract,
    setDetailedContract,
  ] = useState<DetailedContract | null>(null);

  useEffect(() => {
    fetch("http://localhost:9090/contract")
      .then((res) => res.json())
      .then(setContracts);
  }, []);

  useEffect(() => {
    setIsFetching(true);
    fetch(`http://localhost:9090/contract/${selectedContractId}`)
      .then((res) => res.json())
      .then((contract) => {
        setIsFetching(false);
        setDetailedContract(contract);
      });
  }, [selectedContractId]);

  const renderListItem = (contract: Contract) => {
    return (
      <ContractListItem
        key={contract.id}
        contract={contract}
        onSelect={setSelectedContractId}
        isSelected={selectedContractId === contract.id}
      />
    );
  };

  return (
    <div className="app">
      <Navbar />
      <div className="app-container">
        <h1 className="title">Your flights</h1>
        <div className="contracts-container">
          <div className="section1">
            <div className="list">{contracts.map(renderListItem)}</div>
          </div>
          <div className="section2">
            {isFetching && (
              <img
                src={Globe}
                className="spinning-globe"
                alt="globe-spinning"
              />
            )}
            {!isFetching && detailedContract && (
              <>
                {detailedContract.claim.status === "accepted" ? (
                  <Alert
                    message={successAlertMessage}
                    title={successAlertTitle}
                    className="contract-alert-response"
                  />
                ) : (
                  <Alert
                    title={errorAlertTitle}
                    message={errorAlertMessage}
                    type="error"
                    className="contract-alert-response"
                  />
                )}
                <DetailedContractCard contract={detailedContract} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
