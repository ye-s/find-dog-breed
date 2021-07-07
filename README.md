## What I have done:

1. Improved loading message, add loader spinner instead.
2. Add custom hook to fetch advices data and process different responses states.
3. Added different test messages for response status.
4. Added cache for fetched advices, it's based on search url.
5. Added basic tests.
6. Updated app structure, split functionality and views.
7. Added some Types where needed.

## What else could/should be done:

1. Make basic fetch hook, not advice specific and functional wrapper for advices.
2. Split components even more, for example add notification message component.
3. Add styles, use styled-components.
4. Add more tests, check state changes, check view state for different response.
5. Use another Loader (that one was just for example).
6. Add pagination or infinity scroll.

# EclecticIQ UI Engineer Code Challenge

We have developed a small application that is functional but naively written.

## What is expected from you?

We would like you to elaborate on two topics:

1. Which parts of the application can be improved and why?
2. How would you test this application and which strategies would you use?

## What should you deliver?

The format is totally up to you. It can be a simple document, like in a code review, or you can fork it and implement your solutions on top of it, or even record a screencast! Whatever suits you best.

## Info about the application

If you would like to mess around with the application, make sure to "Disable cache" on your browser's network settings. Otherwise, API requests will be cached, and it will take a while for their responses to expire.
