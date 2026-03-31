import HealthStatus from "@/components/HealthStatus";

export default function Footer() {
  return (
    <footer className="relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="py-5 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-3">

          {/* Left — copyright */}
          <p className="text-xs text-slate-400">
            © 2026 Wrappp, Inc. All rights reserved.
          </p>

          {/* Centre — source + issue + donate */}
          <div className="flex items-center gap-4">
            {/* GitHub source */}
            <a
              href="https://github.com/gattolab/wrappp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors duration-150 group"
              title="View source on GitHub"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              <span>Source</span>
            </a>

            <span className="text-slate-300 text-xs">·</span>

            {/* Report issue */}
            <a
              href="https://github.com/gattolab/wrappp/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors duration-150"
              title="Report an issue on GitHub"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="shrink-0">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
                <path d="M12 8v4M12 16v.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span>Report issue</span>
            </a>

            <span className="text-slate-300 text-xs">·</span>

            {/* Ko-fi donate */}
            <a
              href="https://ko-fi.com/babytub"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-500 transition-colors duration-150"
              title="Support on Ko-fi"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402C1 3.759 3.518 2 6 2c1.981 0 3.86.788 5 2.109C12.14 2.788 14.019 2 16 2c2.482 0 5 1.759 5 5.191 0 4.105-5.37 8.863-11 14.402z" />
              </svg>
              <span>Support</span>
            </a>
          </div>

          {/* Right — system status */}
          <HealthStatus />
        </div>
      </div>
    </footer>
  );
}
