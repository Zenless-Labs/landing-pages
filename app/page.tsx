export default function Home() {
  const projects = [
    {
      name: 'Kitty',
      tagline: 'On-chain group payments on Sui',
      url: 'https://kitty.zenlesslabs.com',
      status: 'live',
      network: 'Sui Mainnet',
    },
  ];

  return (
    <main className="min-h-screen bg-[#080b10] text-white font-mono overflow-hidden">
      {/* Grid background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      {/* Glow */}
      <div className="fixed top-[-20%] left-[50%] -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-6 py-24">

        {/* Header */}
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs text-blue-400 tracking-widest uppercase">Zenless Labs</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6 leading-tight">
            Something is<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              cooking...
            </span>
          </h1>

          <p className="text-gray-400 text-lg max-w-lg leading-relaxed">
            Building crypto-native tools on Sui. Small team. Real products. No VC.
          </p>
        </div>

        {/* Projects */}
        <div className="mb-12">
          <div className="text-xs text-gray-500 tracking-widest uppercase mb-6">
            // projects
          </div>

          <div className="space-y-3">
            {projects.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-blue-500/30 transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/20 flex items-center justify-center text-lg">
                    🐱
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-semibold text-white">{p.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                        {p.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400">{p.tagline}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-600 hidden sm:block">{p.network}</span>
                  <svg className="w-4 h-4 text-gray-600 group-hover:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </a>
            ))}

            {/* Placeholder */}
            <div className="flex items-center justify-between p-5 rounded-xl border border-white/5 bg-white/[0.01] opacity-40">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full border-2 border-dashed border-gray-600 animate-spin" style={{ animationDuration: '3s' }} />
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-0.5">?????</div>
                  <div className="text-xs text-gray-600">Coming soon...</div>
                </div>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-yellow-500/10 text-yellow-600 border border-yellow-500/20">
                stealth
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-8 border-t border-white/5">
          <span className="text-xs text-gray-600">© 2026 Zenless Labs LLC</span>
          <div className="flex items-center gap-4">
            <a href="https://github.com/Zenless-Labs" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
              GitHub
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}
