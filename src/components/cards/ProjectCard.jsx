import './ProjectCard.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useWorkspace from '@/hooks/useWorkspace';
import { projectType } from '@/types/types';

function ProjectCard(props) {
  const { project } = props;
  const { tasks } = useWorkspace();

  const [progress, setProgress] = useState(0);

  const elementID = `project-card__${project.slug}`;

  useEffect(() => {
    const tasksUnderProject = tasks.filter(
      (task) => task.project === project.title,
    );

    if (tasksUnderProject.length > 0) {
      // Calculate for the project progress
      // (Done tasks divided by the total number of tasks)

      const doneTasks = tasksUnderProject.filter((task) => {
        return task.endTime < new Date().getTime();
      });

      const result = Math.round(
        (doneTasks.length / tasksUnderProject.length) * 100,
      );

      // Set the progress state to the result
      setProgress(result);
    }
  }, [tasks, project]);

  return (
    <li className="proj-card__container">
      <Link to={`/projects/${project.slug}`}>
        <div
          aria-labelledby={elementID}
          className="proj-card"
          style={{
            borderColor: project.color,
          }}
        >
          <h3 id={elementID} className="proj-card__title">
            {project.title}
          </h3>
          <p className="proj-card__details">Client: {project.client}</p>

          <span className="proj-card__details">Progress: {progress}%</span>
        </div>
      </Link>
    </li>
  );
}

ProjectCard.propTypes = {
  project: projectType.isRequired,
};

export default ProjectCard;
