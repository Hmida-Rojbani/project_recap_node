const bcrypt=require('bcrypt');

//1234-->abcd

async function run(){
    const salt=await bcrypt.genSalt(10);
        console.log(salt);

        const hash=await bcrypt.hash('1234',salt);
        console.log(hash)
        const hash1=await bcrypt.hash('1234',salt);
        console.log(hash1)
}
run()