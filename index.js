let uuid=require('uuid');
let fs=require('fs');
let argv = process.argv.slice(2);
let tasks = [];

function display(data)
{
    data.forEach((element,index) => {
        console.log(`${index+1}. ${element.task}`)
    });
}

const operation=argv[0].toLowerCase();
// console.log(uuid);
// console.log('------------------------------------');
// console.log(argv);
// console.log('------------------------------------');
// console.log(argv[1])
switch(operation){
    case 'insert':case 'add'
            :   if(argv[1]){
                    let currentData= fs.readFileSync('todo.json','utf8')
                    // console.log(currentData.length);
                    if(currentData.length || currentData==='[]'){
                        tasks=JSON.parse(currentData);
                        // console.log(tasks);
                    }
                    // console.log(tasks);
                    let individualTaskObj={
                        task:argv.slice(1).join(' '),
                        id:uuid.v1()
                    }
                    tasks.push(individualTaskObj);
                    fs.writeFile('todo.json',JSON.stringify(tasks,null,1),err=>{if(err){console.log(err);}});
                    console.log('Task Added Successfully :)');
                }
                else
                    console.log('Please enter a valid input!');  
                
                break;
    case 'update':case 'change':case 'edit' 
            :   if(!argv[1]||!argv[2])
                {
                    console.log('Please Enter valid details to update!');
                }
                else{
                    let jsonData=fs.readFileSync('todo.json','utf8')
                    if(!jsonData.length || jsonData==='[]')
                        console.log('Sorry, There are no tasks at present.')
                    else{
                        // let flag=0;
                        let upid=argv[1]
                        let updata=argv.slice(2).join(' ');;
                        tasks=JSON.parse(jsonData);
                        let index=tasks.findIndex(itask=>itask.id===upid)
                        if(index===-1){
                            console.log('There\'s no task with the entered id!');
                        }
                        else{
                            console.log(`Task with id:${upid} (previous value "${tasks[index].task}") successfully updated to \"${updata}\" :)`)
                            tasks[index].task=updata;
                            fs.writeFile('todo.json',JSON.stringify(tasks,null,1),err=>{if(err){console.log(err)}})
                        }
                        // tasks.forEach(itask => {
                        //     if(itask.id==upid)
                        //     {
                        //         itask.task=updata;
                        //         fs.writeFile('todo.json',JSON.stringify(tasks,null,1),err=>{if(err){console.log(err)}})
                        //         flag++;
                        //         console.log(`Task with id:${upid} successfully updated to \"${updata}\" :)`)
                        //     }
                        // });
                        // if(!flag)
                            // console.log('There\'s no task with the entered id!');
                    }
                }
                break;
    case 'show':case 'display':case 'list'
            :   let fileData=fs.readFileSync('todo.json','utf8');
                if(!fileData.length || fileData==='[]')
                    console.log('Oops! There\'re no tasks!')
                else{
                    tasks=JSON.parse(fileData);
                    if(argv[1]=='id')
                    {
                        tasks.forEach((element,index)=> {
                            console.log(`${index+1}. ${element.id}`)
                        });
                    }
                    else{
                        display(tasks);
                    }
                }
                break;
    case 'delete':case 'remove':case 'completed'
            :   if(!argv[1])
                    console.log('Please Enter a task id to remove -_-')
                else{
                    fs.appendFileSync('todo.json','');
                    let fileData=fs.readFileSync('todo.json','utf8');
                    // console.log(fileData);
                    if(!fileData.length || fileData==='[]')
                        console.log('Sorry, There are no tasks at present.');
                    else{
                        // console.log(fileData);
                        let delid=argv[1];
                        let i=0;
                        tasks=JSON.parse(fileData);
                        let oldLength=tasks.length;
                        tasks=tasks.filter(itask=>itask.id!==delid);
                        if(tasks.length!==oldLength){
                            fs.writeFile('todo.json',JSON.stringify(tasks,null,1),err=>{if(err){console.log(err)}});
                            console.log(`Task with id : ${delid} deleted successfully :)`);
                        }
                        else
                            console.log('There\'s no task with the entered id!');
                        // for(;i<tasks.length;i++)
                        // {
                        //     if(tasks[i].id===delid)
                        //         break;
                        // }
                        // if(i>=tasks.length)
                        //     console.log('There\'s no task with the entered id!');
                        // else{
                        //     tasks.splice(i,1);
                        //     fs.writeFile('todo.json',JSON.stringify(tasks,null,1),err=>{if(err){console.log(err)}});
                        //     console.log(`Task with id:${delid} deleted successfully :)`);
                        // }
                    }
                }
                break;
    default 
            :   console.log('Please Specify an operation as command line argument! You can Insert, Delete, Update and Display tasks.');
}
