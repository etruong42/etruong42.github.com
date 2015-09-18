if($Env:Path.ToLower().Contains("chocolatey")) {
	"Chocolatey already installed; skipping installation"
}
else {
	"Installing chocolatey..."
	iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))
}

"Installing putty..."
cinst putty

"Installing git..."
cinst git.install

#tool to generate openSSH keys
$keygen = ${Env:ProgramFiles} + "\git\bin\ssh-keygen"

#set directory to contain ssh keys
$sshdir = $Env:temp + "\ssh"

#name of openSSH key
$sshloc = $sshdir + "\gitkey"

#name of putty ssh key
$puttysshloc = $sshdir + "\puttygitkey"

if(!(Test-Path $sshdir))
{
	mkdir $sshdir
}

#tell git to use plink on putty
[Environment]::SetEnvironmentVariable("GIT_SSH","$env:ChocolateyInstall\bin\PLINK.exe","User")

#generate openSSH key
& $keygen -t rsa -f $sshloc

#export openSSH key to putty key
#this opens the puttygen dialog
puttygen $sshloc -o $puttysshloc

Write-Host "This script has ended and opened a puttygen window." -foregroundcolor "green"
Write-Host "Before closing that window, be sure to save your private key to the filesystem" -foregroundcolor "green"
Write-Host "and upload the public key in the puttygen window to your server's authorized_keys" -foregroundcolor "green"
Write-Host "Once you have saved your private key, please execute:" -foregroundcolor "Green"
Write-Host ""
Write-Host "pageant C:\path\to\your\privatekey.ppk" -foregroundcolor "Yellow"
Write-Host ""
Write-Host "where C:\path\to\your\privatekey.ppk is the path to the private key file you saved from the puttygen window" -foregroundcolor "Green"
Write-Host ""
Write-Host "Before connecting to any server, you must first add the server's host key to the registry" -foregroundcolor "green"
Write-Host "You can do so by connecting via putty first, for example, trying to connect to github server, you first run" -foregroundcolor "green"
Write-Host ""
Write-Host "putty github.com" -foregroundcolor "Yellow"
