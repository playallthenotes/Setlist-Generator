
import { useState } from "react";

export default function SetlistApp() {
  const [songs] = useState([
    { title: "Acoustic Dream", tempo: "Medium", feel: "Ballad", type: "Singing", cover: false, energy: 4, duration: 4 },
    { title: "Harmony Road", tempo: "Medium", feel: "Groove", type: "Singing", cover: true, energy: 6, duration: 5 },
    { title: "Rolling Waves", tempo: "Fast", feel: "Upbeat", type: "Instrumental", cover: false, energy: 8, duration: 3 },
    { title: "Midnight Silence", tempo: "Slow", feel: "Ballad", type: "Singing", cover: false, energy: 2, duration: 6 },
  ]);

  const [setLength, setSetLength] = useState(20);
  const [setlist, setSetlist] = useState([]);

  const generateSetlist = () => {
    const sorted = [...songs].sort((a, b) => b.energy - a.energy);
    let total = 0;
    const finalSet = [];

    for (const song of sorted) {
      if (total + song.duration <= setLength) {
        finalSet.push(song);
        total += song.duration;
      }
    }
    setSetlist(finalSet);
  };

  return (
    <div>
      <h1>Setlist Generator</h1>
      <div style={{ marginBottom: '1rem' }}>
        <label>Set Length (minutes):</label>
        <input
          type="number"
          value={setLength}
          onChange={(e) => setSetLength(Number(e.target.value))}
          style={{ marginLeft: '0.5rem', marginRight: '1rem' }}
        />
        <button onClick={generateSetlist}>Generate Setlist</button>
      </div>

      <h2>Song List</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th><th>Tempo</th><th>Feel</th><th>Type</th><th>Cover</th><th>Energy</th><th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song, index) => (
            <tr key={index}>
              <td>{song.title}</td><td>{song.tempo}</td><td>{song.feel}</td><td>{song.type}</td><td>{song.cover ? "Yes" : "No"}</td><td>{song.energy}</td><td>{song.duration} min</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Generated Setlist</h2>
      <ul>
        {setlist.map((song, index) => (
          <li key={index}>
            {song.title} ({song.duration} min)
          </li>
        ))}
      </ul>
    </div>
  );
}
