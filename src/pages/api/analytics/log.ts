// pages/api/analytics/log.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { BigQuery } from '@google-cloud/bigquery';
import type { EventName, EventProperties } from '@/types/analytics';

interface AnalyticsPayload {
  event: EventName;
  properties: EventProperties;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const payload = req.body as AnalyticsPayload;
    
    // Validate payload
    if (!payload || !payload.event || !payload.properties) {
      console.error('Invalid payload:', payload);
      return res.status(400).json({ message: 'Invalid payload' });
    }

    const bigquery = new BigQuery({
      projectId: process.env.GOOGLE_CLOUD_PROJECT,
    });

    const dataset = bigquery.dataset('analytics');
    const table = dataset.table('events');

    const row = {
      event_name: payload.event,
      ...payload.properties,
      environment: process.env.NODE_ENV,
      client_timestamp: new Date().toISOString(),
    };

    await table.insert([row]);

    res.status(200).json({ message: 'Event logged successfully' });
  } catch (error) {
    console.error('Error logging event:', error);
    res.status(500).json({ message: 'Error logging event', error: error });
  }
}