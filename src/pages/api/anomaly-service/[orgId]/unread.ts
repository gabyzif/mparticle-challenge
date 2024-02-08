// pages/api/anomaly-service/[orgId]/unread.ts
import { NextApiRequest, NextApiResponse } from "next";
import data from "@/data/anomalies.json"; // Adjust path as needed

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { orgId } = req.query;
  const unreadAnomalies = data.filter(
    (anomaly) => anomaly.orgId === orgId && !anomaly.read,
  );
  res.status(200).json(unreadAnomalies);
}
