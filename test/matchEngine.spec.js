import { OrderBookDB } from "./data/orderBook.js";
import { MatchingEngine } from "./module/matchingEngine.js";
import assert from "assert";
import _ from "lodash";

const matchingEngine = new MatchingEngine();

describe("Matching Engine", () => {
  describe("BID", () => {
    it("BID should match limit order in order book", () => {
      const limitOrder = {
        id: OrderBookDB.length + 1,
        volume: 10,
        type: "BID",
        price: 7,
      };

      let orderIdResult = matchingEngine.search(limitOrder, OrderBookDB);
      assert.equal(typeof orderIdResult === "number", true);
      assert.notEqual(_.find(OrderBookDB, { id: orderIdResult }), undefined);
      // console.table(OrderBookDB);
    });
    it("BID match not found, create book enter", () => {
      const limitOrder = {
        id: OrderBookDB.length + 1,
        volume: 10,
        type: "BID",
        price: 55,
      };
      let orderIdResult = matchingEngine.search(limitOrder, OrderBookDB);

      assert.equal(typeof orderIdResult === "number", false);
      assert.equal(typeof _.find(OrderBookDB, { id: limitOrder.id }), "object");
      // console.table(OrderBookDB);
    });
    it("BID returns multiple matches and returns first", () => {
      const limitOrder = {
        id: OrderBookDB.length + 1,
        volume: 10,
        type: "BID",
        price: 9,
      };

      const result = matchingEngine.search(limitOrder, OrderBookDB);
      assert.equal(
        _.filter(OrderBookDB, { type: "BID", price: limitOrder.price }).length >
          0,
        true,
        `OrderBook doesn't have multiple records for ${JSON.stringify(
          limitOrder
        )}`
      );
      assert.equal(typeof result !== "object", true);
      // console.log(OrderBookDB);
    });
  });
  describe("ASK", () => {
    it("ASK should match limit order in order book", () => {
      const limitOrder = {
        id: OrderBookDB.length + 1,
        volume: 10,
        type: "ASK",
        price: 4,
      };

      let orderIdResult = matchingEngine.search(limitOrder, OrderBookDB);
      assert.equal(
        typeof orderIdResult === "number",
        true,
        `Not match found for ${JSON.stringify(limitOrder)}`
      );
      assert.notEqual(_.find(OrderBookDB, { id: orderIdResult }), undefined);
      // console.table(OrderBookDB);
    });
    it("ASK match not found, create book entry", () => {
      const limitOrder = {
        id: OrderBookDB.length + 1,
        volume: 10,
        type: "ASK",
        price: 121,
      };
      let orderIdResult = matchingEngine.search(limitOrder, OrderBookDB);

      assert.equal(typeof orderIdResult === "number", false);
      assert.equal(typeof _.find(OrderBookDB, { id: limitOrder.id }), "object");
      // console.table(OrderBookDB);
    });
    it("ASK returns multiple matches and returns first", () => {
      const limitOrder = {
        id: OrderBookDB.length + 1,
        volume: 10,
        type: "ASK",
        price: 2,
      };

      const result = matchingEngine.search(limitOrder, OrderBookDB);
      assert.equal(
        _.filter(OrderBookDB, { type: "ASK", price: limitOrder.price }).length >
          0,
        true,
        `OrderBook doesn't have multiple records for ${JSON.stringify(
          limitOrder
        )}`
      );
      assert.equal(typeof result !== "object", true);
      // console.log(OrderBookDB);
    });
  });
});
