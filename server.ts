const http = require("http");

const data = [
  {
    claim: { flightStatus: { delay: 301 }, status: "accepted" },
    product: { minDelay: 180 },
    flight: {
      from: { iata: "BCN", name: "Barcelona" },
      number: "AF1238",
      start: "2019-09-16T05:30:00.000+01:00",
      to: { iata: "JFK", name: "NewYork" },
      nbOfTravellers: 3,
    },
    id: "1",
    type: "flight",
  },
  {
    claim: { flightStatus: { delay: 38 }, status: "rejected" },
    product: { minDelay: 180 },
    flight: {
      from: { iata: "JFK", name: "NewYork" },
      number: "AF1338",
      start: "2019-07-16T06:30:00.000-06:00",
      to: { iata: "BCN", name: "Barcelona" },
      nbOfTravellers: 3,
    },
    id: "2",
    type: "flight",
  },
];

const port = 9090;
const server = `http://localhost:${port}`;

/**
 * Validate the output of a route.
 *
 * @param {string} url The URL of the resource.
 * @callback expected
 * @param {Object} body The fetched resource.
 }} expected
 */
function validateRoute(url, expected) {
  return http.get(
    `${server}/${url}`,
    (res) => {
      res.setEncoding("utf8");
      let body = "";
      res.on("data", (data) => {
        body += data;
      });
      res.on("end", () => {
        const jsonBody = JSON.parse(body.length === 0 ? "{}" : body);
        if (!expected(jsonBody)) throw new Error(`Bad response: '${body}'`);
        console.log(">", url);
      });
    },
    (reason) => {
      throw new Error(`Failure: ${reason}`);
    }
  );
}

// Create an HTTP server responding on localhost ${port} (default: 9090).
//
// This server serve the data from ${data}.
//
// It exposes 2 routes:
// GET /contract     - Return the list of contract.
// GET /contract/:id - Return a detailed version of a contract.
http
  .createServer((req, res) => {
    const [, route, id] = req.url.match(/(\/contract)\/?([0-9]+)?$/) || [];
    const found = route !== undefined;
    const sleepingTime = Math.exp(Math.random() * 9);
    let body;
    if (found) {
      if (id === undefined) {
        body = data.map(({ contract, claim, ...data }) => data);
      } else {
        body = data[Number.parseInt(id) - 1];
      }
    }
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (body) res.setHeader("Content-Type", "application/json");
    res.writeHead(body ? 200 : 404);
    setTimeout(() => res.end(JSON.stringify(body, null, 2)), sleepingTime);
  })
  .listen(port, () => {
    console.log(`Server is listening on ${server}`);
  });

// Ensure the responses are valid.
validateRoute("contract", (body) => body.length === data.length);
validateRoute("contract/1", (body) => body.id === data[0].id);
validateRoute("contract/2", (body) => body.id === data[1].id);
