/// <reference path="../Scripts/jquery-1.8.3.js" />


(function () {
    'use strict';

    $(document).ready(function() {
        init();
    });

    // this function runs when the page loads to set up the drop area
    function init() {
        // Set the drop-event handlers.
        var dropArea = document.getElementById("dropspot");
        dropArea.addEventListener("drop", dropHandler, false);
        dropArea.addEventListener("dragover", dragOver, false);
        dropArea.addEventListener("dragleave", dragleave, false);
    }
    
    function dragOver(event) {
        doNothing(event);
        $("#dropspot").addClass("over");
    };

    function dragleave(event) {
        doNothing(event);
        $("#dropspot").removeClass("over");
    };
    
    function dropHandler(event) {
        // Use our doNothing() function to prevent default processing. 
        doNothing(event);
        $("#dropspot").removeClass("over");

        // Get the file(s) that are dropped.
        var filelist = event.dataTransfer.files;
        if (!filelist) return;  // if null, exit now
        var filecount = filelist.length;  // get number of dropped files

        if (filecount > 0) {
            // Do something with the files. 
            var file = filelist[0];
            if (file) {
                getAsText(file);
            }

        }
    }
    
    function getAsText(readFile) {

        var reader = new FileReader();

        //For TEXT FILES Read file into memory as UTF-16      
        //reader.readAsText(readFile, "UTF-8");
        reader.readAsDataURL(readFile);
        // Handle progress, success, and errors
        reader.onprogress = updateProgress;
        reader.onload = loaded;
        reader.onerror = errorHandler;
    }

    function updateProgress(evt) {
        if (evt.lengthComputable) {
            // evt.loaded and evt.total are ProgressEvent properties.
            var loaded = (evt.loaded / evt.total);

            if (loaded < 1) {
                // Increase the progress bar length.
                // style.width = (loaded * 200) + "px";
            }
        }
    }

    function loaded(evt) {
        // Obtain the read file data.    
        var fileString = evt.target.result;
        
        // xhr.send(fileString)   
        //document.getElementById("dropspot").innerText = fileString;
        document.querySelector(".image").src = fileString;
    }

    function errorHandler(evt) {
        if (evt.target.error.name == "NotReadableError") {
            // The file could not be read.
        }
    }


    // Prevents the event from continuing so our handlers can process the event.
    function doNothing(event) {
        event.stopPropagation();
        event.preventDefault();
    }


})();
