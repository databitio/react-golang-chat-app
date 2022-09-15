import "./Navbar.css";
import UserTag from "./UserTag";
import useGlobal from "../hooks/useGlobal";
import useCredentials from "../hooks/useCredentials";

const NavbarMain = () => {
  const global = useGlobal();
  const credentials = useCredentials();
  return (
    <section className="navbar">
      <h1 className="navbar-title">
        Users online: {`(${global?.users?.length})`}
      </h1>
      <UserTag username={credentials?.username} />
      {global?.users?.map((user, index) => (
        <div key={index}>
          <UserTag username={user?.username} />
        </div>
      ))}
    </section>
  );
};

export default NavbarMain;
