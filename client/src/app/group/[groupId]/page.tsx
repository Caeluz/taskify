const groupDetailPage = ({
  params,
}: {
  params: {
    groupId: string;
  };
}) => {
  return (
    <div>
      {params.groupId}
      <h1>Group Detail Page</h1>
    </div>
  );
};

export default groupDetailPage;
