'use client';
import { useState } from 'react';

interface WaitlistFormProps {
    onSuccess: () => void;
}

export default function WaitlistForm({ onSuccess }: WaitlistFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        year: '',
        early_access_interest: false,
        price_vote_form: '',
        biggest_struggle: '',
        website_url: '' // honeypot
    });

    const [loading, setLoading] = useState(false);
    const [errorMSG, setErrorMSG] = useState('');
    const [successMSG, setSuccessMSG] = useState('');

    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMSG('');

        if (!formData.name || !formData.email || !formData.year) {
            setErrorMSG('Please fill in all required fields.');
            setLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                if (data.isDuplicate) {
                    setErrorMSG(data.error);
                } else {
                    setErrorMSG(data.error || 'Something went wrong. Please try again.');
                }
            } else {
                setSuccessMSG(data.message || 'Successfully joined early access list.');
                setTimeout(() => {
                    onSuccess();
                }, 3000);
            }
        } catch {
            setErrorMSG('Network error. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    if (successMSG) {
        return (
            <div className="py-10 text-center animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-blue-600 mx-auto mb-4 flex items-center justify-center shadow-[0_0_24px_rgba(59,130,246,0.3)]">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">You&apos;re in.</h3>
                <p className="text-[13px] text-slate-400">{successMSG}</p>
                <p className="mt-6 text-[11px] text-slate-600 tracking-[0.15em] uppercase">Closing automatically</p>
            </div>
        );
    }

    const inputClass = "w-full border border-slate-700 rounded-[3px] px-3 py-2.5 text-[13px] text-slate-200 bg-slate-800/50 placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all";
    const labelClass = "block text-[11px] font-semibold text-slate-500 uppercase tracking-[0.1em] mb-1.5";

    return (
        <form onSubmit={submitForm} className="space-y-4">
            {/* Honeypot field */}
            <div className="absolute left-[-9999px] top-[-9999px] opacity-0" aria-hidden="true">
                <label htmlFor="website_url">Leave empty</label>
                <input
                    type="text"
                    id="website_url"
                    name="website_url"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website_url}
                    onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                />
            </div>

            {errorMSG && (
                <div className="bg-red-500/10 text-red-400 p-3 rounded-[3px] text-[13px] font-medium border border-red-500/20">
                    {errorMSG}
                </div>
            )}

            <div>
                <label className={labelClass}>Name <span className="text-red-400">*</span></label>
                <input
                    required
                    type="text"
                    placeholder="Full name"
                    className={inputClass}
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
            </div>

            <div>
                <label className={labelClass}>Email <span className="text-red-400">*</span></label>
                <input
                    required
                    type="email"
                    placeholder="you@college.edu"
                    className={inputClass}
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
            </div>

            <div>
                <label className={labelClass}>Phone</label>
                <input
                    type="tel"
                    placeholder="Optional"
                    className={inputClass}
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
            </div>

            <div>
                <label className={labelClass}>Year of Study <span className="text-red-400">*</span></label>
                <select
                    required
                    className={inputClass}
                    value={formData.year}
                    onChange={e => setFormData({ ...formData, year: e.target.value })}
                >
                    <option value="" disabled>Select year</option>
                    <option value="1st">1st Year</option>
                    <option value="2nd">2nd Year</option>
                    <option value="3rd">3rd Year</option>
                    <option value="4th">4th Year</option>
                    <option value="graduated">Graduated</option>
                </select>
            </div>

            <div>
                <label className={labelClass}>Biggest placement struggle</label>
                <textarea
                    rows={2}
                    placeholder="Optional"
                    className={inputClass + ' resize-none'}
                    value={formData.biggest_struggle}
                    onChange={e => setFormData({ ...formData, biggest_struggle: e.target.value })}
                ></textarea>
            </div>

            <div>
                <label className={labelClass}>Would you pay ₹1,999 for full season access? <span className="text-red-400">*</span></label>
                <div className="flex gap-4 mt-1.5">
                    {['yes', 'maybe', 'no'].map((opt) => (
                        <label key={opt} className="flex items-center cursor-pointer group">
                            <input
                                required
                                type="radio"
                                name="price_vote"
                                value={opt}
                                checked={formData.price_vote_form === opt}
                                onChange={e => setFormData({ ...formData, price_vote_form: e.target.value })}
                                className="mr-1.5 accent-blue-500"
                            />
                            <span className="text-[13px] text-slate-400 capitalize group-hover:text-slate-300 transition-colors">{opt}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="pt-3 border-t border-slate-800">
                <label className="flex items-start cursor-pointer">
                    <input
                        required
                        type="checkbox"
                        className="mt-0.5 mr-2.5 accent-blue-500"
                        checked={formData.early_access_interest}
                        onChange={e => setFormData({ ...formData, early_access_interest: e.target.checked })}
                    />
                    <span className="text-[11px] text-slate-600 leading-relaxed">
                        I agree to receive communications regarding early access to Level One and consent to have my responses recorded for demand validation.
                    </span>
                </label>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 bg-blue-600 text-white font-semibold text-[13px] py-3 rounded-[3px] hover:bg-blue-500 transition-all duration-200 disabled:opacity-50 tracking-wide shadow-[0_0_16px_rgba(59,130,246,0.15)] hover:shadow-[0_0_24px_rgba(59,130,246,0.3)]"
            >
                {loading ? 'Submitting...' : 'Join Early Access'}
            </button>
        </form>
    );
}
