import React from 'react';
import { FaMusic } from 'react-icons/fa';

function Nav({ setLibraryStatus, libraryStatus }) {
  return (
    <nav>
      <h1>Fayne's Music</h1>
      <button onClick={() => setLibraryStatus(!libraryStatus)}>
        Library
        <FaMusic />
      </button>
    </nav>
  );
}

export default Nav;
