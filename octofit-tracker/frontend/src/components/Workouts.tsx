import { useEffect, useState } from 'react';
import { fetchApi } from '../api';

interface Workout {
  _id: string;
  title: string;
  description: string;
  intensity: string;
  exercises: string[];
}

export default function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchApi<Workout>('workouts')
      .then((data) => setWorkouts(data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section className="container py-4">
      <h2>Workouts</h2>
      {isLoading && <p>Loading workouts...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!isLoading && !error && (
        <div className="row gy-3">
          {workouts.map((workout) => (
            <div className="col-12 col-md-6" key={workout._id}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{workout.title}</h5>
                  <p className="card-text">{workout.description}</p>
                  <p>
                    <strong>Intensity:</strong> {workout.intensity}
                  </p>
                  <p>
                    <strong>Exercises:</strong>
                    <ul>
                      {workout.exercises.map((exercise) => (
                        <li key={exercise}>{exercise}</li>
                      ))}
                    </ul>
                  </p>
                </div>
              </div>
            </div>
          ))}
          {workouts.length === 0 && <p>No workouts found.</p>}
        </div>
      )}
    </section>
  );
}
