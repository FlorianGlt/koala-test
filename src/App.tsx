import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
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
  const [appState, setAppState] = useState<"initial" | "fetching" | "detailed">(
    "initial"
  );
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [selectedContractId, setSelectedContractId] = useState<string | null>(
    null
  );
  const [
    detailedContract,
    setDetailedContract,
  ] = useState<DetailedContract | null>(null);
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  useEffect(() => {
    fetch("http://localhost:9090/contract")
      .then((res) => res.json())
      .then(setContracts);
  }, []);

  useEffect(() => {
    if (selectedContractId) {
      setAppState("fetching");
      fetch(`http://localhost:9090/contract/${selectedContractId}`)
        .then((res) => res.json())
        .then((contract) => {
          setAppState("detailed");
          setDetailedContract(contract);
        });
    }
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
        {(!isMobile || (isMobile && appState === "initial")) && (
          <h1 className="title">Your flights</h1>
        )}
        {isMobile && appState === "detailed" && (
          <button
            className="button"
            onClick={() => {
              setSelectedContractId(null);
              setDetailedContract(null);
              setAppState("initial");
            }}
          >
            Back
          </button>
        )}
        <div className="contracts-container">
          {(!isMobile || (isMobile && appState === "initial")) && (
            <div className="section1">{contracts.map(renderListItem)}</div>
          )}
          {(!isMobile || (isMobile && appState)) !== "initial" && (
            <div className="section2">
              {appState === "fetching" && (
                <img
                  src={Globe}
                  className="spinning-globe"
                  alt="globe-spinning"
                />
              )}
              {appState === "detailed" && detailedContract && (
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
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
