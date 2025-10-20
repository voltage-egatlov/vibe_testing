'use client';

export default function HomeLoading() {
  return (
    <div className="web-view" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#fafafa'
    }}>
      <div className="minimalist-loader">
        <div className="spinner"></div>
      </div>

      <style jsx>{`
        .minimalist-loader {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .spinner {
          width: 48px;
          height: 48px;
          border: 3px solid #e2e8f0;
          border-top-color: #64748b;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .minimalist-loader {
          animation: fadeIn 0.3s ease-in;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
