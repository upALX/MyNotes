import logo from "./assets/react.svg";
import { CardNote } from "./components/card-note";

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
        <div className="rounded-md bg-slate-600  p-5 space-y-6 overflow-hidden relative ">
          <span className="text-sm font-medium text-slate-300">Add note...</span>
          <p className="text-sm leading-6 text-slate-400 ">Tap to record audio note 🤓</p>
        </div>
        <CardNote new_note_information={note_information}/>
        <CardNote new_note_information={note_information}/>
        <CardNote new_note_information={note_information}/>
      </div>
    </div>
    </>
  )
}
