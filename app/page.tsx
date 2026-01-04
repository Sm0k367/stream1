export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center pt-10 px-4">
      
      {/* Header Section */}
      <header className="text-center mb-8">
        <h1 className="text-5xl font-black tracking-tighter uppercase italic">
          SMOKE STREAM
        </h1>
        <div className="h-1 w-24 bg-purple-600 mx-auto mt-2"></div>
      </header>

      {/* Main Stream Container */}
      <section className="w-full max-w-4xl bg-zinc-900 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.2)] border border-zinc-800">
        
        {/* The Live Video Feed */}
        <div className="aspect-video bg-black flex items-center justify-center">
           <img 
            src="http://localhost:5000/video_feed" 
            alt="Live Stream" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info Bar under Video */}
        <div className="p-6 flex justify-between items-center bg-zinc-900">
          <div>
            <h2 className="text-2xl font-bold text-purple-400">Neon Dreams</h2>
            <p className="text-zinc-400 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              DJ Smoke Stream • Live
            </p>
          </div>
          
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full transition-all">
            SHARE
          </button>
        </div>
      </section>

      {/* Quick Stats/Controls */}
      <footer className="mt-8 text-zinc-500 text-sm italic">
        Powered by Stream1 Engine v1.0
      </footer>
      
    </main>
  );
}
