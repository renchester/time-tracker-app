import './UserOverview.scss';
import { userType } from '@/types/types';
import useWorkspace from '@/hooks/useWorkspace';
import OverviewPanel from './OverviewPanel';
import useAuth from '@/hooks/useAuth';

function UserOverview(props) {
  const { user } = props;
  const { user: currentUser } = useAuth();
  const { tasks } = useWorkspace();
  const elementID = `user-ov__${user.id}`;

  const tasksForUser = tasks.filter((task) => task.assignee === user.id);

  return (
    <section className="user-ov" aria-labelledby={elementID}>
      <div className="user-ov__top">
        <div className="user-ov__avatar">{user.firstName[0]}</div>
        <h3 className="user-ov__title" id={elementID}>
          {user.firstName} {user.lastName}
        </h3>
      </div>

      <OverviewPanel
        tasks={tasksForUser}
        allowCreate={user.id === currentUser.id}
      />
    </section>
  );
}

UserOverview.propTypes = {
  user: userType,
};

export default UserOverview;
