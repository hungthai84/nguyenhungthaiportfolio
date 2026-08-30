import React, { useState } from 'react';
import { 
  Play, Download, CheckCircle, AlertCircle, ChevronRight,
  TrendingUp, Users, Database, Sparkles, User,
  Megaphone, ArrowRight, Info, X
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function UITemplate() {
  const [activeTab, setActiveTab] = useState<'buttons' | 'inputs' | 'cards' | 'typography' | 'badges' | 'banners'>('buttons');

  return (
    <div className="w-full h-full p-4 sm:p-8 flex flex-col items-center">
      <div className="w-full max-w-5xl space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary">
            UI Components
          </h1>
          <p className="text-base sm:text-lg text-foreground/70 max-w-2xl mx-auto">
            A showcase of the visual language and reusable components used across this application.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 border-b border-brand-border/50 pb-4">
          {['typography', 'buttons', 'inputs', 'cards', 'badges', 'banners'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-semibold capitalize transition-all duration-300",
                activeTab === tab 
                  ? "bg-brand-primary text-white shadow-[0_0_15px_rgba(var(--brand-primary-rgb),0.5)]" 
                  : "bg-background/40 border border-brand-border/50 text-foreground/70 hover:text-foreground hover:bg-background/60"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="w-full relative min-h-[400px]">
          
          {/* Typography Tab */}
          {activeTab === 'typography' && (
            <div className="space-y-8 animate-in fade-in zoom-in duration-500">
              <div className="glass-panel p-8 rounded-3xl space-y-6">
                <div>
                  <h1 className="text-5xl font-bold mb-2">Heading 1</h1>
                  <p className="text-sm text-foreground/50 font-mono">text-5xl font-bold</p>
                </div>
                <div>
                  <h2 className="text-4xl font-semibold mb-2">Heading 2</h2>
                  <p className="text-sm text-foreground/50 font-mono">text-4xl font-semibold</p>
                </div>
                <div>
                  <h3 className="text-3xl font-medium mb-2">Heading 3</h3>
                  <p className="text-sm text-foreground/50 font-mono">text-3xl font-medium</p>
                </div>
                <div>
                  <h4 className="text-2xl font-medium mb-2 text-brand-primary">Heading 4 (Colored)</h4>
                  <p className="text-sm text-foreground/50 font-mono">text-2xl font-medium text-brand-primary</p>
                </div>
                <div className="pt-4 border-t border-brand-border/50">
                  <p className="text-base text-foreground/80 leading-relaxed">
                    This is standard body text. Used for paragraphs, long descriptions, and general content. The typography uses modern sans-serif fonts with comfortable line height and relaxed letter spacing to ensure readability across all devices.
                  </p>
                  <p className="text-sm text-foreground/50 font-mono mt-2">text-base text-foreground/80 leading-relaxed</p>
                </div>
              </div>
            </div>
          )}

          {/* Buttons Tab */}
          {activeTab === 'buttons' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 animate-in fade-in zoom-in duration-500">
              {/* Primary Buttons */}
              <div className="glass-panel p-8 rounded-3xl space-y-6">
                <h3 className="text-xl font-semibold mb-4 text-brand-primary">Primary Actions</h3>
                <div className="flex flex-wrap gap-4">
                  <button className="px-6 py-3 rounded-full bg-brand-primary text-white font-medium hover:scale-105 transition-transform shadow-[0_0_15px_rgba(var(--brand-primary-rgb),0.4)]">
                    Primary Button
                  </button>
                  <button className="px-6 py-3 rounded-full bg-brand-secondary text-white font-medium hover:scale-105 transition-transform shadow-[0_0_15px_rgba(var(--brand-secondary-rgb),0.4)] flex items-center gap-2">
                    <Download size={18} /> With Icon
                  </button>
                </div>
              </div>

              {/* Secondary & Outline */}
              <div className="glass-panel p-8 rounded-3xl space-y-6">
                <h3 className="text-xl font-semibold mb-4 text-brand-secondary">Secondary & Outline</h3>
                <div className="flex flex-wrap gap-4">
                  <button className="px-6 py-3 rounded-full bg-background/50 border border-brand-border text-foreground font-medium hover:bg-background/80 transition-all">
                    Secondary Button
                  </button>
                  <button className="px-6 py-3 rounded-full border-2 border-brand-primary text-brand-primary font-medium hover:bg-brand-primary/10 transition-all">
                    Outline Action
                  </button>
                </div>
              </div>

              {/* Glass & Subtle */}
              <div className="glass-panel p-8 rounded-3xl space-y-6 sm:col-span-2">
                <h3 className="text-xl font-semibold mb-4 text-foreground/80">Glassmorphism & Utilities</h3>
                <div className="flex flex-wrap gap-6 items-center">
                  <button className="px-8 py-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors shadow-xl">
                    Glass Panel Button
                  </button>
                  <button className="w-12 h-12 rounded-full bg-brand-accent/20 text-brand-accent flex items-center justify-center hover:bg-brand-accent hover:text-white transition-all">
                    <Play size={20} fill="currentColor" />
                  </button>
                  <button className="text-brand-primary font-medium hover:underline flex items-center gap-1">
                    Read more <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Inputs Tab */}
          {activeTab === 'inputs' && (
            <div className="max-w-2xl mx-auto animate-in fade-in zoom-in duration-500">
              <div className="glass-panel p-8 rounded-3xl space-y-8">
                <h3 className="text-2xl font-bold mb-6">Form Elements</h3>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80 ml-1">Standard Input</label>
                  <input 
                    type="text" 
                    placeholder="Enter your name" 
                    className="w-full px-5 py-3 rounded-xl bg-background/50 border border-brand-border/50 text-foreground focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all placeholder:text-foreground/30"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80 ml-1">With Icon & Success State</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      defaultValue="user@example.com"
                      className="w-full pl-5 pr-12 py-3 rounded-xl bg-emerald-500/5 border border-emerald-500/30 text-foreground focus:outline-none focus:border-emerald-500 transition-all"
                    />
                    <CheckCircle className="absolute right-4 top-3.5 text-emerald-500" size={20} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80 ml-1">Error State</label>
                  <div className="relative">
                    <input 
                      type="password" 
                      placeholder="Enter password"
                      className="w-full pl-5 pr-12 py-3 rounded-xl bg-rose-500/5 border border-rose-500/50 text-foreground focus:outline-none focus:border-rose-500 transition-all placeholder:text-foreground/30"
                    />
                    <AlertCircle className="absolute right-4 top-3.5 text-rose-500" size={20} />
                  </div>
                  <p className="text-xs text-rose-500 ml-1">Password must be at least 8 characters long.</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80 ml-1">Textarea</label>
                  <textarea 
                    placeholder="Your message here..." 
                    rows={4}
                    className="w-full px-5 py-4 rounded-xl bg-background/50 border border-brand-border/50 text-foreground focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all resize-none placeholder:text-foreground/30"
                  ></textarea>
                </div>
              </div>
            </div>
          )}

          {/* Cards Tab */}
          {activeTab === 'cards' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in zoom-in duration-500">
              
              {/* Stat Cards (From Dashboard) */}
              {[
                { title: "Action cards", icon: TrendingUp, color: "from-pink-500 to-rose-400", shadow: "shadow-pink-500/40" },
                { title: "Student cards", icon: Users, color: "from-blue-500 to-cyan-400", shadow: "shadow-blue-500/40" },
                { title: "Conversion cards", icon: Database, color: "from-orange-400 to-amber-300", shadow: "shadow-orange-400/40" },
              ].map((card, i) => (
                <div key={i} className={cn(
                  "rounded-2xl p-6 flex flex-col justify-between h-40 text-white shadow-xl bg-gradient-to-br transition-transform hover:-translate-y-1 cursor-pointer",
                  card.color, card.shadow
                )}>
                  <div className="bg-white/20 w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <card.icon size={20} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold mb-1">1,234</div>
                    <span className="font-medium text-sm text-white/90">{card.title}</span>
                  </div>
                </div>
              ))}

              {/* Standard Content Card */}
              <div className="sm:col-span-2 glass-panel rounded-3xl p-8 flex flex-col justify-center">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center shrink-0">
                    <Sparkles className="text-brand-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Feature Highlight</h3>
                    <p className="text-foreground/70 text-sm leading-relaxed mb-4">
                      This is a standard glass-morphism content card used for featuring services, project summaries, or important notifications. It adapts cleanly to both light and dark themes.
                    </p>
                    <button className="text-sm font-semibold text-brand-primary hover:underline">
                      Explore feature &rarr;
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Profile/Minimal Card */}
              <div className="glass-panel rounded-3xl p-6 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-brand-secondary to-brand-accent p-1">
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                    <User size={32} className="text-foreground/50" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-lg">User Profile</h4>
                  <p className="text-xs text-foreground/50">Admin Role</p>
                </div>
              </div>
            </div>
          )}

          {/* Badges Tab */}
          {activeTab === 'badges' && (
            <div className="glass-panel p-8 rounded-3xl max-w-3xl mx-auto space-y-10 animate-in fade-in zoom-in duration-500">
              
              <div>
                <h3 className="text-xl font-semibold mb-6">Status & Notification Badges</h3>
                <div className="flex flex-wrap gap-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">Active</span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">Pending</span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-500 border border-rose-500/20">Error</span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20">Processing</span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-foreground/5 text-foreground/60 border border-foreground/10">Draft</span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-6">Skill / Technology Tags</h3>
                <div className="flex flex-wrap gap-3">
                  {['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Figma', 'Next.js'].map((tag) => (
                    <span 
                      key={tag}
                      className="px-4 py-2 rounded-xl text-sm font-medium bg-background/50 border border-brand-border/40 text-foreground shadow-sm hover:border-brand-primary/50 transition-colors cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-6">Glowing Neon Badges (Dark preferred)</h3>
                <div className="flex flex-wrap gap-4 bg-slate-900 p-6 rounded-2xl">
                  <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-400/50 shadow-[0_0_10px_rgba(34,211,238,0.4)]">NEW FEATURE</span>
                  <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-400/50 shadow-[0_0_10px_rgba(217,70,239,0.4)]">PRO VERSION</span>
                </div>
              </div>

            </div>
          )}

          {/* Banners Tab */}
          {activeTab === 'banners' && (
            <div className="space-y-8 animate-in fade-in zoom-in duration-500 w-full max-w-4xl mx-auto">
              
              {/* Promotional Hero Banner */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Hero / Promotional Banner</h3>
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-secondary to-brand-primary p-8 sm:p-12 text-white shadow-xl">
                  {/* Decorative Background Elements */}
                  <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-3xl mix-blend-overlay"></div>
                  <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-black/10 blur-2xl mix-blend-overlay"></div>
                  
                  <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-8">
                    <div className="space-y-4 max-w-lg text-center sm:text-left">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-sm font-medium">
                        <Sparkles size={16} /> New Update Available
                      </div>
                      <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
                        Supercharge your workflow today.
                      </h2>
                      <p className="text-white/80 text-lg">
                        Experience the new features designed to help you accomplish more in less time.
                      </p>
                    </div>
                    <div className="shrink-0">
                      <button className="px-8 py-4 rounded-full bg-white text-brand-primary font-bold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.4)] flex items-center gap-2">
                        Get Started <ArrowRight size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Notification Banner */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Global Notification Banner</h3>
                <div className="w-full bg-brand-primary/10 border border-brand-primary/20 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center shrink-0">
                      <Megaphone className="text-brand-primary" size={20} />
                    </div>
                    <p className="text-sm font-medium text-foreground/80">
                      <span className="font-bold text-foreground">Black Friday Sale!</span> Get 50% off all premium plans until the end of the week.
                    </p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <button className="text-sm font-bold text-brand-primary hover:underline">
                      Claim Offer
                    </button>
                    <button className="text-foreground/40 hover:text-foreground transition-colors">
                      <X size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Contextual Alert Banner */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Contextual Alert</h3>
                <div className="w-full bg-blue-500/10 border-l-4 border-blue-500 rounded-r-2xl p-4 flex items-start gap-3">
                  <Info className="text-blue-500 shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="text-sm font-bold text-blue-500 mb-1">System Maintenance</h4>
                    <p className="text-sm text-foreground/70">
                      We will be performing scheduled maintenance on our servers tonight between 2:00 AM and 4:00 AM UTC. Some services may be temporarily unavailable.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
