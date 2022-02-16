import Item from "./Item";

export default interface Order {
    id: number;
    items: Array<Item>
}