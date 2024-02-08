import logo from "./assets/react.svg";
import { CardNote } from "./components/card-note";
import { NewCardNote } from "./components/new-note"; 

const note_information = {
  date: new Date(),
  content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis dolor deleniti dolorem ratione vitae, nostrum sequi molestias soluta totam, excepturi asperiores placeat est porro. Provident alias nobis quo animi nam!'
}

export function App() {

  return (
    <>
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={logo} alt="Only react logo" />
      <form action="w-full">
        <input type="text" name="" id="" placeholder="I want the note..." className="w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 border-green-500" />
      </form>

      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <NewCardNote/>
        <CardNote new_note_information={note_information}/>
      </div>
    </div>
    </>
  )
}
