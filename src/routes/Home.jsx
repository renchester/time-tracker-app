import './Page.scss';
import useAuth from '@/hooks/useAuth';
import useWorkspace from '@/hooks/useWorkspace';
import RedirectToLogin from '@/components/redirects/RedirectToLogin';
import OverviewPanel from '@/components/overviews/OverviewPanel';

function Home() {
  const { user } = useAuth();
  const { tasks } = useWorkspace();

  if (!user) return <RedirectToLogin />;

  const userTasks = tasks.filter((task) => task.assignee === user.id);

  return (
    <main className="main" aria-labelledby="home-title">
      <div className="main-wrapper">
        <h1 className="main-title" id="home-title">
          Welcome back, {user.firstName}
        </h1>
        <p className="main-subtitle">
          Make sure to diligently review your tasks
        </p>

        <section className="main-section" aria-labelledby="home-section__title">
          <h2 className="main-section__title" id="home-section__title">
            Your tasks
          </h2>
          {/* Panel for tasks */}
          <OverviewPanel tasks={userTasks} allowCreate />
        </section>
      </div>
    </main>
  );
}

export default Home;
