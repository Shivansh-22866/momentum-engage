'use client';

import { useState } from 'react';
import AnomalyAlert from './AnomalyAlert';
import { MomentumScore, AnomalyAlert as Alert, ProjectConfig } from '@/types/agent';

const DEFAULT_PROJECT: ProjectConfig = {
  name: 'Lens Protocol',
  githubRepo: 'https://github.com/RocketChat/Rocket.Chat',
  twitterHandle: 'raseshGaut_BTC',
  contractAddress: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
  discord: {
    serverId: '1381348107551379557',
    channelId: '1381348108453286063'
  }
};

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState<MomentumScore | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleRunAgent = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project: DEFAULT_PROJECT,
          timeWindow: 48,
          updateInterval: 60,
          anomalyThreshold: 2.5
        })
      });

      const json = await res.json();
      if (json.status === 'ok') {
        setScore(json.score);
        setAlerts(json.alerts);
      } else {
        setError('Agent failed to respond correctly.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to contact the backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">📊 Momentum Tracker Agent</h1>

      <div className="flex justify-center">
        <button
          onClick={handleRunAgent}
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Run Momentum Agent'}
        </button>
      </div>

      {error && (
        <div className="text-red-500 text-center">{error}</div>
      )}

      {score && (
        <div className="p-4 bg-gray-900 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">🔥 Current Momentum Score</h2>
          <ul className="grid grid-cols-2 gap-3">
            <li><strong>Overall:</strong> {score.overall.toFixed(2)}</li>
            <li><strong>GitHub:</strong> {score.github.toFixed(2)}</li>
            <li><strong>Social:</strong> {score.social.toFixed(2)}</li>
            <li><strong>Onchain:</strong> {score.onchain.toFixed(2)}</li>
            <li><strong>Community:</strong> {score.community.toFixed(2)}</li>
            <li><strong>Trend:</strong> <span className="capitalize">{score.trend}</span></li>
            <li><strong>Confidence:</strong> {(score.confidence * 100).toFixed(1)}%</li>
          </ul>
        </div>
      )}

      {alerts.length > 0 && (
        <div className="bg-red-50 p-4 rounded-lg shadow space-y-2">
          <h2 className="text-xl font-semibold text-red-700">🚨 Anomalies Detected</h2>
          {alerts.map(alert => (
            <AnomalyAlert key={alert.id} alert={alert} />
          ))}
        </div>
      )}
    </div>
  );
}
