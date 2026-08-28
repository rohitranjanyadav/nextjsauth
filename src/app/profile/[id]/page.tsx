export default async function UserProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <h1>Profile</h1>
      <hr />
      <p>Profile page: {id}</p>
    </div>
  );
}
