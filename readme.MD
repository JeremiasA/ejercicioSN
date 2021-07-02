*Run console (node required):*
1) npm install (install required libraries)
2) memory mode: 'npm start' || 'node src/console.js' 
3) persisted mode: 'node src/console.js -persisted <'filename'>'
    - if you dont add <'filename'> default name is 'no-name'
    - dont need to add extension, files will be saved as .json
    - if <'filename'> already exists the console will load previuos saved data
    - files will be created in /memory folder

** initial super user: An initial user with super-user privileges is loaded if memory mode is running or if already there aren't users in persisted mode

** to run test: 'npm test'

** about libreries **

libraries needed to run memory-mode with node:

1) "prompt" for node (because "prompt" method of JS is not support by node)

libraries needed to run persisted-mode with node:

1) "fs" - to save files

libraries for tests:

1)"mocha"
2)"chai"

