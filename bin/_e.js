// 'use strict';
console.log("run from .bin");
console.log("process.argv",process.argv,":::",process.execPath);

var shell = require("shelljs");
var childProcess = require('child_process');
const path = require('path');
const fs = require('fs');

var puppeteer = require("puppeteer");
var compareImages = require("resemblejs/compareImages");

shell.echo("Runned");
// function some(){
// 	console.log("some runned");
// }
// const args = [path.join(__dirname, 'test')];
// console.log("args",args);
// const proc = childProcess.spawn(process.execPath, process.argv[2], {
//     stdio: 'inherit'
//   });
var config = fs.readFileSync("./aya[eye].config.js").getBuffer();

console.log("config",config);
// var file = require(process.argv[2]);
var link = process.argv[2];
console.log("link",link);
async function getDiff(one,two){

    const options = {
      output: {
        errorColor: {
          red: 255,
          green: 0,
          blue: 255
        },
        errorType: 'movement',
        transparency: 0.3,
        largeImageThreshold: 1200,
        useCrossOrigin: false,
        outputDiff: true
      },
      scaleToSameSize: true,
      ignore: ['nothing', 'less', 'antialiasing', 'colors', 'alpha'],
    };
    // The parameters can be Node Buffers
    // data is the same as usual with an additional getBuffer() function
    // console.log("images",one,two);
    const file = fs.readFileSync(one);
    const file2 = fs.readFileSync(two);
    // console.log("filte",file,file2);
    const data = await compareImages(
        file,
        file2,
        options
    ).catch(err=>console.log("compare err",err));

    console.log("data",data);

    return data;
}
var a = async () => {
    console.log("start browser")
        const browser = await puppeteer.launch({
            headless:false,
            timeout:0
        });

        const page = await browser.newPage();
        page.setUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1");
        page.setViewport({
            width:1280,
            height:900
        })
        console.log("page");
        await page.goto(link);
        console.log("before screen");
        const dir = "./tests/visual/"
        shell.mkdir('-p', dir);

        const l = link.replace(/[.:\/]/g,"_");
        const currL = l+"curr";

        if (!fs.existsSync(dir+l+".png")){
            console.log("no file");
            await page.screenshot({path: `./tests/visual/${l}.png`});
        }
        await page.screenshot({path: `./tests/visual/${currL}.png`});
        
        await browser.close();

        const data = await getDiff(dir+l+".png",dir+currL+".png").catch(err=>console.log("ree",err));
        if(data.misMatchPercentage>1){
            console.log('\x1b[31m', 'Compare is failed');
        }
        shell.mkdir('-p', dir+"output/");
        await fs.writeFile(dir+"output/"+l+'.png', data.getBuffer());

        console.log("screen ready");
};

a().catch( (error)=> {
    console.log("err",error);
    process.exit(1);
})



function runScript(scriptPath, callback) {
    // keep track of whether callback has been invoked to prevent multiple invocations
    var invoked = false;

    var process = childProcess.fork(scriptPath);

    // listen for errors as they may prevent the exit event from firing
    process.on('error', function (err) {
        if (invoked) return;
        invoked = true;
        callback(err);
    });

    // execute the callback once the process has finished running
    process.on('exit', function (code) {
        console.log("exit",code);
        if (invoked) return;
        invoked = true;
        var err = code === 0 ? null : new Error('exit code ' + code);
        callback(err);
    });

}
// global.some = "test global variable";
// Now we can run a script and invoke a callback when complete, e.g.
// runScript(process.argv[2], function (err) {
//     if (err) throw err;
//     console.log('finished running some-script.js');
// });

// shell.exec("node " + process.argv[2]);