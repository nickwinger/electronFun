var electronInstaller = require('electron-winstaller');

resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: './ElectronFun-win32-ia32',
    outputDirectory: './installer',
    authors: 'bit4bit',
    noMsi: true,
    exe: 'ElectronFun.exe',
    setupExe: 'ElectronFunSetup.exe'
});

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));