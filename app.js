(function(){
'use strict';

angular.module('ShoppingListCheckOff',[])
.controller('ToBuyController',ToBuyController)
.controller('AlreadyBoughtController',AlreadyBoughtController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService);

ToBuyController.$inject=['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
  var to_buy =this;
  to_buy.listToBuy = ShoppingListCheckOffService.getToBuyItems();
  to_buy.toBuyItem = function(index){
      ShoppingListCheckOffService.bought(index)
      to_buy.listToBuy = ShoppingListCheckOffService.getToBuyItems();
  }

}

AlreadyBoughtController.$inject=['ShoppingListCheckOffService','$scope'];
function AlreadyBoughtController(ShoppingListCheckOffService,$scope){
    var bought = this;
    $scope.$watch(function () {    
      bought.listBought = ShoppingListCheckOffService.getBoughtItems();
    })
}

function ShoppingListCheckOffService(){
   var service = this;
   var to_buy =
   [
     {name: "cookies", quantity: 3},
     {name: "hamburgers", quantity: 1},
     {name: "beers", quantity: 2},
     {name: "candies", quantity: 2},
     {name: "soda", quantity: 3}
  ];
  var bought=[];
   service.bought = function(index){
     if(to_buy.length>0){
       bought.push(new Object(to_buy[index]));
       to_buy.splice(index,1);
     }
   }

   service.getToBuyItems = function(){
     return to_buy;
   }
   service.getBoughtItems = function(){
     return bought;
   }


}
})();
