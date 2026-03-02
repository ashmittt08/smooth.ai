export default function ResultsDisplay({ results }) {
    const cards = [
        { title: 'Safe Reply', content: results.safe, color: '#3b82f6' },
        { title: 'Smooth Reply', content: results.smooth, color: '#10b981' },
        { title: 'Funny Reply', content: results.funny, color: '#f59e0b' },
        { title: 'Bold Reply', content: results.bold, color: '#ef4444' },
        { title: 'Creative Pickup Line', content: results.creative, color: '#8b5cf6' },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }} className="animate-fade-in">
            <div className="glass-panel" style={{ borderLeft: '4px solid var(--accent-secondary)' }}>
                <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                    Psychological Analysis
                </h3>
                <p style={{ color: 'var(--text-primary)', lineHeight: 1.6 }}>
                    {results.analysis}
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {cards.map((card, index) => (
                    <div
                        key={card.title}
                        className="glass-panel"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.75rem',
                            animation: `fadeIn 0.5s ease forwards`,
                            animationDelay: `${index * 0.1}s`,
                            opacity: 0, // start invisible for animation
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Top color highlight line */}
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', backgroundColor: card.color }}></div>

                        <h4 style={{ color: card.color, margin: 0, fontSize: '1rem' }}>{card.title}</h4>
                        <p style={{ margin: 0, fontSize: '1.1rem', lineHeight: 1.5 }}>"{card.content}"</p>

                        <button
                            style={{
                                alignSelf: 'flex-start',
                                marginTop: 'auto',
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-secondary)',
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem',
                                padding: '0.25rem 0',
                                transition: 'color var(--transition-fast)'
                            }}
                            onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                            onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                            onClick={(e) => {
                                navigator.clipboard.writeText(card.content);
                                const originalText = e.target.innerText;
                                e.target.innerText = 'Copied!';
                                setTimeout(() => { e.target.innerText = originalText }, 2000);
                            }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                            Copy
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
