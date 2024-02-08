export function CardNote(){
    return (
        <button className="rounded-md text-start p-5 bg-slate-800 space-y-6 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-400 focus-visible:ring-2 focus-visible:ring-lime-400">
          <span className="text-sm font-medium text-slate-400">Add note...</span>
          <p className="text-sm leading-6 text-slate-400">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque libero modi, sit quibusdam sunt nisi aliquid aspernatur! Sint fugit ad ratione cupiditate dicta laudantium dolorum totam eum quos ea! Itaque. 🤓</p>
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none"></div>
        </button>
    )
}