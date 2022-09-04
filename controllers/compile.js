const { exec } = require('child_process');
const fs = require('fs')

const handleCompile = (req, res) => {

    console.log(req.body.code)
    fs.writeFileSync('C:/Users/choud/test_file.cpp', req.body.code);
    // var objShell = new ActiveXObject("Shell.Application");
    //     objShell.ShellExecute("cmd.exe", "docker cp test_file.cpp 8a3db09fdd53:/home");
    // var run=new ActiveXObject('WSCRIPT.Shell').Run("docker cp test_file.cpp 8a3db09fdd53:/home");
    setTimeout(() => {
        exec("docker cp C:/Users/choud/test_file.cpp 8a3db09fdd53:/home", (err, outs, errs) => {
            console.log(outs)
        })
    }, 1000);
    
    setTimeout(() => {
        exec("docker exec 8a3db09fdd53 python3 /home/compiler.py", (err, outs, errs) => {
            console.log(outs)
        })
    }, 2000);

    setTimeout(() => {
        exec("docker cp 8a3db09fdd53:/home/out.txt /Git_Repo/aka_compiler/controllers/out.txt", (err, outs, errs) => {
            console.log(outs)
        })
    }, 2500);

    setTimeout(() => {
        fs.readFile('E:/Git_Repo/aka_compiler/controllers/out.txt', 'utf8', function(err, data){
      
            // Display the file content
            // const output = {output: data}
            const output = {out: data}
            res.json(output);
            
        });
    }, 3000);

    console.log(1233);
    
    
    
    // db.select('email', 'hash').from('login')
    //     .where('email', '=', req.body.email)
    //     .then(data => {
    //         const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
    //         if (isValid) {
    //             return db.select('*').from('users')
    //                 .where('email', '=', req.body.email)
    //                 .then(user => {
    //                     res.json(user[0])
    //                 })
    //                 .catch(err => res.status(400).json("Unable To Get User"))

    //         } else {
    //             res.status(400).json('Wrong Credentials')
    //         }
    //     })
    //     .catch(err => res.status(400).json('Wrong Credentials'))


}

module.exports = {
    handleCompile: handleCompile
};
