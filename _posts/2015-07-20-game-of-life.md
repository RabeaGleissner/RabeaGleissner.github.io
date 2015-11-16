---
title: What Game of Life recently taught me
comments: true
layout: post
category: personal
read-time: 5
---

In my quest to become a better developer, I try to practise test driven development (TDD) by doing different code katas or challenges. We don’t use TDD at work, so due to a mix of my desire to one day be a really good developer and my [FOMO](http://www.urbandictionary.com/define.php?term=fomo){:target="_blank"}, I try to practise it when I have some free time.

<!--break-->

So over the last few weeks I attempted Conway’s Game of Life (GoL) a few times and I feel like it has taught me or at least reminded me of a few things about coding, which I thought I’d share.

##So what is this Game of Life?

If you, my dear reader, are a developer or a mathematician, you will probably have heard of Game of Life or will have completed the coding challenge yourself. But for those who don’t: Game of Life is a popular zero player game on an infinite two dimensional grid of cells which either survive or die when life evolves into the next generation. The rules are:

- A live cell that has fewer than two live neighbours dies
- A live cell with two or three live neighbours survives
- A live cell with with more than three live neighbours dies
- A dead cell with three neighbours comes alive
Game of Life in three acts

I had started working on GoL in a pair programming session with a friend about a month ago. It was the first time either of us had attempted this kata. We had started by discussing which classes we should use (Cell and Board) and if the Board should be allowed to know that the Cells are dead or alive or if the Cells should know their location etc.

We were determined to use this object oriented approach but somehow that made it really complicated for me the further we got into it. It was fine to implement a few of the rules but then I kind of got confused about responsibilities and how the classes needed to be connected. It was just a mess in my head so when I tried to work more on it later, I couldn’t really figure it out.

A few weeks later I made my second attempt at it. Again during a pairing session but this time with someone who had completed it before. We used a much simpler approach. Just one World class that is responsible for everything (note, the convention isn’t Board but World… good to know).

We visualised the cells as an array of ones and zeros. Ones are alive, zeros are dead. If there are nine elements in the array, the grid would be 3x3, for example. We initially started with an array of four cells (2x2 grid) and started writing tests and code for all the different rules about cells dying or surviving. We didn’t finish it and I thought I'd just finish it by myself another day. But again I felt that I was stuck. The problem was that I couldn’t get my head around how to make the code work for an infinite grid. I mean, it's not really practical to have an array with an infinite amount of elements.

So I scrapped it all and started again. Act 3! This time I used coordinates to describe the position of cells and started writing tests and code only for the live cells to begin with. The coordinates somehow made much more sense to me, seeing that the cells could be anywhere on the infinite grid.

But I was still struggling with coordinates for the dead cells. How would I differentiate between dead or alive cells in the code? And then I fiiiiiinally realised that I only ever needed to really think about the live cells! There were no empty slots on the grid. So if I just wrote all my tests with certain live cells in mind, then I would automatically know which cells are dead - all the ones that are not alive. Yes, sounds completely simple. But somehow I had always assumed that there would be empty slots in addition to dead and alive cells on the grid which was why I found it so difficult. But when I finally had my revelation, it was like a load was lifted of my mind and I basically skipped across the green meadow of TDD to finish the code.

(Caveat: of course, it’s not really finished. The tests are passing but I think the code has got a lot of room for improvement. Feel free to take a look at where I'm at.)

##What have I learnt?

Last Friday I had the opportunity to talk to an experienced developer about GoL and our discussions lead me to ask him how he used object oriented programming in his every day work. He said that normally he would start with fewer classes and only once classes and methods got too big, he would think about how to separate certain code out. Very interesting! So maybe the trick is not to force the object orientation but to do it bit by bit when it becomes necessary to make the code more readable? I’m intending to read Sandi Metz’s book “Practical Object-Oriented Design in Ruby” to hopefully understand this topic a bit better.

Another rule that we spoke about on Friday was “tell don’t ask”. We definitely did learn this concept in the web dev bootcamp but I don't remember using this specific saying to express it. Maybe we did but I was probably too focused on getting my syntax right to even let this rule get near the storage facilities in my brain. “Tell don’t ask” means don’t ask an object for it’s data and then act upon that data but instead tell the object what to do. So yeah, I kind of knew that. But I don't remember hearing that specific saying.

##Newsflash, TDD is useful!

I must say that this was the first time that I felt that the TDD approach really helped me. When I was previously practising TDD it always felt a bit unnatural - why can’t I just write the code when I already know what it should be anyway? But this was the first time that I really felt the benefits of it. On the one hand it focused my mind on what the next small step should be. And on the other hand I felt like I was able to relax more while writing the code. Once I had written a test, I knew what my code needed to achieve, so I could park the thought about defining the outcome and instead focus on thinking about how to achieve that outcome with my code. Much easier than always keeping everything in my head at the same time.

Lastly, I think this has proven again that the good old KISS rule is your friend. (KISS = keep it simple, stupid). In future I'll try not to overthink solutions before I have even started coding. From now on, I'll genuinely let the TDD guide me rather than jumping ahead and trying to be clever.
