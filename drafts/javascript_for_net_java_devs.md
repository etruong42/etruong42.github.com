---
layout: post
title: Reading JavaScript for Java or C# Developers
description: A primer to help developers with a Java or C# background read JavaScript
---

Having bitten the bullet and diving headlong into JavaScript after a long history of working diligently in Java and C#, here are some things I would like to share before I forget how confusing JavaScript can be. This blog post is geared towards people programming background in object oriented design in languages like Java or C#. I hope this post can help those who want to read JavaScript.

JavaScript is extremely deceiving with its C-like syntax, but it is a dynamic, loosely typed, functional, object-oriented language with type coercion and prototypal inheritance, so be prepared for something very not-C-like except for the syntax.

<h3><em>Declaring a namespace</em> or <em>weird line at the start of JavaScript file</em></h3>
{% highlight javascript+django %}
var SOMETHING = SOMETHING || {};
{% endhighlight %}

This is the most typical way of declaring a namespace. The variable <strong>SOMETHING</strong> will remain the same if it is already defined, and if it is not already defined, it will be defined as an empty JavaScript object. The purpose of this of this line is very similiar to IFNDEF in C. We will go into greater depth about how the || operator works when we discuss type coercion. 

You will probably see the code go on to define properties and functions for SOMETHING, like 

{% highlight javascript+django %}
SOMETHING.MAX_NUM_WIDGETS = 7;
SOMETHING.tellACoolStory = function() { /*...*/ };
//etc
{% endhighlight %}

The purpose of declaring a namepsace is to avoid name collisions. If you do not specify a namespace, you will add properties to the global namespace, making a name collision much more likely. Name collisions sometimes cause subtle bugs. Sometimes they cause critical bugs. Often name collisions are very hard to debug, so you will want to use namespaces except for the most trivial JavaScript applications.

<h3><em>Type coercion</em> or <em>treating something that is not a conditional as a conditional</em></h3>

{% highlight javascript+django %}
var SOMETHING = function() { /*...*/ }
if(SOMETHING) { /* code will execute */}
{% endhighlight %}

JavaScript does not return type errors, either at compile time or runtime. When a JavaScript application tries to treat a variable as a conditional, even if that variable is not a conditional, JavaScript will <em>coerce</em> the variable into a conditional. We can see that we declared the above variable SOMETHING as a function. The application as written above will execute the code within the if-block because a function coerced into a boolean will have the value of true.

{% highlight javascript+django %}
console.log(1 + " apple"); //prints out "1 apple" to the console
{% endhighlight %}

We can see type coercion at play again when the above code coerces the 1 into a string type.

The previous JavaScript method of declaring a namespace also utilizes type coercion. 

{% highlight javascript+django %}
var SOMETHING = SOMETHING || {};
{% endhighlight %}

<strong>var SOMETHING</strong> declares a variable named <strong>SOMETHING</strong>. we can see the right side of the equal sign, it coerces SOMETHING into a boolean type, and if that coerced boolean type is equal to true, the value of SOMETHING will be assigned to SOMETHING, meaning it will remain the same. JavaScript developers often call a value that can be coerced to true "truth-y", and values that can be coerced to false are sometimes called "false-y"

<h3>This and that and self and closures</h3>
{% highlight javascript+django %}
var that = this; //wat
{% endhighlight %}

immediately invoked function, self executing functions

{% highlight javascript+django %}
function(params) {
	//...
}(theParams);
{% endhighlight %}