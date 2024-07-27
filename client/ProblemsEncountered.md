# Learning React

## Infinite Loop Problem on [ProjectInormationSection](../client/src/app/projects/[id]/settings/ProjectInformationSection.tsx)

1. onClick={setEditTitle(true)}:
   This causes an infinite render because when React renders your component, it evaluates this expression immediately. So, every time the component renders, it calls setEditTitle(true), which updates the state, which causes another render, and so on, creating an infinite loop.

2. onClick={() => setEditTitle(true)}:
   This works correctly because it creates a new function that will only be called when the onClick event occurs. The function isn't executed during rendering, but rather it's passed as a reference to be called later when the click event happens.

## Here's a more detailed explanation:

- In JavaScript, foo(bar) means "call the function foo with the argument bar right now".
- But () => foo(bar) means "here's a function that, when called, will call foo with bar".
