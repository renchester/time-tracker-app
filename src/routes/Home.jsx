import './Page.scss';
import useAuth from '@/hooks/useAuth';
import RedirectToLogin from '@/components/redirects/RedirectToLogin';

function Home() {
  const { user } = useAuth();

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
        </section>
      </div>
    </main>
  );
}

export default Home;
