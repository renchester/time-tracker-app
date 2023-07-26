import './Page.scss';
import useAuth from '@/hooks/useAuth';
import RedirectToLogin from '@/components/redirects/RedirectToLogin';

function Projects() {
  const { user } = useAuth();

  if (!user) return <RedirectToLogin />;

  return (
    <main className="main" aria-labelledby="projects-title">
      <div className="main-wrapper">
        <h1 className="main-title" id="projects-title">
          Projects in your Workspace
        </h1>

        <section
          className="main-section"
          aria-labelledby="projects-section__title"
        >
          <h2 className="main-section__title" id="projects-section__title">
            All Projects
          </h2>
          {/* List of Projects */}
        </section>
      </div>
    </main>
  );
}

export default Projects;
