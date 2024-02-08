import * as Dialog from '@radix-ui/react-dialog'
import {X} from 'lucide-react'
import { ChangeEvent, useState } from 'react'


export function NewCardNote(){
    const [shouldShowTextMessage, setShouldShowTextMessage] = useState(true)    

    function handleStartNote(){
        setShouldShowTextMessage(false)
    }

    function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>){
        if(event.target.value === ''){
            setShouldShowTextMessage(true)
        }
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger className='rounded-md flex flex-col bg-slate-700 text-left p-5 gap-3 outline-none hover:ring-2 hover:ring-slate-400 focus-visible:ring-2 focus-visible:ring-lime-400'>
                <span className="text-sm font-medium text-slate-300">Add note...</span>
                <p className="text-sm leading-6 text-slate-400 ">Write an note or tap to record audio note 🤓</p>
            </Dialog.Trigger>
            

            <Dialog.Portal>
            <Dialog.Overlay className="inset-0 fixed bg-black/70"/> 
            <Dialog.Content className="fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[60vh] max-w-[640px] w-full bg-slate-700 rounded-md flex flex-col outline-none">

              <Dialog.Close className='absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100'>
                <X className='size-5'/>
              </Dialog.Close>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <span className="text-sm font-medium text-slate-400">
                    Add new note...
                </span>
                {shouldShowTextMessage ? (
                    <p className="text-sm leading-6 text-slate-400">
                    Start a button note with <button  onClick={handleStartNote} className="text-lime-300 ">text</button> or  <button onClick={handleStartNote} className="text-lime-300 ">audio</button>...
                    </p>
                ) : (
                    <textarea name="" id="" autoFocus className='text-sm leading-6 text-slate-400 bg-transparent rezise-none flex-1 outline-none' onChange={handleContentChange}>
                    </textarea>
                )}
              </div>

              <button type="button" className='bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium  hover:bg-lime-500'>
                Save here
              </button>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
    )
}
