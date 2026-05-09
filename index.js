import React, { useState, useEffect } from 'react';

const BookReader = () => {
  const [page, setPage] = useState(0);
  const [fade, setFade] = useState(true);
  
  // Settings
  const totalPages = 1278;
  const splitPoint = 1000; // The last page number in the first folder

  const formatPageNum = (num) => String(num).padStart(4, '0');

  // Determine which folder to use based on the current page number
  const getImagePath = (pageNum) => {
    const folder = pageNum <= splitPoint ? 'pages' : 'pages2';
    const fileName = `Diary of a Wimpy Kid book 1 online version_${formatPageNum(pageNum)}.jp2`;
    return `/${folder}/${fileName}`;
  };

  const nextPage = () => {
    if (page < totalPages) {
      setFade(false);
      setTimeout(() => {
        setPage(page + 1);
        setFade(true);
      }, 150);
    }
  };

  const prevPage = () => {
    if (page > 0) {
      setFade(false);
      setTimeout(() => {
        setPage(page - 1);
        setFade(true);
      }, 150);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextPage();
      if (e.key === "ArrowLeft") prevPage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [page]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Diary of a Wimpy Kid</h1>
        <p style={styles.subtitle}>Original 2004 Online Edition</p>
      </div>

      <div style={styles.viewer}>
        <img
          src={getImagePath(page)}
          alt={`Page ${page}`}
          style={{
            ...styles.pageImage,
            opacity: fade ? 1 : 0,
            transition: 'opacity 0.2s ease-in-out'
          }}
        />
      </div>

      <div style={styles.controls}>
        <button onClick={prevPage} disabled={page === 0} style={styles.button}>
          Back
        </button>
        
        <span style={styles.pageIndicator}>
          {page} / {totalPages}
        </span>

        <button onClick={nextPage} disabled={page === totalPages} style={styles.button}>
          Next
        </button>
      </div>

      <div style={styles.progressBarBg}>
        <div 
          style={{
            ...styles.progressBarFill, 
            width: `${(page / totalPages) * 100}%` 
          }} 
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 20px',
    backgroundColor: '#fffcf2', // Paper-like color
    minHeight: '100vh',
    fontFamily: '"Comic Sans MS", "Chalkboard SE", cursive', // Wimpy Kid vibe
  },
  header: { textAlign: 'center', marginBottom: '20px' },
  title: { margin: 0, fontSize: '28px' },
  subtitle: { margin: '5px 0', color: '#666' },
  viewer: {
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: '8px 8px 0px #000', // Retro "pop" shadow
    maxWidth: '500px',
    width: '100%',
    position: 'relative',
  },
  pageImage: {
    width: '100%',
    display: 'block',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '30px',
    marginTop: '30px',
  },
  button: {
    padding: '10px 25px',
    fontSize: '18px',
    cursor: 'pointer',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontFamily: 'inherit',
  },
  pageIndicator: { fontSize: '20px', fontWeight: 'bold' },
  progressBarBg: {
    width: '300px',
    height: '8px',
    backgroundColor: '#eee',
    marginTop: '25px',
    borderRadius: '10px',
    border: '1px solid #000',
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#fcd34d', // Yellow theme
    transition: 'width 0.3s ease'
  }
};

export default BookReader;
