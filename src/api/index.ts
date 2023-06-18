import type CartPhone from "@/types/CartPhone";
import type Phone from "@/types/Phone";
import axios from "axios";

const BASIC_URL = 'https://pru-vq89.onrender.com'

export const getProducts = async ():Promise<Phone[]> => {
	try {
		const response = await axios.get(BASIC_URL + '/products');
		return response.data;
	} catch (error: any) {
		throw error;
	}
}

export const placeOrder = async (dataToSend: CartPhone[]) => {
  try {
    const response = await axios.post(BASIC_URL + '/products', dataToSend);
    return response.data;
  } catch (error) {
    throw error;
  }
};
