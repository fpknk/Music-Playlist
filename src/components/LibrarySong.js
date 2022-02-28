import React from 'react';
//new way
// import { playAudio } from '../util';

function LibrarySong({
  setSongs,
  isPlaying,
  audioRef,
  song,
  songs,
  setCurrentSong,
  id,
}) {
  //Event Handlers
  //1. Song Selection from Library
  const songSelectHandler = async () => {
    //Just set currentSong to song
    await setCurrentSong(song);
    //Add Active State Class -> take all songs and map over them, access to each song with Map
    const newSongs = songs.map((song) => {
      if (song.id === id) {
        return {
          //if id matches from what we click + id from the state (see above); then
          //return same song with all same info; but change its property active to TRUE!
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });

    setSongs(newSongs);
    //We have to Lift up audio ref from PLAYER to APP then pass it down to Library to Here

    //Check if the song is playing (moved) => delete it now; update to a new way
    // playAudio(isPlaying, audioRef);
    //Moved function to util.js ( as playAudio)

    //New Way
    if (isPlaying) audioRef.current.play();

    //
    // if (isPlaying) {
    //   const playPromise = audioRef.current.play();
    //   if (playPromise !== undefined) {
    //     playPromise.then((audio) => {
    //       audioRef.current.play();
    //     });
    //   }
    // }
    // audioRef.current.play();
  };

  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${song.active ? 'selected' : ''}`}
    >
      <img alt={song.name} src={song.cover}></img>
      <div className='song-description'>
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
}

export default LibrarySong;
