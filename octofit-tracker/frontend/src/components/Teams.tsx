import { useEffect, useState } from 'react';
import { fetchApi } from '../api';

interface TeamMember {
  _id: string;
  name?: string;
  email?: string;
}

interface Team {
  _id: string;
  name: string;
  memberIds: TeamMember[];
}

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchApi<Team>('teams')
      .then((data) => setTeams(data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section className="container py-4">
      <h2>Teams</h2>
      {isLoading && <p>Loading teams...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!isLoading && !error && (
        <div className="accordion" id="teamsAccordion">
          {teams.map((team) => (
            <div className="accordion-item" key={team._id}>
              <h2 className="accordion-header" id={`heading-${team._id}`}>
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse-${team._id}`}
                  aria-expanded="false"
                  aria-controls={`collapse-${team._id}`}
                >
                  {team.name}
                </button>
              </h2>
              <div
                id={`collapse-${team._id}`}
                className="accordion-collapse collapse"
                aria-labelledby={`heading-${team._id}`}
                data-bs-parent="#teamsAccordion"
              >
                <div className="accordion-body">
                  <strong>Members</strong>
                  <ul>
                    {team.memberIds?.map((member) => (
                      <li key={member._id}>
                        {member.name ?? member._id} {member.email ? `(${member.email})` : ''}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
          {teams.length === 0 && <p>No teams found.</p>}
        </div>
      )}
    </section>
  );
}
