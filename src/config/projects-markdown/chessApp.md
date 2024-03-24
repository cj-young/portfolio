## More Information

This app marks the first time I ever touched a backend, and it is the first larger-scale project I made with React and TypeScript. Users can play with their friends, but, if they don't have any, they can play against bots instead. Of course, the bots — powered by Stockfish — also provide steeper competition for more skilled users. On the analysis board, players can analyze either a past game or a new game from the starting position.

## Challenges Faced

### Piece Drag and Drop

When I first added the chess board, users simply selected a piece by clicking it and then moved it by clicking on a square. To do this, I added `click` listeners to both the pieces and the board. To implement drag and drop, though, I needed to track the `mouseup`, `mousedown`, and `mousemove` events. The problem with this is that both the `mouseup` and `click` events will fire after a user makes a click, so their effects will overlap. To get around this, I discarded the `click` listener and instead treated a `mouseup` as a `click` event when it was fired on the same square that the preceding `mousedown` event was fired on. If the player moved the piece off the original square, meaning the `mouseup` fired somewhere outside the square of the `mousedown` event, the piece would be deselected, representing a move attempt.

### Synchronized Clocks

Syncing the game clocks so that they displayed the most accurate time possible was somewhat difficult. Simply letting the opponent’s clock begin to run as soon as a user makes a move will always provide inaccurate times due to delays between when the users see that a move has taken place. To get around this, both clocks pause once a move is made, and only when a response is received via WebSockets do they resume with the correct player’s clock running. To account for lag, timestamps are sent with moves through the WebSockets, and if the calculated latency is below a certain threshold, the player won't be pentalized for it.

## What I Learned

### TypeScript with React

While I had used React and was somewhat familiar with TypeScript leading up to this project, I had never used them together. While it may not seem very difficult, it was the first time I used TypeScript in any sort of larger project. I feel as though this project really helped me learn how to actually apply TypeScript effectively in a codebase as opposed to simply using its features individually.

### Backend Development

Prior to this project, I had never touched the backend. During development, I learned a lot about how servers receive and process HTTP requests. I decided to just go with Node.js and Express so that I didn’t have to learn a whole new language just to develop this project.

### WebSockets

To allow live games, I implemented WebSockets using Socket.IO. Doing this helped me learn about how servers and clients can establish fast, two-way communication connections and how to work with one of the most common web technologies.

### Bitboards

To efficiently compute possible chess moves, modern chess engines use “bitboards” to represent current positions and use bitwise operations to simulate multiple possible moves at once. While I didn’t create my own chess engine, I still needed to find legal moves, and I didn’t want performance to be an issue, so I took a similar route. Bitboards are essentially strings of bits, with each bit representing a square on the board. To learn more about bitboards, check out [this article on the Chess Programming Wiki](https://www.chessprogramming.org/Bitboards).

### Authentication

Because I had never created a backend before, I hadn’t implemented my own authentication either. I learned a lot about how servers create, distribute, and process session tokens. I also learned the fundamentals of JWT, though I didn’t end up using it in the end.

### MongoDB

Another technology I learned related to the backend was MongoDB. At the time, I felt that I was using so many other technologies that were new to me that I decided to use a NoSQL database that was easy for me to understand.
