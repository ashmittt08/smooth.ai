export default function GenerateButton({ onClick, isLoading, disabled }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={{
                width: '100%',
                padding: '1.2rem',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                background: disabled
                    ? 'rgba(255,255,255,0.05)'
                    : 'linear-gradient(135deg, var(--accent-base) 0%, var(--accent-secondary) 100%)',
                color: disabled ? 'var(--text-secondary)' : '#fff',
                fontWeight: 700,
                fontSize: '1.1rem',
                cursor: disabled ? 'not-allowed' : 'pointer',
                boxShadow: disabled ? 'none' : '0 4px 14px 0 var(--accent-glow)',
                transition: 'all var(--transition-fast)',
                fontFamily: 'inherit',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
                if (!disabled) e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
                if (!disabled) e.target.style.transform = 'translateY(0)';
            }}
        >
            {isLoading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="spinner" style={{
                        width: '18px', height: '18px',
                        border: '3px solid rgba(255,255,255,0.3)',
                        borderRadius: '50%',
                        borderTopColor: '#fff',
                        animation: 'spin 1s ease-in-out infinite'
                    }}></span>
                    Analyzing Context...
                </span>
            ) : (
                'Generate Replies ✨'
            )}
            <style>
                {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
            </style>
        </button>
    );
}
