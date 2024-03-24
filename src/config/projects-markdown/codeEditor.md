## More Information

This project, DevForge, was mostly a means to learn Angular. Along the way, I was able to learn other things, too, but my main focus was acquiring skills for the framework itself. The premise of the project itself is similar to CodePen, where users can code in the browser and see results in real time. Users can code in HTML/CSS/JS and can either share their work with others via a link or share it in the gallery so that anyone can view it.

I decided to leave authentication out of this project. The main reason for this is that it makes for an easier user experience, given that users don’t have to provide any information to use the site. Though this probably made the development process easier, I didn’t just leave it out because I am lazy; sometimes having less features is just better.

## Challenges Faced

### The Custom Console

When creating the code editor, I wanted to have a custom console that worked almost identically to the one in a normal browser. To do this, I needed to extract console method calls in the iframe by individually overwriting the `console` object’s methods and sending appropriate data to the main app through the native `postMessage()` API. Because the `<iframe/>` elements could not have same-origin permissions due to the mutability of its scripts, simply relaying the arguments sent to each console method was not an option. When sending messages without same-origin permissions, only strings can be sent. Instead, the iframe itself processes any parameters sent to console methods and sends the final results to the parent.

### Resizable Panels

One thing I initially struggled with was creating a reusable component that could have resizable panels, as seen in the editor itself. The main problem was finding a way to stretch panels based on the remaining space in the container, excluding the space taken by the handles, which don’t expand. To do this, I got the idea to give each panel `flex-grow` that would scale when the user drags a handle.

### Efficient Local Storage

One small challenge I faced when working with storing a user’s code in local storage was that storing every saved project in a single stringified array could lead to efficiency problems in the future, and it overall felt like a code smell. To get around this, I instead stored an array of the projects' IDs and then mapped each stringified project to a namespaced key using said IDs. This also makes accessing the code more efficient since it avoids having to iterate over an array that holds multiple projects.

## What I Learned

### Angular

I mainly made this project to learn Angular. I learned about and implemented many of Angular’s unique features, including directives, pipes, and services. Since this was my first time ever working with Angular, I often struggled with implementing some simple things, but in the end, I learned a lot about how Angular apps are structured.

### Iframes

When I first thought of this project idea, I thought implementing a custom view that runs user-inputted code would have been one of the hardest parts of its creation. However, the HTML `<iframe/>` element essentially handles everything itself, as it acts kind of like its own browser instance completely separate from the main window. I also learned about how iframes have different permissions based on their origin, which I had to keep in mind when implementing things like screenshots and console messages.
