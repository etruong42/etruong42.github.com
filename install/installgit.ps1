if($Env:Path.ToLower().Contains("chocolatey")) {
	"chocolatey already installed"
}
else {
	"installing chocolatey"
	iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))
}

cinst putty

cinst git.install