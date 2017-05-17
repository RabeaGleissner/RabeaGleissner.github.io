---
title: Vagrant adventures
comments: true
layout: post
category: personal
read-time: 3
---

I am in the process of setting up a development environment on a virtual machine for an Elixir project and thought I’d write about it: mainly for myself for future reference. And also because I have loads of down time while I wait for `vagrant up` to run, so I might as well use that time.

<!--break-->

Basically I want to run a virtual machine on my local machine which has all the things installed that I need for an Elixir Phoenix app. I personally had lots of trouble with various postgres setups, so I think it will be nice not to install yet another postgres version on my own machine.

First I installed [Vagrant](https://www.vagrantup.com/downloads.html) and [Virtualbox](https://www.virtualbox.org/wiki/Downloads).

Virtualbox is a virtual machine monitoring software (also called hypervisor) which allows us to create and manage virtual machines on our host computer. I have some experience with it from the time I worked as a front end developer. We used Virtualbox to create Windows machines so we could test our code in Internet Explorer. Back then I had an old laptop, so when I started my VM, I could go to lunch and when I came back from lunch it would maybe have started up. We never used Vagrant back then. I guess it’s not a must but using Vagrant makes the virtual machine more easily reusable.

With Vagrant we can write down which technology we want to use for our virtual machine and we can set up the machine any time we want, over and over again. With just one command: `vagrant up`

To use Vagrant, we need to create a file called `Vagrantfile`. All the files that are in the same directory as this Vagrantfile will also be accessible in our virtual machine, in the `/vagrant/` directory. So that’s quite handy.

Use the command `vagrant init` which will create a Vagrantfile with loads of comments that are helpful to read through when you’re doing this for the first time.

Vagrant is written in Ruby, so the Vagrantfile is also Ruby.
It starts like this:

<pre><code class="language-ruby">
Vagrant.configure("2") do |config|
  ...
end

</code></pre>

“2” is the version. Supported versions are 1 and 2 currently. And inside that loop we can start specifying which box we want to use.
I originally started with the box that the tutorial by hashicorp suggested: `hashicorp/precise64`

However I ended up having loads of problems further down the line when I tried to configure Postgres. The problems seemed to be related to incompatible versioning. I had specified in my Vagrantfile which version to use, following the tutorial, so I’m not sure if it was the box itself or the version. In the end I just went with a completely different box and didn’t specify a version at all and the problems were resolved.

So the Vagrant file looks like this now:

<pre><code class="language-ruby">
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/trusty64"
end

</code></pre>

I also added a line to forward ports to my local machine. So if I run a server on a port on localhost in my Vagrant box, I can then open the browser on my own laptop and look at that port on localhost.

<pre><code class="language-ruby">
config.vm.network "forwarded_port", guest: 4000, host: 4000, host_ip: "127.0.0.1"

</code></pre>

Then I specified two more bits of configuration, that I’m asking Vagrant to do. One contains commands that are run from the shell and one through Ansible.

I had some trouble setting the correct locale for using Elixir and therefore had to specifically set it. That’s what I’m doing in the shell provisioning code snippet below.

<pre><code class="language-ruby">
  config.vm.provision :shell, :inline => <<-EOT
     echo LANG="en_US.utf8" > /etc/default/locale
     echo LANGUAGE="en_US:" >> /etc/default/locale
     echo LC_ALL="en_US.UTF-8" >> /etc/default/locale
  EOT

</code></pre>

And then I’m asking Vagrant to look at the Ansible playbook file to set up the virtual machine with all the languages and tools that I need. That's where the meat of the setup is really. I intend to write a separate blog post about it later.

<pre><code class="language-ruby">
  config.vm.provision :ansible do |ansible|
    ansible.playbook = "setup/playbook.yml"
  end


</code></pre>

And that's all there is to my Vagrant file for now. 

<pre><code class="language-ruby">
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.network "forwarded_port", guest: 4000, host: 4000, host_ip: "127.0.0.1"

  config.vm.provision :shell, :inline => <<-EOT
     echo LANG="en_US.utf8" > /etc/default/locale
     echo LANGUAGE="en_US:" >> /etc/default/locale
     echo LC_ALL="en_US.UTF-8" >> /etc/default/locale
  EOT

  config.vm.provision :ansible do |ansible|
    ansible.playbook = "setup/playbook.yml"
  end
end


</code></pre>

The bare minimum to setup a Vagrant machine and run it, is even less code. It would be sufficient to only have one line in the configure block, which is the one that specifies which box to use.

And then it would already be possible to access the Vagrant box. Which brings me to the most important Vagrant commands:

`vagrant up` - brings up the Vagrant box and provisions it

`vagrant ssh` - puts you inside the virtual machine. Your local files will have been copied to your `/vagrant/` directory.

`vagrant provision` - provisions the box when it's already up (in this process it runs through all the instructions in the Vagrant file and also copies all the files from the host machine that are in the same directory as the Vagrant file.)

`vagrant reload` - restarts Vagrant. Useful when you've made a change to the Vagrant file and want to see how it's executed. The command reruns the provisioning (even though the machine is already provisioned)

`vagrant destroy -f` - an important one! When everything is messed up and your provisioning files are erroring left, right and centre, just destroy the whole machine, fix your provisioning files and start again from scratch with `vagrant up`

`vagrant status` - shows you if the VM is running

`vagrant global-status` - shows you all the VMs you have running on your laptop



