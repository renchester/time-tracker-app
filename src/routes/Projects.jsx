import './Page.scss';
import useAuth from '@/hooks/useAuth';
import useWorkspace from '@/hooks/useWorkspace';
import RedirectToLogin from '@/components/redirects/RedirectToLogin';
import ProjectCard from '@/components/cards/ProjectCard';

function Projects() {
  const { user } = useAuth();
  const { projects } = useWorkspace();

  if (!user) return <RedirectToLogin />;

  return (
    <main className="main" aria-labelledby="projects-title">
      <div className="main-wrapper">
        <h1 className="main-title" id="projects-title">
          Projects in your Workspace
        </h1>
        <p className="main-subtitle">
          Review the projects that you are working on
        </p>

        <section
          className="main-section"
          aria-labelledby="projects-section__title"
        >
          <h2 className="main-section__title" id="projects-section__title">
            All Projects
          </h2>
          {/* List of Projects */}
          <ul className="projects__list">
            {projects.length > 0 &&
              projects.map((proj) => (
                <ProjectCard key={proj.id} project={proj} />
              ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

export default Projects;
