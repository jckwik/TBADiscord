import { GetFromTBA } from "../common/web-request";
import { API_Status } from "../models/api-status";

const statusGetStatus = async () => {
  return GetFromTBA(`/status`) as Promise<API_Status>;
};

export { statusGetStatus };
