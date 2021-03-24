import * as React from "react";
import moment from "moment";
import luggages from "../../Assets/Icons/luggages.svg";
import check from "../../Assets/Icons/check.svg";
import { Contract } from "../../Utils/Interfaces";
import "./Styles.css";

interface Props {
  contract: Contract;
  onSelect: (contract: Contract) => void;
  isSelected?: boolean;
}

const ContractListItem = ({
  contract,
  onSelect,
  isSelected = false,
}: Props) => {
  const date = moment(contract.flight.start).format("MMM D[,] YYYY");
  const destination = contract.flight.to.name.replace(
    /([a-z])([A-Z])/g,
    "$1 $2"
  );

  return (
    <button
      className={["card", isSelected ? "selected" : ""].join(" ")}
      onClick={() => onSelect(contract)}
    >
      <img src={luggages} alt="luggages" className="luggage-image" />
      <div className="content">
        <span className="date">{date}</span>
        <span className="destination">{destination}</span>
        <span className="text">{contract.flight.nbOfTravellers} Travelers</span>
      </div>
      {isSelected ? (
        <div className="check">
          <img src={check} alt="check" />
        </div>
      ) : (
        <div className="uncheck" />
      )}
    </button>
  );
};

export default ContractListItem;
