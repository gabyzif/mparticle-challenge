// pages/api/anomaly-service/[orgId]/mark-read.ts

import { NextApiRequest, NextApiResponse } from "next";
import data from "@/data/anomalies.json";
import { Anomaly } from "@/types";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { orgId } = req.query;
  const messageIds = req.query.messageId
    ? String(req.query.messageId).split(",")
    : null;

  if (messageIds) {
    const updatedIds: string[] = [];

    data.forEach((anomaly: Anomaly) => {
      if (anomaly.orgId === String(orgId) && messageIds.includes(anomaly.id)) {
        anomaly.read = true;
        updatedIds.push(anomaly.id);
      }
    });
    return res
      .status(200)
      .json({ message: `Records ${updatedIds.join(", ")} marked as read` });
  } else {
    data.forEach((anomaly) => {
      if (anomaly.orgId === String(orgId) && !anomaly.read) {
        anomaly.read = true;
      }
    });
    return res.status(200).json({ message: "All records marked as read" });
  }
}
