Write-Host "This script should end by opening the puttygen window." -BackgroundColor "Green"
Write-Host "Before closing that window, be sure to save your private key to the filesystem" -BackgroundColor "Green"
Write-Host "and upload the public key in the puttygen window to your server's authorized_keys" -BackgroundColor "Green"

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
$keygen = ${Env:ProgramFiles(x86)} + "\git\bin\ssh-keygen"

#setup directory to contain ssh keys
$sshdir = $Env:UserProfile + "\.ssh"

#name of openSSH key
$sshloc = $sshdir + "\gitkey"

#name of putty ssh key
$puttysshloc = $sshdir + "\puttygitkey"

if(!(Test-Path $sshdir))
{
	mkdir $sshdir
}

#tell git to use plink on putty
[Environment]::SetEnvironmentVariable("GIT_SSH","$env:ChocolateyInstall\bin\PLINK.bat","User")

#generate openSSH key
& $keygen -t rsa -f $sshloc

#export openSSH key to putty key
puttygen $sshloc -o $puttysshloc

Write-Host "This script has completed. Please execute:" -BackgroundColor "Green"
Write-Host ""
Write-Host "pageant xyz" -BackgroundColor "Yellow"
Write-Host ""
Write-Host "where xyz is the private key file you saved from the puttygen window" -BackgroundColor "Green"
