## More Information

Whischat uses a combination of WebSockets, WebRTC, and simple API calls to create a real-time chat experience. Users can add others as friends, direct message peers, see other users’ online statuses, and block others if they please. Group chats are basically the same as direct messages but with multiple people instead of just two. Servers can be created by any user, and through them, users can invite others to join and chat. In servers, both voice and text channels can be added, with text channels operating similarly to direct messages and voice channels using mesh-architecture WebRTC connections.

## Challenges Faced

### Drag and Drop

In several sections of the app, I needed users to be able to drag and drop items in a list. For simple lists, like in the leftmost navbar that holds a list of a user’s servers, this was trivial using Dnd Kit. The more difficult part was managing drags between multiple sublists as needed in a server’s channel navigation panel. It turns out that if you simply nest the library’s `<SortableContext/>` component, you can set up the drag listeners on the encompassing `<DndContext/>` component to move items between subcontexts fairly easily.

### Next.js Caching

On a few routes, I wanted to retrieve the markup and information that populated said markup in one GET request, so I put a lot of the backend code in server components. The goal was to not have to make fetch requests to get data that I knew would be necessary for rendering the page. The problem with this is that Next.js caches client-side routing, so if the user navigates away and comes back to one of these components with server-side information, that information may not be up-to-date. Unfortunately, Next.js does not allow developers to opt out of the client-side cache, so client components with fetch requests ended up being the only viable solution.

## What I Learned

### WebRTC

WebRTC is a set of web APIs that allows peer-to-peer real-time communication between two clients without the use of an intermediate server. It’s integral to implementing media sharing between users, so I needed it for the voice chat feature of the app. Configuration of the connection takes some work, but learning about it helped me better understand some of the browser’s underlying processes. To learn more about how WebRTC works, I recommend reading the first few [guides on MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API).

### Next.js

For this app, I decided to learn Next.js. It provided a more organized framework for developing the app than if I had separated out the frontend and backend to work individually. Because I didn’t end up using server actions, though, I saw few real benefits to using it beyond that, and its limitations grew to become more of a headache than its benefits proved helpful. For example, because I was planning to deploy on Vercel, I couldn’t use WebSockets through a library like Socket.IO due to their distributed “Edge Network". Instead, I had to use a WebSocket service called Pusher, which was slightly more work than implementing the connections myself but was overall still enjoyable.

### Custom Authentication

The most popular Next.js libraries for authentication were too limited for my signup process, namely because I wanted to have an intermediary stage before a user is fully registered. Because of this, I turned to implementing my own authentication using simple cookies and session IDs. Before that, though, I explored JWTs and learned even more about them. The more I discovered about them, though, the more pointless they seemed from a security standpoint, so I ended up ditching them altogether.

### Media Upload and Playback

Before making this project, I had never used media inputs or sent media to a backend. In the process of creating this app, I learned to develop these features in places like profile picture uploads as well as media uploads to chat channels.
