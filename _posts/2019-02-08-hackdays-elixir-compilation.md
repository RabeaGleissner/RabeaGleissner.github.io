---
title: Hack days and building an Elixir project 
comments: true
layout: post
category: personal
read-time: 3
---

We have a generous benefit at work which is that we get to enjoy two hack days per month. The term “hack days” is slightly confusing… It does not mean that we all disappear into the darknet, communicate via forums and find your credit card details… no, it just means that we can work on something outside of our usual user stories. Anything goes that helps our team, the company or our personal development.

<!--break-->

After working with other people on previous hack days I decided to work alone this time because I’m in a different time zone.
That means I currently don’t have anyone to talk to about my project (it’s 5am in London), so I thought I’d write this blog post.

Our team now spans several time zones and works different hours.
It’s great that working at Tes is so flexible but it also means that you’re sometimes not sure when you can get hold of your team mates or when a good time is to schedule team-wide meetings.
So I decided to create a website which shows on one glance what the local time is in each location, which hours people are working and when we will overlap. 

The initial idea is to manually enter time zones and working hours.
Ultimately I’d like to integrate it with Slack so that it pulls people’s time zones from there. 

I decided to use Elixir with Phoenix instead of JavaScript and Node, which is what I write at work every day.
I worked on a few Elixir side projects a couple of years ago and really enjoyed using the language.

Well… turns out… not so much at the moment!
The set up has been a bit of an pain so far.
I originally wanted to create a Vagrant box to make the project portable between my private and work laptop.
But ran into some issues and decided to eventually just install everything on my private laptop to get started.

Now I’ve got the tests running but the app isn't running locally.
The error messages indicate that it’s an issue with my tooling.
Well, I thought I'm already using the most minimal tooling with Vim and Tmux!
But it turns out that Ale, my Vim linter plugin is recompiling the Elixir project in the background and somehow removing the beam files.

## Beam me up

That lead me to research what these beam files actually do.

Turns out that BEAM is the name of the Erlang virtual machine.
It stands for "Bogdan/Björn's Erlang Abstract Machine”.
This references two employees at Ericsson, the Swedish telecoms company, where Erlang was invented.

Basically, when the code is compiled by the Erlang compiler, the bytecode is written to the disc in a file called something like `Elixir.MyFile.beam`.
There is a beam file for each Elixir module.
Mix, the build tool for Elixir kicks off the compilation.
The compiled code then runs on the Erlang VM.

Elixir also supports scripting in which case the byte code is kept in memory instead of being stored in a file.
To differentiate, the convention is to use the file extension `.exs` for scripting instead of `.ex `.

## How to fix my error?

OK, let me come back out of the rabbit hole.
I need to fix the error.
First I upgraded Ale as the issue should have been fixed recently according to discussions on the Ale Github repo. No luck.
I then changed the settings of Ale to ignore Elixir when linting. Didn’t help, I got the same error.
I tried to recompile the project with mix each time but it didn’t make any difference.
Hmm… where should these beam files actually live?
There should be an `ebin` directory somewhere that contains these files.
In my Phoenix project there’s a `_build` directory which also contains a directory with my project name.
Inside that I found the `ebin` folder.

So I ended up removing the whole `_build` directory and running `mix deps.compile && mix compile`.
That fixed my issue! Now I can run the application. 

I know this seems like a small thing but I was feeling a bit frustrated with it and writing this post makes me aware of what I’ve learnt during the debugging process. So at least it wasn’t a complete waste of time!
