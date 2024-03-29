import * as Dialog from '@radix-ui/react-dialog';
import {X} from 'lucide-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import {toast} from 'sonner';

interface NewNoteCard {
    whenNoteCreated: (contentNote: string) => void
}

let speechRecognition: SpeechRecognition | null = null

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

        if(contentNote === ''){
            return 
        }

        whenNoteCreated(contentNote)

        setContent('')

        setShouldShowTextMessage(true)

        toast.success('Your note was created with success 🚀')
    }

    function handleStartRecord(){

        const isSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window
        || 'webkitSpeechRecognition' in window

        if (!isSpeechRecognitionAPIAvailable){
            alert('Your browser has no support to record API :(') // put a toast here with alert
            return
        }

        setIsRecording(true)

        setShouldShowTextMessage(false)

        const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

        speechRecognition = new SpeechRecognitionAPI

        speechRecognition.lang = 'pt-BR';
        speechRecognition.continuous = true; // dont exit the recording if has silance, only when 
        speechRecognition.maxAlternatives = 1; // return 
        speechRecognition.interimResults = true;  // return all result of text when i talk 

        speechRecognition.onresult = (event) =>{
            // console.log(event.results)
            const transcription = Array.from(event.results).reduce( (transcriptionInRealTime, transcriptionWordsMaked) => {
                return transcriptionInRealTime.concat(transcriptionWordsMaked[0].transcript)
            }, '')

            setContent(transcription)
        }

        speechRecognition.onerror = (event) => {
            console.error(event)
        }

        speechRecognition.start()
    }

    function handleStopRecord(){
        setIsRecording(false)

        if (speechRecognition != null){
            speechRecognition.stop()
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
            <Dialog.Content className="fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:h-[60vh] md:max-w-[640px] w-full bg-slate-700 md:rounded-md flex flex-col outline-none">
                
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
