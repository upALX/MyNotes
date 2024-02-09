import * as Dialog from '@radix-ui/react-dialog'
import {formatDistanceToNow} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {X} from 'lucide-react'

interface CardNoteProperty{
  new_note_information: {
    id: string
    date: Date
    content: string
  }
  whenDeleteNote: (id: string) => void 
}


export function CardNote({new_note_information, whenDeleteNote}: CardNoteProperty){
    return (
        <Dialog.Root>
          <Dialog.Trigger className="rounded-md text-start flex  flex-col p-5 bg-slate-800 gap-3 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-400 focus-visible:ring-2 focus-visible:ring-lime-400">
            <span className="text-sm font-medium text-slate-400">
            {formatDistanceToNow(new_note_information.date, {locale: ptBR, addSuffix: true})}
            </span>
            <p className="text-sm leading-6 text-slate-400">
            {new_note_information.content}
            </p>
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none"></div>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="inset-0 fixed bg-black/70"/> 
            <Dialog.Content className="fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:h-[60vh] md:max-w-[640px] w-full bg-slate-700 md:rounded-md flex flex-col outline-none">

              <Dialog.Close className='absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100'>
                <X className='size-5'/>
              </Dialog.Close>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <span className="text-sm font-medium text-slate-400">
                {formatDistanceToNow(new_note_information.date, {locale: ptBR, addSuffix: true})} { /* show a suffix há and format the date to now */ }
                
                {/* {new_note_information.date.toISOString()} */}
                </span>
                <p className="text-sm leading-6 text-slate-400">
                  {new_note_information.content}
                </p>
              </div>

              <button type="button" className='bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group'>
                <span onClick={() => whenDeleteNote(new_note_information.id)} className='text-red-400 group-hover:underline'> Exclude here</span>
              </button>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
    )
}