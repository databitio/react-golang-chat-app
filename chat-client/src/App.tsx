import "./App.css";
import ChatMain from "./chat/ChatMain";
import NavbarMain from "./navbar/NavbarMain";

function App() {
  return (
    <main className="app">
      <section className="main">
        <NavbarMain />
        <ChatMain />
      </section>
    </main>
  );
}

export default App;
