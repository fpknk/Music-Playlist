//Import useRef
import React, { useState, useEffect } from 'react';
import { FaPlay, FaAngleLeft, FaAngleRight, FaPause } from 'react-icons/fa';

//Import util (new way)
// import { playAudio } from '../util';

function Player({
  setSongs,
  setCurrentSong,
  songs,
  setSongInfo,
  songInfo,
  audioRef,
  currentSong,
  isPlaying,
  setIsPlaying,
}) {
  //useRef -> starting value (null)
  //Cut it and moved to APP

  //EVENT HANDLERS

  //useEffect (update Library as skipping songs)
  useEffect(() => {
    //Add Active State
    const newSongs = songs.map((song) => {
      if (song.id === currentSong.id) {
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
  }, [currentSong]);

  //1.Song Play and Pause
  const playSongHandler = () => {
    //current object and play is object method for audio tag
    //Pause functionality -> if playing=true and click then pause // else if already pause then play
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  //2.Update time of song
  //timeUpdateHandler LIFTED UP to APP

  //Format time function (not event handler)

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    );
  };

  //3. Drag slider
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  //4.Skip Track Handle (right and left)
  const skipTrackHandler = async (direction) => {
    //if the element (song) id matches currentSong.id means right song (compare 2 state id)
    //basically we check if the id from 1st state matches id from the list (songs) aka 2nd state
    //reason to do this; we dont know the position of current song; state songs has array indexes
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    //Dynamically add 1 to the current index of songs
    if (direction === 'skip-forward') {
      //add Modulus so that doesnt keep adding out of array
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === 'skip-backward') {
      //Check to avoid crash; if remainder is -1 ; make sure to go back to last song (last index)
      //Index is zero based dont forget
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        //Return to avoid go further in the outer if statement
        //add this before return; in case we return (see definition below) (comment out)
        // playAudio(isPlaying, audioRef);
        //New
        if (isPlaying) audioRef.current.play();
        return;
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
    }
    //New easier way; async await => wait til setCurrentSong is loaded; then play song
    if (isPlaying) audioRef.current.play();

    //Add this; this set current song to active class and rest to other (from util.js)
    //DELETE (new way to do) or comment it out
    // playAudio(isPlaying, audioRef);
  };

  //STATE =>
  //LIFTED UP TO APP

  return (
    <div className='player'>
      <div className='time-control'>
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={dragHandler}
          type='range'
        />
        {/* //Fix bug: NaN(not a number); before load song, duration does not exist
        so put 0:00 while its loading, cause when loading song does not exist
        for 1 s */}
        <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
      </div>
      <div className='play-control'>
        <FaAngleLeft
          onClick={() => skipTrackHandler('skip-backward')}
          className='skip-backward'
        />
        {isPlaying ? (
          <FaPause onClick={playSongHandler} className='pause' />
        ) : (
          <FaPlay onClick={playSongHandler} className='play' />
        )}
        <FaAngleRight
          onClick={() => skipTrackHandler('skip-forward')}
          className='skip-forward'
        />
      </div>
      {/* Pass down property of ref from above */}
      {/* Cut audio and lifted to APP */}
    </div>
  );
}

export default Player;
