---
layout: post
title: Configuring Sitecore Ribbon Spellcheck
description: Configure Sitecore ribbon spellcheck to spellcheck single-line text fields
---

Suppose you want to spell check all fields on an item using the button you see below



If you tried it, you might have noticed that the spell checker doesn't check single-line texts by default. I will show the quick and dirty way to configure this spellcheck to spellcheck whatever field types you want.

If we navigate to /sitecore/content/Applications/Content Editor/Ribbons/Chunks/Proofing/Spellcheck in your core database, we can see that on Click, the content editor executes the contenteditor:spellcheck command.


Looking at the \App_Config\Commands.config, you will find the following command with that name:

<command name="contenteditor:spellcheck" type="Sitecore.Shell.Applications.ContentManager.Commands.Spellcheck,Sitecore.Client"/>

If we decompile the type Sitecore.Shell.Applications.ContentManager.Commands.Spellcheck,Sitecore.Client, we can see the following code:

<script src="https://gist.github.com/etruong42/4112184.js"></script>

The switch statement at line 36 lists all the field types which the spell checker will check. We can modify it to include or exclude whatever field type we want. In this example, I am including the another case for the single-line text field type:

