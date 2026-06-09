import { useEffect, useState } from 'react';
import { fetchApi } from '../api';

interface LeaderboardEntry {
  _id: string;
  userId?: string;
  name?: string;
  email?: string;
  totalDuration?: number;
  activityCount?: number;
  rank?: number;
}

export default function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchApi<LeaderboardEntry>('leaderboard')
      .then((data) => setEntries(data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section className="container py-4">
      <h2>Leaderboard</h2>
      {isLoading && <p>Loading leaderboard...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!isLoading && !error && (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Email</th>
                <th>Total Duration</th>
                <th>Activities</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={entry._id ?? index}>
                  <td>{entry.rank ?? index + 1}</td>
                  <td>{entry.name ?? 'Unknown'}</td>
                  <td>{entry.email ?? 'Unknown'}</td>
                  <td>{entry.totalDuration ?? 0} min</td>
                  <td>{entry.activityCount ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {entries.length === 0 && <p>No leaderboard entries found.</p>}
        </div>
      )}
    </section>
  );
}
