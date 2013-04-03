---
layout: post
title: Reading JavaScript for Java or C# Developers
description: A primer to help developers with a Java or C# background read JavaScript
---

Having bitten the bullet and diving headlong into JavaScript after a long history of working diligently in Java and C#, here are some things I would like to share before I forget how confusing JavaScript can be. This blog post is geared towards people with a programming background in object oriented design in languages like Java or C#. I hope this post can help those who want to read JavaScript.

JavaScript is extremely deceiving with its C-like syntax, but it is a dynamic, loosely typed, functional, object-oriented language with type coercion and prototypal inheritance, so be prepared for something very not-C-like except for the syntax.

<h3><em>Declaring a namespace</em> or <em>weird line at the start of JavaScript file</em></h3>
{% highlight javascript+django %}
var MY_NAMESPACE = MY_NAMESPACE || {};
{% endhighlight %}

This is a typical way of declaring a namespace. The variable <strong>MY_NAMESPACE</strong> will remain the same if it is already defined, and if it is not already defined, it will be defined as an empty JavaScript object. The purpose of this of this line is very similiar to <em>ifndef</em> in C. We will go into greater depth about how the || operator works when we discuss type coercion. 

You will probably see the code go on to define properties and functions for MY_NAMESPACE, which is technically a JavaScript object, but we are using it like a namespace for those properties and functions.

{% highlight javascript+django %}
MY_NAMESPACE.MAX_NUM_WIDGETS = 7;
MY_NAMESPACE.tellACoolStory = function() { /*...*/ };
//etc
{% endhighlight %}

The purpose of declaring a namepsace is to avoid name collisions. If you do not specify a namespace, you will add properties to the global namespace, making a name collision much more likely. Name collisions sometimes cause subtle bugs. Sometimes they cause critical bugs. Often name collisions are very hard to debug, so you will want to use namespaces except for the most trivial JavaScript applications.

<h3><em>Type coercion</em> or <em>treating something that is not a conditional as a conditional</em></h3>

{% highlight javascript+django %}
var myFunction = function() { /*...*/ }
if(myFunction) { /* code will execute */}
{% endhighlight %}

JavaScript does not return type errors, either at compile time or runtime. When a JavaScript application tries to treat a variable as a conditional, even if that variable is not a conditional, JavaScript will <em>coerce</em> the variable into a conditional. We can see that we declared the above variable myFunction as a function. The application as written above will execute the code within the if-block because a function coerced into a boolean will have the value of true. We can see type coercion at play again when the below coerces the 1 into a string type.

{% highlight javascript+django %}
console.log(1 + " apple"); //prints out "1 apple" to the console
{% endhighlight %}

The previous JavaScript method of declaring a namespace also utilizes type coercion. 

{% highlight javascript+django %}
var MY_NAMESPACE = MY_NAMESPACE || {};
{% endhighlight %}

<strong>var MY_NAMESPACE</strong> declares a variable named <strong>MY_NAMESPACE</strong>. We can see the right side of the equal sign, it coerces MY_NAMESPACE into a boolean type, and if that coerced boolean type is equal to true, the value of MY_NAMESPACE will be assigned to MY_NAMESPACE, meaning it will remain the same. JavaScript developers often call a value that can be coerced to true "truth-y", and values that can be coerced to false are sometimes called "false-y". 

So if a value at the left side of a || operator is truth-y, it will [short-circuit the evaluation](http://en.wikipedia.org/wiki/Short-circuit_evaluation), so if MY_NAMESPACE is defined (that is, truth-y), (MY_NAMESPACE || {}) will return MY_NAMESPACE. Otherwise, (MY_NAMESPACE || {}) will return {}, that is, an empty JavaScript object to which we can start assigning functions and other properties.

<h3>This and that and self and closures</h3>
{% highlight javascript+django %}
var that = this;
{% endhighlight %}

This one is a doozy to explain, especially since JavaScript treatment of the <em>this</em> keyword is kind of similar to C# and Java, but have very significant differences that [other](http://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/) people have [described](http://javascriptweblog.wordpress.com/2010/08/30/understanding-javascripts-this/) much better than I can. Instead, I am going to try to skirt around the issue by assuming you understand what determines the value of <em>this</em> and tell you that the intention of the above line of code is to assign the value of <em>this</em> into a variable named <em>that</em> because <em>this</em> can be overridden (and you understand how <em>this</em> can be overridden because you understand JavaScript <em>this</em>). That way, so when you have another function which is within the scope which <em>that</em> is defined, that function can reliably call <em>that</em> and know that <em>that</em> is pointing at the right JavaScript object. It is also common to replace the variable name <em>that</em> with <em>self</em> to convey a similar intention.

<h3>Immediately invoked function</h3>

The last concept that this post will cover can go by many names, including immediately invoked functions and self executing functions.

{% highlight javascript+django %}
function(params) {
	//...
}(theParams);
{% endhighlight %}

The biggest weakness of JavaScript is it's scoping. It is not block scoping, like C# or Java where everything between curly braces are essentially in their own scope, and when code execution reaches the end of a scope with closing curly braces, the garbage collector comes by and disposes those resources (most of the time). Instead, Javascript uses function scoping, where everything within a function is within its own scope.

"But I can write JavaScript outside of a function! What's the scope on the code written there and the resources used?" That, in my opinion, is the biggest shortcoming of JavaScript: all of that code which is not wrapped in a function is in the global scope. This can be easily overcome by wrapping everything into an immediately invoked function, where all your code that's self-contained stays in the scope of the immediately invoked function instead of polluting the global scope.

<h3>Conclusion</h3>
I hope that this post has given you a good overview of some of the more common JavaScript idioms whose usage is powerful (short and clear) for JavaScript applications, but appear completely foreign to the usual Java or C# developer.