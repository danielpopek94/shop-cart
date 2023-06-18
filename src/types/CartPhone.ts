import type Phone from "./Phone";

export default interface CartPhone extends Phone {
  quantity: number;
}