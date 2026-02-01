import Userinput from "./components/Userinput";
function App() {
  return (
    <>
      <div
        className="h-screen w-screen p-4
       bg-zinc-800 flex flex-col  items-center  "
      >
        <h1
          className="text-3xl text-amber-50   sm:text-4xl md:text-5xl lg:text-6xl
        "
        >
          TaskManager
        </h1>

        <Userinput />
      </div>
    </>
  );
}

export default App;
