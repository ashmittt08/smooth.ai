export default function Header() {
    return (
        <header style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <h1 className="text-gradient" style={{ fontSize: '3rem', fontWeight: 700, letterSpacing: '-0.05em', marginBottom: '0.5rem' }}>
                Smooth.ai
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                Elevate your text game. Paste the screenshot and we handle the rest. 🥂
            </p>
        </header>
    );
}
