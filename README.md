# wordle-native

A React Native clone of the word game Wordle!

https://www.nytimes.com/games/wordle/index.html

# Project goals

I originally started this project in order to familiarize myself with hooks after only having worked on React and React Native projects that were still using class components.

In addition to learning hooks, I also wanted to refresh my knowledge of Redux, without knowing at the time that there are better alternatives to Redux (Zustand, Jotai). Redux was definitley not necessary for this project, especially considering its size, so I ended up replacing it with Jotai, reducing the complexity by quite a bit, making it easier to debug and reducing the bundle size (by about 2kb/3.5%, more than I was expecting for such a small app) along the way.


