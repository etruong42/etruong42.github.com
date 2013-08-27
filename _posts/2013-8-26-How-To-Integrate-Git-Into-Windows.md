---
layout: post
title: How to Integrate Git Into Windows
description: A script and instructions on how to integrate git into a Windows environment
---

If you just want to get git on your Windows box that you can painlessly run from native Windows terminals, you can run the following in your command prompt:

{% highlight bat %}

@powershell -NoProfile -ExecutionPolicy unrestricted -Command "iex ((new-object net.webclient).DownloadString('https://raw.github.com/etruong42/etruong42.github.com/master/install/installgit.ps1'))"

{% endhighlight %}

The above command will download and execute the [script that you can look at on GitHub](https://github.com/etruong42/etruong42.github.com/blob/master/install/installgit.ps1). After running the script, follow the post-script instructions and you should be all ready to run git in native Windows consoles. The script took me about 2 minutes to complete every step (i7 quad core, 8 GB RAM).

<img src="/assets/img/run_git_install_script.png" alt="Run git install script" />

<h3>How the script works</h3>

The script installs [Chocolatey (a package manager for Windows)](http://chocolatey.org/), [Git for Windows](https://code.google.com/p/msysgit/), and [puTTY](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html) (chocolatey installs the other two components). The script will set the appropriate environment variables to properly integrate Git For Windows and use puTTY to facilitate the SSH connection to the git server.

The following are a few steps I did not manage to script away.

<h3>Grant permission to install msysgit</h3>
The script attempts to install msysgit using the package manager Chocolatey, and the way Chocolatey attempts to install msysgit still requires user input to authorize the change.

<img src="/assets/img/install_git_warning.png" alt="Install git warning" />

<h3>Saving the private and public key</h3>

When importing an openSSH key to puTTY's format, puTTY opens its puttygen window. You need to click "Save private key" to save the private key which your SSH agent uses to identify itself to the server. 

<img src="/assets/img/save_private_key_to_filesystem.png" alt="Save private key to filesystem" />

You will also need to copy the public key in the first text area of the puttygen dialog and paste it into the git server. If you are trying to connect to GitHub, you can follow [their instructions](https://help.github.com/articles/generating-ssh-keys#step-3-add-your-ssh-key-to-github) of what to do once you have copied the public key to your clipboard.

<h3>Start SSH authentication agent</h3>

You then need to start putty's authentication agent with the newly created private key. Since I could not script saving the private key, I have no means of knowing where you saved it, but you can start the authentication agent with the following commnad in your prompt:

{% highlight bat %}

pageant C:\path\to\your\privatekey.ppk

{% endhighlight %}

Each time you restart your machine, you may need to restart the puTTY authentication agent. You can have pageant run and load your key on startup by running the PowerShell script below (be sure to replace C:\path\to\your\privatekey.ppk with the path to your private key file). You will still need to enter your passphrase on startup.

{% highlight bat %}

$sc = $WshShell.CreateShortcut("$env:appdata\Microsoft\Windows\Start Menu\Programs\Startup\pageant.lnk")
$sc.targetpath = "`"$env:systemdrive\Chocolatey\bin\PAGEANT.bat`""
$sc.arguments = "`"C:\path\to\your\privatekey.ppk`""
$sc.save()

{% endhighlight%}

The above script was inspired by [this post](http://blog.shvetsov.com/2010/03/making-pageant-automatically-load-keys.html). I merely put it into PowerShell script form.

<h3>Adding your server's host key to puTTY's registry</h3>

Like any good SSH client, it keeps a list of fingerprints of servers you have connected to. If you try to connect to a new server that the SSH client has never connected to before, it will not connect unless you explicitly tell it that the server is legitimate lest someone tries to conduct a [MITM attack](http://en.wikipedia.org/wiki/Man-in-the-middle_attack) by spoofing your server.

The easiest way to do so is to tell puTTY to open an SSH connection to the server using the command below, and confirm that you want to add the server to its registry.

{% highlight bat %}

putty yourgitserver.com

{% endhighlight %}

You can now run git from native Windows terminals! 