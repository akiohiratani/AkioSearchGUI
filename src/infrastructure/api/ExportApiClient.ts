import { ErrorData } from "./data/ErrorData";
import { ExportResultData } from "./data/ExportResultData";

const API_BASE_URL = 'http://127.0.0.1:5000/api';

export const exportDataset= async (race_id:string): Promise<string> => {

  // 選択したレースを出力
  const response = await fetch(`${API_BASE_URL}/races/data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: race_id })
  })
  
  if (!response.ok) {
    const { error } = await response.json() as ErrorData;
    throw new Error(`status_code:${error.status_code}\n message=${error.message}`);
  }

  const { data } = await response.json() as ExportResultData;
  return data;
}
