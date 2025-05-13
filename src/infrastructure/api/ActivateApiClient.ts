import { ErrorData } from "./data/ErrorData";
import { ActivateError } from "./data/ApiError";

const API_BASE_URL = 'http://localhost:5000';
const EXPIRED_ERROR = "Expired";
export const getActivate= async () => {
  const response = await fetch(`${API_BASE_URL}/api/activate`);
  if (!response.ok){
    const { error } = await response.json() as ErrorData;
    if(error.message === EXPIRED_ERROR){
      throw new ActivateError("error.message");
    }else{
      throw new Error(`status_code:${error.status_code}\n message=${error.message}`);
    }
  }
  return ;
}
