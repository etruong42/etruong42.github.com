---
layout: post
title: How to Set Git Up on Windows
description: Instructions on how to integrate git into a Windows environment
---
Get chocolatey: package manager for Windows. Like any other good package manager, it quickly installs popular tools and add to the environment in the command line without having to browse to different websites, downloading the installer, and executing it. 

==Install Dependencies==

For example, the way I install and run git for a new Windows install, I would

install chocolatey

@powershell -NoProfile -ExecutionPolicy unrestricted -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%systemdrive%\chocolatey\bin

install putty:

cinst putty

install msysgit

cinst git.install

==Setup SSH==

run puttygen to create ssh rsa2 key

upload public key to your git server

run ____ on the private key

set GIT_SSH environment variable to the path of plink that was installed when you ran cinst putty.

==Run git==

You now have git running fully integrated into windows 

close your terminal and re-open. running 
