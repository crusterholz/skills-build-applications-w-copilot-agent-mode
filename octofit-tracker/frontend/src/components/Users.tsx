import { useEffect, useState } from 'react';
import { fetchApi } from '../api';

interface User {
  _id: string;
  name: string;
  email: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchApi<User>('users')
      .then((data) => setUsers(data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section className="container py-4">
      <h2>Users</h2>
      {isLoading && <p>Loading users...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!isLoading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && <p>No users found.</p>}
        </div>
      )}
    </section>
  );
}
