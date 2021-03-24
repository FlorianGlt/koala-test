import moment from "moment";
import * as React from "react";
import { Contract, DetailedContract } from "../../Utils/Interfaces";
import {
  splitCamelCase,
  formatFlightNumber,
  convertDelayInMinutesToDelayInHours,
} from "../../Utils/StringHelper";
import "./Styles.css";

interface Props {
  contract: DetailedContract;
}

const DetailedContractCard = ({ contract }: Props) => {
  const date = moment(contract.flight.start);
  const from = splitCamelCase(contract.flight.from.name);
  const to = splitCamelCase(contract.flight.to.name);

  const Header = () => (
    <div className="card-header">
      <div className="detailed-contract-content">
        <span className="date-text">{date.format("MMM D[,] YYYY")}</span>
        <span className="destination">{from}</span>
        <span className="iata">{contract.flight.from.iata}</span>
      </div>
      <div className="separator" />
      <div className="detailed-contract-content">
        <span className="destination">{to}</span>
        <span className="iata">{contract.flight.to.iata}</span>
      </div>
    </div>
  );

  const FlightSection = () => (
    <div className="card-section">
      <div className="detailed-contract-content">
        <span className="date-text">Flight N°</span>
        <span className="destination">
          {formatFlightNumber(contract.flight.number)}
        </span>
      </div>
      <div className="detailed-contract-content">
        <span className="date-text">Departure Hour</span>
        <span className="destination">{date.format("HH[:]mm")}</span>
      </div>
    </div>
  );

  const DelaySection = () => (
    <div className={["card-section", "section-border-top"].join(" ")}>
      <div className="detailed-contract-content">
        <span className="date-text">Delay</span>
        <span className={["destination", "error-text"].join(" ")}>
          {convertDelayInMinutesToDelayInHours(
            contract.claim.flightStatus.delay
          )}
        </span>
      </div>
      <div className="detailed-contract-content">
        <span className="date-text">Required Delay</span>
        <span className="destination">
          {convertDelayInMinutesToDelayInHours(contract.product.minDelay)}
        </span>
      </div>
    </div>
  );

  return (
    <div className={["card", "detailed-contract-card"].join(" ")}>
      <Header />
      <FlightSection />
      <DelaySection />
    </div>
  );
};

export default DetailedContractCard;
