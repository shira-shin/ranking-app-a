import { useAuth } from '../components/AuthProvider';

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return <p className="p-4">Please login.</p>;
  }

  return (
    <div className="max-w-[1140px] mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Profile</h1>
      <p>Welcome, {user.name || user.email}</p>
    </div>
  );
}
