'use client';

import { useState, useEffect } from 'react';
import WaitlistForm from './WaitlistForm';

export default function CTAModal() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('lock-scroll');
            fetch('/api/event', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ event_type: 'form_open' })
            }).catch(err => console.error('Failed logging form_open', err));
        } else {
            document.body.classList.remove('lock-scroll');
        }
        return () => {
            document.body.classList.remove('lock-scroll');
        };
    }, [isOpen]);

    const handleOpenClick = () => {
        fetch('/api/event', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ event_type: 'cta_click' })
        }).catch(err => console.error('Failed logging cta_click', err));
        setIsOpen(true);
    };

    const close = () => setIsOpen(false);

    return (
        <>
            <button
                onClick={handleOpenClick}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-[3px] font-semibold text-[13px] tracking-wide transition-all duration-200 shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.35)]"
            >
                Request Early Access
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md">
                    <div className="bg-slate-900 border border-slate-800 rounded-[4px] shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] animate-slide-up">
                        <div className="flex justify-between items-center px-6 py-5 border-b border-slate-800">
                            <h2 className="text-[15px] font-bold tracking-tight text-white">Request Early Access</h2>
                            <button
                                onClick={close}
                                className="text-slate-600 hover:text-slate-400 transition-colors"
                                aria-label="Close modal"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="px-6 py-5 overflow-y-auto">
                            <WaitlistForm onSuccess={close} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
