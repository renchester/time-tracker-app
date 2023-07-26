import useWorkspace from '@/hooks/useWorkspace';
import './Page.scss';

import { Link, useParams } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import OverviewPanel from '@/components/overviews/OverviewPanel';
import RedirectToLogin from '@/components/redirects/RedirectToLogin';

function ProjectDetails() {
  const { user } = useAuth();
  const { slug } = useParams();
  const { projects, tasks } = useWorkspace();

  // Find the project based on url slug params
  const targetProject = projects.find((proj) => proj.slug === slug);
  const tasksByProject = tasks.filter(
    (task) => task.project === targetProject.title,
  );

  if (!user) return <RedirectToLogin />;

  if (!targetProject) return null;

  return (
    <main className="main">
      <div className="main-wrapper">
        <h1 className="main-title">{targetProject.title}</h1>
        <p className="main-subtitle">Client: {targetProject.client}</p>

        <section className="main-section" aria-labelledby="proj-ov__title">
          <h2 className="main-section__title" id="proj-ov__title">
            Overview for {targetProject.title}
          </h2>
          <OverviewPanel tasks={tasksByProject} allowCreate />
        </section>

        <section
          className="main-section proj-det"
          aria-labelledby="proj-det__title"
        >
          <h2 className="main-section__title" id="proj-det__title">
            Other projects
          </h2>

          {/* Links to other projects */}
          <ul className="proj-det__list">
            {projects
              .filter((curr) => curr.title !== targetProject.title)
              .map((proj) => (
                <Link
                  to={`/projects/${proj.slug}`}
                  className="proj-det__link"
                  key={proj.id}
                >
                  <li className="proj-det__item">{proj.title}</li>
                </Link>
              ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
export default ProjectDetails;
