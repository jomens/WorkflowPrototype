/// <reference path="jquery-1.7.1.min.js" />


(function () {
    'use strict'
    //List Item
    var ListItem = function (options) {
        this.content = options.content;
        var cell = 100;
        var margin = 10;
        this.cellHeight = options.cellHeight || cell;
        this.cellWidth = options.cellWidth || cell;
        this.cellMargin = options.cellMargin || margin;
        this.backgroundColor = options.backgroundColor || "#97948b";
    };
    ListItem.prototype.render = function() {
            var element = document.createElement("div");
            element.className = "item";
            element.style.backgroundColor = this.backgroundColor;
            element.style.pixelHeight = this.cellHeight;
            element.style.pixelWidth = this.cellWidth;
            element.innerText = this.content;
            return element;
    };

    //GroupedItems
    var ItemGroup = function (group, options) {
        this.options = options;
        this.listItems = group.items.map(function (item){ return new ListItem({content: item, cellHeight: options.cellHeight, cellWidth: options.cellWidth, backgroundColor: options.backgroundColor })}); //array of list items
        this.title = group.title;
        //this.groupTitleRenderer = options.groupTitleRenderer;
    };
    ItemGroup.prototype.render = function () {
        //render group title
        var groupElement = document.createElement("div");
        groupElement.className = "group";
        groupElement.style.pixelHeight = 600;
       
        var title = document.createElement("h3");
        title.className = "groupTitle";
        title.innerText = this.title;
        title.style.pixelHeight = 50;
        groupElement.appendChild(title);

        var itemsContainer = document.createElement("div");
        itemsContainer.className = "itemscontainer";
        itemsContainer.style.pixelHeight = 500;
        this._positionElements(itemsContainer, this.listItems);
        groupElement.appendChild(itemsContainer);
        
        return groupElement;

    };
    ItemGroup.prototype._positionElements = function(container, elements) {
        var that = this.options;
        var row;
        var column = 0;
        var item;
        for (var x = 0; x < elements.length; x++) {
            row = Math.floor(x % that.maxRows);
            item = elements[x].render();
            item.style.left = (column + 1) * that.cellMargin + column * that.cellWidth + "px";
            item.style.top = (row + 1) * that.cellMargin + row * that.cellHeight + "px";
            container.appendChild(item);

            if (row === that.maxRows - 1)
                column++;
        }

    };
    

    var Listview = function(options) {
        this.options = options;
        this.container = $(".listview");
        this.groups = options.groups || [];
        this.maxRows = options.maxRows || 3;
        this.itemRenderer = options.itemRenderer;

        var cell = 100;
        var margin = 10;
        this.cellHeight = options.cellHeight || cell;
        this.cellWidth = options.cellWidth || cell;
        this.cellMargin = options.cellMargin || margin;
        this.backgroundColor = options.backgroundColor || "#97948b";

    };
    Listview.prototype.render = function () {
        var that = this;
        //var elements = [];
        var groups = [];
        //this.items.forEach(function (item) {
        //    elements.push(that._renderCell(item));
        //});
        
        this.groups.forEach(function (group) {
            groups.push(new ItemGroup(group, that.options));
        });

        groups.forEach(function(group) {
            that.container.append(group.render());
        });

    };


    $(document).ready(function () {
        new Listview({
            groups: [{ title: "Group A", items: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
            { title: "Group B", items: [1, 2, 3, 4, 5, 6] }],
            cellWidth: 150,
            cellHeight: 150,
            cellMargin: 10,
            backgroundColor: "#97948b",
            maxRows: 3
            
        }).render();
    });

})();