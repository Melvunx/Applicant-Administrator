import userAuthStore from "@/api/auth";
import Navbar from "@/components/Navbar";

export default function Profile() {
  const { user } = userAuthStore();

  return (
    <>
      <Navbar />
      <div className="card card-lg shadow-lg">
        <ul className="card-body">
          <h1 className="card-title">{user?.username} profile</h1>
          {user && (
            <>
              <li className="text-primary">{user.email}</li>{" "}
              <li className="text-secondary">{user.role.toLowerCase()}</li>
            </>
          )}
        </ul>
      </div>
    </>
  );
}
