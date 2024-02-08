// mock endpoint for getting all the records for a customer

import { NextApiRequest, NextApiResponse } from "next";
import data from "@/data/anomalies.json";
import { Anomaly } from "@/types";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { orgId } = req.query;
  const anomaliesData: Anomaly[] = data;
  const anomalies = anomaliesData.filter(
    (anomaly: Anomaly) => anomaly.orgId === orgId,
  );
  res.status(200).json(anomalies);
}
