'use client';
import { useState } from 'react';

export default function PriceValidation() {
    const [selected, setSelected] = useState<'yes' | 'maybe' | 'no' | null>(null);
    const [loading, setLoading] = useState(false);

    const handleVote = async (choice: 'yes' | 'maybe' | 'no') => {
        if (loading || selected) return;
        setLoading(true);

        try {
            await fetch('/api/event', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    event_type: 'price_vote_section',
                    metadata: { choice }
                })
            });
            setSelected(choice);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const options = [
        { id: 'yes' as const, label: 'Yes, worth ₹1,999' },
        { id: 'maybe' as const, label: 'Maybe' },
        { id: 'no' as const, label: 'No' },
    ];

    return (
        <div className="w-full">
            <h3 className="text-[15px] font-semibold text-white leading-snug tracking-[-0.01em] mb-5">
                If this guaranteed you never submit the wrong resume version again, would ₹1,999 for the full placement season be worth it?
            </h3>

            <div className="flex flex-col w-full gap-2">
                {options.map((option) => (
                    <button
                        key={option.id}
                        onClick={() => handleVote(option.id)}
                        disabled={loading || selected !== null}
                        className={`
                            w-full text-left px-4 py-2.5 rounded-[3px] text-[13px] font-semibold transition-all duration-200 border
                            ${selected === option.id
                                ? 'bg-blue-600 text-white border-blue-500 shadow-[0_0_16px_rgba(59,130,246,0.25)]'
                                : 'bg-slate-800/50 text-slate-300 border-slate-700/50 hover:border-blue-500/40 hover:text-white hover:bg-slate-800'
                            }
                            ${selected !== null && selected !== option.id ? 'opacity-20 cursor-not-allowed' : ''}
                        `}
                    >
                        {option.label}
                    </button>
                ))}
            </div>

            {selected && (
                <p className="mt-3 text-[10px] font-semibold tracking-[0.2em] uppercase text-blue-400/60 animate-fade-in">
                    Response recorded
                </p>
            )}
        </div>
    );
}
