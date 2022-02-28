import React from 'react';
// Import LibrarySong
import LibrarySong from './LibrarySong';

function Library({
  libraryStatus,
  setSongs,
  audioRef,
  songs,
  setCurrentSong,
  isPlaying,
}) {
  return (
    <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
      <h2>Library</h2>
      <div className='library-songs'>
        {songs.map((song) => (
          <LibrarySong
            //Song List
            songs={songs}
            setCurrentSong={setCurrentSong}
            //Element of that list
            song={song}
            id={song.id}
            key={song.id}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  );
}

export default Library;
