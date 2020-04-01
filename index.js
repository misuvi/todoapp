let uuid=require('uuid');
let fs=require('fs');
let argv = process.argv.slice(2);
let tasks = [];

function display(data)
{
    let index=1;
    data.forEach(element => {
        console.log(`${index++}. ${element.task}`)
    });
}
// console.log(uuid);
// console.log('------------------------------------');
// console.log(argv);
// console.log('------------------------------------');
// console.log(argv[1])
switch(argv[0]){
    case 'insert':case 'Insert':case 'INSERT':
    case 'add':case 'Add':case 'ADD'
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
                    console.log('Please enter a valid input');  
                
                break;
    case 'update':case 'Update':case 'UPDATE':
    case 'change':case 'Change':case 'CHANGE':
    case 'edit':case 'Edit':case 'EDIT' 
            :   if(!argv[1]||!argv[2])
                {
                    console.log('Please Enter valid details to update');
                }
                else{
                    let jsonData=fs.readFileSync('todo.json','utf8')
                    if(!jsonData.length || jsonData==='[]')
                        console.log('Sorry, There are no tasks at present.')
                    else{
                        let flag=0;
                        let upid=argv[1]
                        let updata=argv.slice(2).join(' ');;
                        tasks=JSON.parse(jsonData);
                        tasks.forEach(itask => {
                            if(itask.id==upid)
                            {
                                itask.task=updata;
                                fs.writeFile('todo.json',JSON.stringify(tasks,null,1),err=>{if(err){console.log(err)}})
                                flag++;
                                console.log(`Task with id:${upid} successfully updated to \"${updata}\" :)`)
                            }
                        });
                        if(!flag)
                            console.log('There\'s no task with the entered id!');
                    }
                }
                break;
    case 'show':case 'Show':case 'SHOW':
    case 'display':case 'Display':case 'DISPLAY':
    case 'list':case 'List':case 'LIST' 
            :   let fileData=fs.readFileSync('todo.json','utf8');
                if(!fileData.length || fileData==='[]')
                    console.log('Oops! There\'re no tasks!')
                else
                    display(tasks=JSON.parse(fileData));
                break;
    case 'delete':case 'Delete':case 'DELETE':
    case 'remove':case 'Remove':case 'REMOVE':
    case 'completed':case 'Completed':case 'COMPLETED' 
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
                        for(;i<tasks.length;i++)
                        {
                            if(tasks[i].id===delid)
                                break;
                        }
                        // tasks.forEach(itask=>{
                        //     if(itask.id===delid)
                        //         break;
                        //     i++;
                        // });
                        if(i>=tasks.length)
                            console.log('There\'s no task with the entered id!');
                        else{
                            tasks.splice(i,1);
                            fs.writeFile('todo.json',JSON.stringify(tasks,null,1),err=>{if(err){console.log(err)}});
                            console.log(`Task with id:${delid} deleted successfully :)`);
                        }
                    }
                }
                break;
    default 
            :   console.log('Invalid Operation');
}