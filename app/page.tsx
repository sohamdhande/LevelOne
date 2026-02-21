'use client';

import { useEffect, useState } from 'react';
import CTAModal from '@/components/CTAModal';

export default function Home() {
    const [resumeCount, setResumeCount] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/event', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ event_type: 'page_view' })
        }).catch(console.error);
    }, []);

    const handleResumeCount = (choice: string) => {
        setResumeCount(choice);
        fetch('/api/event', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ event_type: 'resume_count_response', metadata: { choice } })
        }).catch(console.error);
    };

    return (
        <div className="h-screen flex flex-col bg-slate-950 text-slate-100 overflow-y-auto md:overflow-hidden dot-pattern">
            {/* TOP BAR */}
            <header className="flex-none border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md h-14 flex items-center justify-between px-6 lg:px-12 z-10">
                <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                    <span className="font-bold text-[15px] tracking-tight text-white">Level One</span>
                </div>
                <span className="text-[13px] text-slate-500 font-medium hidden sm:block">
                    Placement Season Control System
                </span>
            </header>

            {/* MAIN BODY */}
            <main className="flex-1 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-start md:justify-center pb-12 pt-10 md:py-0">
                <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-16 lg:gap-20 items-center h-full max-h-[700px] mt-0 md:mt-[-1%]">

                    {/* LEFT SIDE */}
                    <div className="space-y-4">
                        {/* Headline */}
                        <div>
                            <h1 className="text-[26px] lg:text-[36px] font-bold tracking-[-0.03em] leading-[1.15] text-white">
                                Placement season is <span className="accent-text">unforgiving</span>.<br />
                                Your resume control must be exact.
                            </h1>
                            <p className="mt-3 text-[13px] text-slate-500">
                                Most students maintain 3–5 resume versions during placement season.
                            </p>
                        </div>

                        {/* Category Clarifier */}
                        <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
                            Not a resume builder. Not a template marketplace.<br />
                            A structured placement control dashboard.
                        </p>

                        {/* Positioning Block */}
                        <div className="relative border border-slate-800/80 rounded-[4px] bg-slate-900/60 px-5 py-4 overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-blue-400 via-blue-600 to-blue-400/20"></div>
                            <h2 className="text-[11px] font-bold tracking-[0.2em] text-blue-400 uppercase mb-2.5 pl-2">
                                What is Level One?
                            </h2>
                            <p className="text-[14px] text-white font-semibold leading-snug pl-2 mb-2">
                                A campus-focused placement control dashboard that helps students manage resume variants and instantly sync the active version to their live portfolio without redeployment.
                            </p>
                            <p className="text-[12px] text-slate-500 leading-relaxed pl-2">
                                Level One does not replace your resume. It gives you one dashboard to control which version is active, synced, and submitted.
                            </p>
                        </div>

                        {/* How It Works */}
                        <div className="space-y-2">
                            <h2 className="text-[10px] font-bold tracking-[0.2em] text-slate-600 uppercase">
                                How It Works
                            </h2>
                            <ul className="space-y-1.5 border-l-[2px] border-blue-500/30 pl-4">
                                <li className="text-[13px] text-slate-300 leading-relaxed font-medium">Manage your resume variants from a single dashboard</li>
                                <li className="text-[13px] text-slate-300 leading-relaxed font-medium">Select which version should be active</li>
                                <li className="text-[13px] text-slate-300 leading-relaxed font-medium">Instantly sync that version to your live portfolio</li>
                                <li className="text-[13px] text-slate-300 leading-relaxed font-medium">Export the exact PDF you intend to submit</li>
                            </ul>
                            <p className="text-[11px] text-slate-500 pl-4 italic">
                                One control panel. No version confusion.
                            </p>
                        </div>

                        {/* Outcome Line */}
                        <p className="text-[17px] text-white font-bold tracking-[-0.02em]">
                            So you never send the wrong resume again.
                        </p>
                    </div>

                    {/* RIGHT SIDE — Access Panel */}
                    <div className="glass-card glow-blue rounded-[4px] p-6 lg:p-7 flex flex-col space-y-5 h-fit w-full max-w-[420px] mx-auto md:ml-auto md:mr-0">

                        {/* What You Get */}
                        <div>
                            <h3 className="text-[11px] font-bold tracking-[0.2em] text-blue-400/80 uppercase mb-3">
                                Early Access Includes
                            </h3>
                            <ul className="space-y-2.5">
                                {[
                                    'Structured resume variant engine',
                                    'Submission-safe PDF export',
                                    'Live portfolio sync — zero redeployment',
                                    'Version history & rollback',
                                    'Full placement season access',
                                ].map((text, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <span className="text-blue-400 text-[8px] mt-1.5 flex-none">◆</span>
                                        <span className="text-[13px] text-slate-300 font-medium leading-snug">{text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Engagement Question */}
                        <div className="border-t border-slate-700/40 pt-4">
                            <p className="text-[12px] text-slate-400 font-medium mb-2.5">
                                How many resume versions did you maintain last placement season?
                            </p>
                            <div className="flex gap-2">
                                {['1–2', '3–5', '5+'].map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => handleResumeCount(opt)}
                                        disabled={resumeCount !== null}
                                        className={`
                                            flex-1 py-2 rounded-[3px] text-[12px] font-semibold transition-all duration-200 border
                                            ${resumeCount === opt
                                                ? 'bg-blue-600 text-white border-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.2)]'
                                                : 'bg-slate-800/50 text-slate-400 border-slate-700/50 hover:border-blue-500/40 hover:text-white'
                                            }
                                            ${resumeCount !== null && resumeCount !== opt ? 'opacity-20 cursor-not-allowed' : ''}
                                        `}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                            {resumeCount && (
                                <p className="mt-2 text-[10px] text-blue-400/50 font-semibold tracking-[0.15em] uppercase animate-fade-in">Noted</p>
                            )}
                        </div>

                        {/* Price Tag */}
                        <div className="border-t border-slate-700/40 pt-4">
                            <div className="flex items-baseline gap-2 mb-1">
                                <span className="text-[28px] font-bold text-white tracking-tight">₹1,999</span>
                                <span className="text-[13px] text-slate-500 font-medium">/ full season</span>
                            </div>
                            <p className="text-[11px] text-slate-500">One-time payment. No subscriptions.</p>
                        </div>

                        {/* CTA */}
                        <div>
                            <CTAModal />
                            <p className="mt-2.5 text-[10px] tracking-[0.15em] text-slate-600 font-semibold uppercase text-center">
                                Early cohort limited to NST campuses.
                            </p>
                        </div>
                    </div>

                </div>
            </main>

            {/* Footer */}
            <footer className="flex-none">
                <div className="text-center py-3">
                    <p className="text-[11px] text-slate-700 font-medium tracking-wide">
                        Designed for high-competition placement environments at NST.
                    </p>
                </div>
                <div className="h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
            </footer>
        </div>
    );
}
