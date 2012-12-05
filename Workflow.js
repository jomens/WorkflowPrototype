/// <reference path="jquery-1.7.1.min.js" />


(function () {
    'use strict'

    var Workflow = function () {
        this.container = $(".container");
        this.currStep = 1;
        this.width = this.container.width();
        var that = this;
        //set width of reel
        var reel = $(".reel");
        reel.height(this.container.height());
        reel.width($(".step").length * this.width);
    }
    Workflow.prototype.setup = function () {
        var that = this;
       var numSteps = $(".step").length
        var reel = $(".reel");
        $(".back, .next").click(function (e) {
            
            var nextClicked = e.target.className === "next";

            if (that.currStep === numSteps) {
                if (nextClicked) return;
            }
            if (that.currStep === 1) {
                if (!nextClicked) return;
            }

            reel.animate({ "left":  nextClicked ? "-=500px" : "+=500px" }, 800, "easeOutBack", function () {
                    nextClicked ? that.currStep++ : that.currStep--;                        
                });
            
        });

    };

    $(document).ready(function () {
        new Workflow().setup();
    });

})();