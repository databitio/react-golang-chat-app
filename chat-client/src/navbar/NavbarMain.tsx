import "./Navbar.css";
import UserTag from "./UserTag";
import useGlobal from "../hooks/useGlobal";
import useCredentials from "../hooks/useCredentials";

const NavbarMain = () => {
  const global = useGlobal();
  const userListLen = global?.users?.length ? global?.users?.length : 1;

  return (
    <section className="navbar">
      <h1 className="navbar-title">Users online: {`(${userListLen})`}</h1>
      {global?.users?.map((user, index) => (
        <div key={index}>
          <UserTag username={user} />
        </div>
      ))}
    </section>
  );
};

export default NavbarMain;
