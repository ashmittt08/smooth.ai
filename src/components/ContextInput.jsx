import { useRef, useState } from 'react';

export default function ContextInput({ value, onChange, imageFile, onImageChange }) {
    const fileInputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            onImageChange(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            onImageChange(file);
        }
    };

    const handleRemoveImage = () => {
        onImageChange(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label style={{ fontWeight: 600, color: 'var(--accent-base)' }}>
                Chat Context
            </label>
            <textarea
                id="context-input"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="e.g. She said: 'I'm so bored today...'"
                style={{
                    width: '100%',
                    minHeight: '100px',
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    border: '1px solid var(--border-color)',
                    borderBottomLeftRadius: imageFile ? '0' : 'var(--radius-md)',
                    borderBottomRightRadius: imageFile ? '0' : 'var(--radius-md)',
                    borderTopLeftRadius: 'var(--radius-md)',
                    borderTopRightRadius: 'var(--radius-md)',
                    padding: '1rem',
                    color: 'var(--text-primary)',
                    fontFamily: 'inherit',
                    fontSize: '1rem',
                    resize: 'vertical',
                    outline: 'none',
                    transition: 'border-color var(--transition-fast)'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-base)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
            />

            {/* Image Upload Area */}
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => !imageFile && document.getElementById('image-upload').click()}
                style={{
                    border: `2px dashed ${isDragging ? 'var(--accent-base)' : 'var(--border-color)'}`,
                    borderRadius: 'var(--radius-md)',
                    padding: imageFile ? '0.5rem' : '1.5rem',
                    textAlign: 'center',
                    cursor: imageFile ? 'default' : 'pointer',
                    backgroundColor: isDragging ? 'var(--accent-glow)' : 'rgba(0,0,0,0.1)',
                    transition: 'all var(--transition-fast)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    position: 'relative'
                }}
            >
                <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    ref={fileInputRef}
                />

                {imageFile ? (
                    <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <img
                            src={URL.createObjectURL(imageFile)}
                            alt="Uploaded context"
                            style={{
                                maxHeight: '200px',
                                maxWidth: '100%',
                                objectFit: 'contain',
                                borderRadius: 'var(--radius-sm)'
                            }}
                        />
                        <button
                            onClick={(e) => { e.stopPropagation(); handleRemoveImage(); }}
                            style={{
                                position: 'absolute',
                                top: '0.5rem',
                                right: '0.5rem',
                                background: 'rgba(0,0,0,0.7)',
                                border: '1px solid var(--border-color)',
                                color: 'white',
                                borderRadius: '50%',
                                width: '28px',
                                height: '28px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all var(--transition-fast)'
                            }}
                            onMouseEnter={(e) => e.target.style.background = 'var(--accent-secondary)'}
                            onMouseLeave={(e) => e.target.style.background = 'rgba(0,0,0,0.7)'}
                        >
                            ✕
                        </button>
                    </div>
                ) : (
                    <>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                        </svg>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                            Drag & drop a screenshot, or <span style={{ color: 'var(--accent-base)' }}>click to upload</span>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
