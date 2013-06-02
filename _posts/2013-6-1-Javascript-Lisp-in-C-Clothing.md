---
layout: post
title: Javascript&#58; Lisp in C's Clothing
description: Javascript leverages the power of a functional language
---
Joe Marshall wrote an article titled ["Not Lisp again..."](http://funcall.blogspot.com/2009/03/not-lisp-again.html) where he demonstrated the power of Lisp by taking a calculus formula
<pre>
                       f (x + dx) - f (x)
D f(x) = f'(x) = lim  --------------------
                               dx
</pre>
and translating it directly into Lisp

	(define dx .0001)

	(define (deriv f)

		(define (f-prime x)
			(/ (- (f (+ x dx)) (f x))
			dx))

		f-prime)
	(define (cube x) (* x x x))

	(define cube-deriv (deriv cube))

And demonstrated that it spat out the correct answer. It just works.

	(cube-deriv 2)
	;Value: 12.000600010022566

	(cube-deriv 3)
	;Value: 27.00090001006572

	(cube-deriv 4)
	;Value: 48.00120000993502

Let's face it, Lisp is pretty exotic. Even if you don't agree that Lisp is exotic, Lisp is fringe compared to Javascript. Javascript is everywhere. First, it dominated client-side applications web applications by being in every major browser, and now it's penetrating the server application space with systems like Node.js. But Javascript has the exact same, espressive power that Marshall described above.

{% highlight javascript+django %}

var dx = 0.0001;
var deriv = function(f) {return function(x) { return (f(dx+x) - f(x)) / dx};};
var cube = function(x) {return x*x*x;};
var cube_deriv = function(x) { return deriv(cube)(x);};

cube_deriv(2);
12.000600010022566
cube_deriv(3);
27.00090001006572
cube_deriv(4);
48.00120000993502

{% endhighlight %}

And I am so excited. Lisp for whatever reason did not really take off, but Javascript is taking off in a huge way. There are many arguments for why Javascript sucks, and many of them are valid. But it's hard to argue that it's not powerful, and due to the popularity of Javascript, there are many avenues to learn Javascript to avoid the sucky parts. And when you hit upon one of Javascript's dark corners (because you will), there is a huge community to help you find your way out. Javascript is the [most prominent language on GitHub where 21% of the repositories are written in Javascript](https://github.com/languages) at the time of writing, and for better or for worse, I can't even find the percentage of Common Lisp repos on GitHub.