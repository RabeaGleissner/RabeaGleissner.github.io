---
title: Pointers in Go for pointer newbies
comments: true
layout: post
category: personal
read-time: 4
---

When I first started learning Go I was very confused by its usage of pointers. It wasn't the specific way in which Go used pointers which confused me. The problem was that I had never written a language with pointers before at all. So I had no idea how to use them.
 
I followed some tutorials and found out that variables that start with an ampersand are pointers and variables that don't are not pointers. And sometimes a variable can also start with an asterisk. But what does all this mean?

<!--break-->

## Pass by reference

Two languages that I feel relatively comfortable writing are Ruby and Java. Neither of those have pointers. And both of those pass variables by reference. 

That means if I pass a variable into a method and modify the value of the variable, the data that's stored inside the original variable is changed.

Here's a code example in Ruby.

<pre><code class="language-ruby">
class Flintstone

  attr_reader :name

  def initialize(name)
    @name = name
  end

  def update_name
    @name = "Freddy"
  end
end

fred = Flintstone.new("Fred")

puts fred.name
fred.update_name
puts fred.name

#Fred
#Freddy

</code></pre>

We instantiate a new Flintstone object with the name Fred and print the name. We then call the `update_name` method on the object and print again. The first time it prints "Fred", the second time it's "Freddy" because the name was updated.

If we try the same thing in Go, the result will be very different!

## Pass by value

<pre><code class="language-java">
type Flintstone struct {
	name string
}

func updateName(flintstone Flintstone) {
	flintstone.name = "Freddy"
}

func main() {
	fred := Flintstone{name: "Fred"}
	fmt.Println(fred.name)
	updateName(fred)
	fmt.Println(fred.name)
}

//Fred
//Fred

</code></pre>

There are no classes in Go, so instead I'm using a struct to define a blueprint of a Flintstone. I'm creating a new instance of the Flintstone struct with the name Fred, print the name, call the `updateName()` function on it, print the name again and both times, it prints "Fred"!

The reason for this is that by default, the Go language passes variables by value. That means that when we call the `updateName()` method on fred, we're passing in a copy of the value of fred which is then changed. The original fred is completly untouched and still the same old.

Now, I've learnt in my short coding career so far that immutability is good because it can avoid a lot of ambiguity and bugs in the code. But I guess sometimes you really do need to modify the actual Fred, not just a copy of him.

In order to achieve that, we use pointers in Go. Pointers allow us to pass the memory address of a piece of data to a function, so that the function knows where the actual variable is stored and can access it to mutate it.

Here's a code example in which we update the real Fred's name, just like we did in the Ruby example.

<pre><code class="language-java">
type Flintstone struct {
	name string
}

func updateName(flintstone *Flintstone) {
	flintstone.name = "Freddy"
}

func main() {
	fred := Flintstone{name: "Fred"}
	fmt.Println(fred.name)
	updateName(&fred)
	fmt.Println(fred.name)
}

//Fred
//Freddy

</code></pre>

The only difference to the previous example is that I added an ampersand in front of the `fred` variable when I pass it to the `updateName()` function and I added an asterisk in front of the Flintstone type parameter.

This way Go knows that I want to update the real Fred's name, not just the name of some body double.

The ampersand signals that the value is passed by reference, just like it is in Ruby or Java. Another way of saying "pass by reference" is "pass by pointer". The asterisk is used to dereference a pointer, so that we have access to the value that the pointer points to.

Another way to create a pointer to Fred would be to use Go's built in `new()` function. This code example will yield exactly the same result as the previous one because the `fred` variable that is created in this case is a pointer.

<pre><code class="language-java">
type Flintstone struct {
	name string
}

func updateName(flintstone *Flintstone) {
	flintstone.name = "Freddy"
}

func main() {
	fred := new(Flintstone)
	fred.name = "Fred"
	fmt.Println(fred.name)
	updateName(fred)
	fmt.Println(fred.name)
}

//Fred
//Freddy

</code></pre>

If I removed the asterisk from the method parameter, the program wouldn't even compile, because I'm trying to pass a pointer to a Flintstone where the value Flintstone is expected.

## When to use which?

If a function needs to mutate the data, pass a pointer to it. If it doesn't need to mutate the original data, then don't use a pointer. 

The Go language FAQs recommend that if in doubt which type to use for method receivers, it's usually best to use a pointer. In particular, if a receiver takes up a lot of memory, for example a large struct, it will be cheaper to pass it by pointer. Basic types, slices and small structs can be passed by value without any problems.

The FAQ also says - very sensibly - that consistency is important. If all methods on a struct have pointer receivers, stick with it and also use a pointer receiver for any new methods added.


