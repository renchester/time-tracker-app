import './Page.scss';
import useAuth from '@/hooks/useAuth';
import useWorkspace from '@/hooks/useWorkspace';
import RedirectToLogin from '@/components/redirects/RedirectToLogin';
import OverviewPanel from '@/components/overviews/OverviewPanel';

function Home() {
  const { user } = useAuth();
  const { tasks } = useWorkspace();

  const userTasks = tasks.filter((task) => task.assignee === user.id);

  if (!user) return <RedirectToLogin />;

  return (
    <main className="main" aria-labelledby="home-title">
      <div className="main-wrapper">
        <h1 className="main-title" id="home-title">
          Welcome back, {user.firstName}
        </h1>

        <section className="main-section" aria-labelledby="home-section__title">
          <h2 className="main-section__title" id="home-section__title">
            Your tasks for today
          </h2>
          {/* Panel for tasks */}
          <OverviewPanel tasks={userTasks} />
        </section>
      </div>
    </main>
  );
}

export default Home;
