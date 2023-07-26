import './Page.scss';
import useAuth from '@/hooks/useAuth';
import useWorkspace from '@/hooks/useWorkspace';
import RedirectToLogin from '@/components/redirects/RedirectToLogin';
import UserOverview from '@/components/overviews/UserOverview';

function Workspace() {
  const { user: currentUser } = useAuth();
  const { users } = useWorkspace();

  if (!currentUser) return <RedirectToLogin />;

  return (
    <main className="main" aria-labelledby="workspace-title">
      <div className="main-wrapper">
        <h1 className="main-title" id="workspace-title">
          Your Workspace
        </h1>
        <p className="main-subtitle">
          See what everyone is up to at this time!
        </p>

        <section className="main-section">
          {/* Panel for members of workspace */}
          {users.length > 0 ? (
            users.map((user) => <UserOverview key={user.id} user={user} />)
          ) : (
            <p className="main-empty">There are no users here</p>
          )}
        </section>
      </div>
    </main>
  );
}

export default Workspace;
