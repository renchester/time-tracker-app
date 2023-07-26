import './Page.scss';
import useAuth from '@/hooks/useAuth';
import RedirectToLogin from '@/components/redirects/RedirectToLogin';

function Workspace() {
  const { user } = useAuth();

  if (!user) return <RedirectToLogin />;

  return (
    <main className="main" aria-labelledby="workspace-title">
      <div className="main-wrapper">
        <h1 className="main-title" id="workspace-title">
          Your Workspace
        </h1>

        <section className="main-section">
          {/* Panel for members of workspace */}
        </section>
      </div>
    </main>
  );
}

export default Workspace;
