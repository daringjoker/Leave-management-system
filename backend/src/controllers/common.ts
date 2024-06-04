import { Response } from "express";
import _ from "lodash";

export function sendArrayResponse(res: Response, data: any) {
  if (!data) {
    return res.status(404).send({ msg: "Resource not found" });
  }
  if (_.isEmpty(data)) {
    return res.status(200).send([]);
  }
  if (Array.isArray(data)) {
    return res.status(200).send(data);
  }
}
