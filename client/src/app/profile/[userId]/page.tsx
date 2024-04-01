export default function UserProfile({
  params,
}: {
  params: { userId: number };
}) {
  return (
    <div>
      <h1>User Profile Page {params.userId}</h1>
    </div>
  );
}
