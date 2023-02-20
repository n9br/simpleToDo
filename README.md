# simpleToDo
simple ToDo App in Techstarter Course

https://taiga.techrunner.de/project/aws-22-10-gruppe-1


2/16/2023 : an

 frontend :
    (mkdir src)
    npm install --save-dev parcel
    npm install cors
    (npx parcel src/index.html) 
    edit package.json : add start script for src/index.html
    > npm start        // start command for parcel server frontend

backend :
    npm init
    npm install nodejs
    npm install pg
    create index.js (Test)
    > node .\index.js   // should output 'hello from backend - index.js'


 simpleToDo  git add .                                                                                                                                    
warning: in the working copy of 'backend/package.json', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'frontend/package-lock.json', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'frontend/package.json', LF will be replaced by CRLF the next time Git touches it



Database:
    Postgres

    name: simpletodo


Table:

    -todos
        -id -> serial,  notNull, PK
        -title -> character, lenght: 255
        -task -> task, text
        -due_date -> timestamp .. zone
        -prio -> integer