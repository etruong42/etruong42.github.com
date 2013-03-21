---
layout: post
title: Bug in Sitecore web.config Include Files
description: Bug in Sitecore web.config includes cause some configurations to disappear
---

Take care when adding an include file for your Sitecore web.config. These are the files located at your <em>[siteroot]\Website\App_Config\Include</em>, and John West writes about it on his blog [here](http://www.sitecore.net/Community/Technical-Blogs/John-West-Sitecore-Blog/Posts/2011/05/All-About-web-config-Include-Files-with-the-Sitecore-ASPNET-CMS.aspx) succinctly and articulately, just like every other piece of writing he does on Sitecore.

However, there is a danger if you are trying to insert an XML element without any attributes using an include file! If you do so, the first sibling of your newly inserted node will be removed! The workaround is to add an arbitrary attribute that your application can simply ignore.

For example, look at the following include file that I included at <em>[mysiteroot]\Website\App_Config\Include\Awesome.config</em>:

{% highlight xml %}

<configuration xmlns:patch="http://www.sitecore.net/xmlconfig/">
 <sitecore>
  <ui>
   <usings>
    <using patch:after="*[text()='System.Collections']">My.Awesome.Namespace</using>
   </usings>
  </ui>
 </sitecore>
</configuration>

{% endhighlight %}

The web.config has the following at its /sitecore/ui/usings node

{% highlight xml %}

<ui>
 <usings>
  <using>System</using>
  <using>System.Collections</using>
  <using>System.Reflection</using>
  ...
  <using>Sitecore.Xml</using>
 </usings>
</ui>

{% endhighlight %}

Then if we visit the expanded web.config which we can view at \[yoursite.com\]/sitecore/admin/showconfig.aspx, the first node is gone!

{% highlight xml %}

<ui>
 <usings>
  <using>System.Collections</using>
  <using>My.Awesome.Namespace</using>
  <using>System.Reflection</using>
  ...
  <using>Sitecore.Xml</using>
 </usings>
</ui>

{% endhighlight %}

Talk about annoying! However, if you put in an arbitrary attribute like so

{% highlight xml %}

<configuration xmlns:patch="http://www.sitecore.net/xmlconfig/">
 <sitecore>
  <ui>
   <usings>
    <using patch:after="*[text()='System.Collections']" att="att">My.Awesome.Namespace</using>
   </usings>
  </ui>
 </sitecore>
</configuration>

{% endhighlight %}

You won't get any unintended side effects!

{% highlight xml %}

<ui>
 <usings>
  <using>System</using>
  <using>System.Collections</using>
  <using att="att">My.Awesome.Namespace</using>
  <using>System.Reflection</using>
  ...
  <using>Sitecore.Xml</using>
 </usings>
</ui>

{% endhighlight %}

Be careful! I'm sure I will have future posts on traps you should be wary of when working with the Sitecore web.config!