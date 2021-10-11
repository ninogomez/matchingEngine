import _ from "lodash";

export class OrderBookEntry {
  add(orderEntry, OrderBookDB) {
    OrderBookDB.push(orderEntry);
    return orderEntry.id;
  }
  updateMatch(matchedOrder, limitOrder, OrderBookDB) {
    const orderToUpdate = _.findIndex(OrderBookDB, { id: matchedOrder.id }); // searches for the match
    OrderBookDB[orderToUpdate]["matchedId"] = limitOrder.id; // updates the matched ID in order book
    limitOrder["matchedId"] = OrderBookDB[orderToUpdate].id; // matches the ID for the current limit order
    OrderBookDB.push(limitOrder); // adds the current order with matched existing bid/ask order
    return matchedOrder.id;
  }
}
