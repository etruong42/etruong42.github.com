---
layout: post
title: Sublime Text Command Line Tool in Windows
description: Setup instructions for the Sublime Text Command Line Tool in Windows
---

There's a command to setup a command line tool for [Sublime Text](http://www.sublimetext.com/) that allows you to open Sublime Text from the command line by calling <strong>subl</strong>. Such as

{% highlight bat %}
subl README.txt #opens README.txt in Sublime Text
subl . #opens the current directory in Sublime Text
{% endhighlight %}

You can find the setup instructions of Mac OS X [here](http://www.sublimetext.com/docs/2/osx_command_line.html). However, I could not find the analagous command to set something like that up in Windows.

Sublime Text is one of my favorite text editors. Often, when I'm checking out a new code project, I open it in Sublime Text to get a lay of the land where it has a sidebar to navigate the directory, open multiple tabs, place tabs side by side, and syntax highlighting. It also has a very powerful [package manager](https://sublime.wbond.net/).

So when I do development on Windows, I miss being able to navigate and quickly open Sublime Text from my console window. But setting up the Sublime Text command line is simple: the original instructions simply made a symlink in a directory that is included in your path.

So let's first make the symlink for Sublime Text 2. (Note: I have not tried with Sublime Text 3)

{% highlight bat %}

cmd /c mklink /H "$env:programw6432\Sublime Text 2\subl.exe" "$env:programw6432\Sublime Text 2\sublime_text.exe"

{% endhighlight %}

which outputs

{% highlight bat %}

"Hardlink created for C:\Program Files\Sublime Text 2\subl.exe <<===>> C:\Program Files\Sublime Text 2\sublime_text.exe"

{% endhighlight %}

then add the Sublime Text program files folder to the PATH environment variable

{% highlight bat %}

PS C:\Users\Ethan> [Environment]::SetEnvironmentVariable("Path", "$Env:Path;$env:programw6432\Sublime Text 2\", "User")

{% endhighlight %}

If your restart your console session, you should be able to open Sublime Text by just typing four characters into your console: <strong>subl</strong>
