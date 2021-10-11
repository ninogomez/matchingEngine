// import { orderBookDB } from "./orderBook.js";
import { OrderBookEntry } from "./orderBookEntry.js";
import _ from "lodash";

const orderBookEntry = new OrderBookEntry();

export class MatchingEngine {
  search(limitOrder, OrderBookDB) {
    let matchFound;
    let notFound = false;

    if (limitOrder.type === "BID") {
      matchFound = OrderBookDB.filter(
        (o) => o.type === "ASK" && o.price === limitOrder.price
      ).sort();
      if (matchFound.length > 0) {
        return orderBookEntry.updateMatch(
          matchFound[0],
          limitOrder,
          OrderBookDB
        );
      }
      notFound = true;
    } else if (limitOrder.type === "ASK") {
      matchFound = OrderBookDB.filter(
        (o) => o.type === "BID" && o.price === limitOrder.price
      ).sort();
      if (matchFound.length > 0) {
        return orderBookEntry.updateMatch(
          matchFound[0],
          limitOrder,
          OrderBookDB
        );
      }
      notFound = true;
    }

    orderBookEntry.add(limitOrder, OrderBookDB);
    return notFound;
  }
}
