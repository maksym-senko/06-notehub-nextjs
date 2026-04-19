'use client';


interface ErrorProps {
  error: Error;
}

export default function ErrorBoundary({ error }: ErrorProps) {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Oops! Something went wrong.</h2>
      
      <p style={{ color: 'red', marginTop: '10px' }}>
        {error.message || 'An unexpected error occurred while loading the note.'}
      </p>

      <button 
        onClick={() => window.location.reload()}
        style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
      >
        Try again
      </button>
    </div>
  );
}