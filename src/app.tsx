import { useState } from "react";
import logo from "./assets/react.svg";
import { CardNote } from "./components/card-note";
import { NewCardNote } from "./components/new-note"; 

interface Note{
  id: string,
  date: Date,
  content: string
}

export function App() {

  const [notes, setNotes] = useState<Note[]>( () => {
    const notesOnStorage = localStorage.getItem('notes')
    
    if (notesOnStorage){
      return JSON.parse(notesOnStorage)
    }

    return []
  })

  function whenNoteCreated(content: string){
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }

    const notesArray = [newNote, ...notes]

    setNotes(notesArray) // copy all notes that i have, and add a new note

    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  return (
    <>
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={logo} alt="Only react logo" />
      <form action="w-full">
        <input type="text" name="" id="" placeholder="I want the note..." className="w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 border-green-500" />
      </form>

      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <NewCardNote whenNoteCreated={whenNoteCreated}/>
        {/* <CardNote new_note_information={note_information}/> */}

        {notes.map(note => {
          return <CardNote key={note.id} new_note_information={note}/>
        })}

      </div>
    </div>
    </>
  )
}
