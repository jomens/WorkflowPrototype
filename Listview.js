/// <reference path="jquery-1.7.1.min.js" />


(function () {
    'use strict'
    //List Item
    var ListItem = function (options) {
        this.content = options.content;
        this.renderer = options.renderer;
    };
    ListItem.prototype.render = function () {
        if (this.renderer)
            return this.renderer(this.content);
        return "renderer not available";
    }

    //GroupedItems
    var ItemGroup = function (options) {
        this.items = options.items; //array of list items
        this.groupTitle = options.groupTitle;
        this.groupTitleRenderer = options.groupTitleRenderer;
    }
    ItemGroup.prototype.render = function () {
        //render group title

        //render items

        //fix group margins
    };

    var Listview = function (options) {
        this.container = $(".listview");
        this.items = options.items || [];
        this.maxRows = options.maxRows || 3;
        this.itemRenderer = options.itemRenderer;

        var cell = 100;
        var margin = 10;
        this.cellHeight = options.cellHeight || cell;
        this.cellWidth = options.cellWidth || cell;
        this.cellMargin = options.cellMargin || margin;
        this.backgroundColor = options.backgroundColor || "#97948b";
        
    }
    Listview.prototype.render = function () {
        var that = this;
        var elements = [];
        this.items.forEach(function (item) {
            elements.push(that._renderCell(item));
        });

        that._positionElements(elements);
        that._setListviewHeight();
    };
    Listview.prototype._positionElements = function (elements) {
        var that = this;
        var row;
        var column = 0;
        var item;
        for (var x = 0; x < elements.length; x++) {
                row = Math.floor(x % that.maxRows);
                item = elements[x];
                item.style.left = (column + 1) * that.cellMargin + column * that.cellWidth + "px";
                item.style.top = (row + 1) * that.cellMargin + row * that.cellHeight + "px";
                that.container.append(item);

                if (row === (that.maxRows - 1))
                    column++;
        }

    };
       
    Listview.prototype._renderCell = function (item) {
        var element = document.createElement("div");
        element.className = "listview-item";
        element.style.backgroundColor = this.backgroundColor;
        element.style.pixelHeight = this.cellHeight;    
        element.style.pixelWidth = this.cellWidth;
        element.innerText = item;
        return element;
    };

    Listview.prototype._setListviewHeight = function () {
        this.container.height((this.maxRows + 1) * this.cellMargin + this.maxRows * this.cellHeight);
    };

    $(document).ready(function () {
        new Listview({
            items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            cellWidth: 200,
            
        }).render();
    });

})();