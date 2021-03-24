import React from "react";
import Navbar from "./Components/Navbar";
import ContractListItem from "./Components/ContractListItem";
import "./App.css";

interface Contract {
  id: string;
  type: "flight";
  flight: {
    from: {
      name: string;
      iata: string;
    };
    to: {
      name: string;
      iata: string;
    };
    number: string;
    start: string;
    nbOfTravellers: number;
  };
}

const contracts: Contract[] = [
  {
    flight: {
      from: {
        iata: "BCN",
        name: "Barcelona",
      },
      number: "AF1238",
      start: "2019-09-16T05:30:00.000+01:00",
      to: {
        iata: "JFK",
        name: "NewYork",
      },
      nbOfTravellers: 3,
    },
    id: "1",
    type: "flight",
  },
  {
    flight: {
      from: {
        iata: "JFK",
        name: "NewYork",
      },
      number: "AF1338",
      start: "2019-07-16T06:30:00.000-06:00",
      to: {
        iata: "BCN",
        name: "Barcelona",
      },
      nbOfTravellers: 3,
    },
    id: "2",
    type: "flight",
  },
];

function App() {
  const renderListItem = (contract: Contract) => {
    return (
      <ContractListItem
        destination={contract.flight.to.name}
        start={contract.flight.start}
        nbOfTravellers={contract.flight.nbOfTravellers}
      />
    );
  };

  return (
    <div className="app">
      <Navbar />
      <div className="app-container">
        <h1 className="title">Your flights</h1>
        <div className="list">{contracts.map(renderListItem)}</div>
      </div>
    </div>
  );
}

export default App;
