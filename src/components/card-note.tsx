export function CardNote(){
    return (
        <div className="rounded-md bg-slate-800 space-y-6 overflow-hidden relative">
          <span className="text-sm font-medium text-slate-400">Add note...</span>
          <p className="text-sm leading-6 text-slate-400">Tap to record audio note 🤓</p>
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none"></div>
        </div>
    )
}