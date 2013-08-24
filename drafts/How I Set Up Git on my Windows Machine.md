---
layout: post
title: How to Set Git Up on Windows
description: Instructions on how to integrate git into a Windows environment
---

If you just want to get git on your Windows box that is integrated with the Windows environment (run git from a native windows terminal), you can run the following in your command prompt:

@powershell -NoProfile -ExecutionPolicy unrestricted -Command "iex ((new-object net.webclient).DownloadString('http://ethantruong.net/install/installgit.ps1'))"

In summary, this will install Chocolatey (a package manager for Windows), Git for Windows, and putty. The script will set the appropriate environment variables to properly integrate Git For Windows and use puTTY to facilitate the SSH connection to the git server. 

There are a few steps I did not manage to script away, such as 

re-entering your passphrase when importing an openSSH private key to puTTY's format, 

saving the private key

uploading the public key to your server (example with github)

adding your server's host key to puTTY's registry

calling putty's authentication agent with the newly created private key