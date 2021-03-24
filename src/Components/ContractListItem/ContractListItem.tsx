import * as React from "react";
import luggages from "../../Assets/Icons/luggages.svg";
import "./Styles.css";

interface Props {
  destination: string;
  nbOfTravellers: number;
  date: string;
}

const ContractListItem = ({ date, nbOfTravellers, destination }: Props) => {
  return (
    <div className="card">
      <img src={luggages} alt="luggages" className="luggage-image" />
      <div className="content">
        <span className="date">{date}</span>
        <span className="destination">{destination}</span>
        <span className="text">{nbOfTravellers} Travelers</span>
      </div>
      <div className="uncheck" />
    </div>
  );
};

export default ContractListItem;
