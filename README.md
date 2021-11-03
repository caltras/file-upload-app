# Project File-Upload-App

This test project has intention to save a file on server, shows the file's list and download the files from server.

A pipeline was added in order to run the tests and deploy it on Heroku.

Application url: https://fileupload-claudio.herokuapp.com/file

## Install

Before run the application, we have to install nodejs. 
This project is using version 16.x

To install the application run the command `npm install`

## Run

Before you run the application, you can set your own mongodb URL or run the docker container script available on root folder.

Run the command `sh run-mongodb.sh`

After set the application.js file, you can run the application using `npm start`. 

It is configured to run on port 80 due to heroku deployment.

However, we can set the PORT before start the application

`export PORT=3000`

## Tests

This project is using jest as test suite.
Run the command `npm test` to run the tests. A coverage report will be available on coverage folder.


## Observability

There are 3 ways to log the application.
We can use mongodbProvider, ElasticSearchProvider or console

It is easily configured on application<env>.js file

```
    log: {
        level: "ERROR",
        
        // Use Elasticsearch as log provider
        /*provider : {
            name: "elasticsearch.logger.js",
            host: "http://localhost:9200"    
        }*/
        
        // Use console as log provider
        /*provider:{
            name: "console.logger.js"
        },*/

        // Use mongodb as log provider
        provider : {
            name: "mongodb.logger.js",
            host: "mongodb://localhost:27017"
        }
        
    }

```

Once the data on mongodbProvider or Elasticsearch, we can connect a tool to manage and visualize the logs.
For Elasticsearch, is possible use ELK (Elasticsearch, Logstash, Kibana) stack.

## Endpoints

1. GET / - Welcome page

    Welcome page

2. GET /file - List of files saved on server
    
    @return Array (A list of files)
        
        Fields:
        ```
            _id: Hexadecimal String 
            name: String
            path: String 
            size: Numeric (File Size)
            createAt: Date
        ```
3. POST /file - Save a file on server
    
    @payload - List of files

    @return Obj (Success/Fail message)

        ```
            {
                "code": 200,
                "message": "File Uploaded"
            }
        ```

4. GET /file/dowload/:id - Download a specific file
    
    @return File