const UserTag = (props: { username: string }) => {
  const { username } = props;
  return <div className="user-tag">{`- ${username}`}</div>;
};

export default UserTag;
