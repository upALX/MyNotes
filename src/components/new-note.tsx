import * as Dialog from '@radix-ui/react-dialog';
import {X} from 'lucide-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import {toast} from 'sonner';

interface NewNoteCard {
    whenNoteCreated: (contentNote: string) => void
}


export function NewCardNote({whenNoteCreated}: NewNoteCard){
    const [shouldShowTextMessage, setShouldShowTextMessage] = useState(true)    
    const [contentNote, setContent] = useState('')
    const [isRecording, setIsRecording] = useState(false)

    function handleStartNote(){
        setShouldShowTextMessage(false)
    }

    function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>){
        setContent(event.target.value)

        if(event.target.value === ''){
            setShouldShowTextMessage(true)
        }
    }

    function handleSaveNote(event: FormEvent){
        event.preventDefault()

        whenNoteCreated(contentNote)

        setContent('')

        setShouldShowTextMessage(true)

        toast.success('Your note was created with success 🚀')
    }

    function handleStartRecord(){
        setIsRecording(true)
    }

    function handleStopRecord(){
        setIsRecording(false)
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

              <form  className='flex-1 flex flex-col'>

              <div className="flex flex-1 flex-col gap-3 p-5">
                <span className="text-sm font-medium text-slate-400">
                    Add new note...
                </span>

                {shouldShowTextMessage ? (
                    <p className="text-sm leading-6 text-slate-400">
                    Start a button note with <button  type="button" onClick={handleStartNote} className="text-lime-300 ">text </button> or  <button type="button" onClick={handleStartRecord}  className="text-lime-300 ">audio</button>...
                    </p>
                ) : (
                    <textarea autoFocus className='text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none' onChange={handleContentChange} value={contentNote}/>
                )}
              </div>

              {isRecording ? (
                <button type="button" onClick={handleStopRecord} className='w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm text-slate-400 outline-none font-medium  hover:bg-slate-100'>
                
                <div className="size-3 rounded-full bg-red-600 animate-pulse"/>
                Recording... Tap to stop!
            </button>
              ) : (
                <button type="button" onClick={handleSaveNote} className='w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium  hover:bg-lime-500'>
                    Save here
                </button>
              )}
                </form>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
    )
}
