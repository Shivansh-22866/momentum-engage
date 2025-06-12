import { AnomalyAlert } from '@/types/agent';

export default function AnomalyAlert({ alert }: { alert: AnomalyAlert }) {
  const colorMap = {
    low: 'bg-yellow-100 text-yellow-800',
    medium: 'bg-orange-100 text-orange-800',
    high: 'bg-red-100 text-red-800'
  };

  return (
    <div className={`p-3 rounded ${colorMap[alert.severity]}`}>
      <p className="text-sm font-medium">
        <strong>{alert.metric}</strong>: {alert.description}
      </p>
    </div>
  );
}
