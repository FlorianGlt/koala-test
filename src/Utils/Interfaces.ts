export interface Contract {
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

export interface DetailedContract extends Contract {
  product: {
    minDelay: number;
  };
  claim: {
    status: "accepted" | "rejected";
    flightStatus: {
      delay: number;
    };
  };
}
