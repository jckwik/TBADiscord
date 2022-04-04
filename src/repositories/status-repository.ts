import { GetFromTBA } from "../common/web-request";

const statusGetStatus = async () => {
  return GetFromTBA(`/status`);
};
