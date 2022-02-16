import Order from "./Order";

export default interface User {
    id: number;
    orders: Array<Order>
}