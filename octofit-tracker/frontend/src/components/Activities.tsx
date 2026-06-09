import { useEffect, useState } from 'react';
import { fetchApi } from '../api';

interface Activity {
  _id: string;
  type: string;
  durationMinutes: number;
  distanceMiles?: number;
  date?: string;
}

export default function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchApi<Activity>('activities')
      .then((data) => setActivities(data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section className="container py-4">
      <h2>Activities</h2>
      {isLoading && <p>Loading activities...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!isLoading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Type</th>
                <th>Duration</th>
                <th>Distance</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id}>
                  <td>{activity.type}</td>
                  <td>{activity.durationMinutes} min</td>
                  <td>{activity.distanceMiles ?? '–'}</td>
                  <td>{activity.date ? new Date(activity.date).toLocaleString() : 'n/a'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {activities.length === 0 && <p>No activities found.</p>}
        </div>
      )}
    </section>
  );
}
