import * as React from "react";
import luggages from "../../Assets/Icons/luggages.svg";
import "./Styles.css";

interface Props {
  destination: string;
  nbOfTravellers: number;
  start: string;
}

const ContractListItem = ({ start, nbOfTravellers, destination }: Props) => {
  return (
    <div className="card">
      <img src={luggages} alt="luggages" />
      <div className="content">
        <span>{start}</span>
        <span>{destination}</span>
        <span>{nbOfTravellers}</span>
      </div>
    </div>
  );
};

export default ContractListItem;
