function searchFunction() {
  var input, filter, list, i;
  input = document.getElementById("userInput");
  filter = input.value.toUpperCase();
  list = document.getElementsByClassName("productList");
  for (i = 0; i < list.length; i++) {
    prodName = list[i];
    if (prodName) {
      if (prodName.innerHTML.toUpperCase().indexOf(filter) > -1) {
        list[i].style.display = "";
      } else {
        list[i].style.display = "none";
      }
    }       
  }
}

function changeURL() {
  if (document.getElementsByClassName('type')[0].value == "item") {
    window.location = "http://localhost:3000/categories";
  } else if (document.getElementsByClassName('type')[0].value == "user") {
    window.location = "http://localhost:3000/user";
  }
}

$(document).ready(function() {
  if(window.location.href=="http://localhost:3000/categories") {
    document.getElementsByClassName('type')[0].value = "item";
    document.getElementById('filterAll').action = "/search"
  } else if (window.location.href=="http://localhost:3000/user" || window.location.href=="http://localhost:3000/searchuser") {
    document.getElementsByClassName('type')[0].value = "user";
    document.getElementById('filterAll').action = "/searchuser";
    document.getElementById('disappear').style.display = "none";
  }

})

function hideoption() {
  if (document.getElementById("male").checked) {
    document.getElementById("gone").style.display = "none";
    document.getElementById("gone1").style.display = "none";
    document.getElementById("gone2").style.display = "";
    document.getElementById("brandhide1").style.display = "none";
    document.getElementById("brandhide").style.display = "";
    document.getElementById("brandhide2").style.display = "none";
    document.getElementById("brandTypes1").value =  "";
    document.getElementById("brandTypes2").value =  "";
    
  } else if (document.getElementById("female").checked) {
    document.getElementById("gone").style.display = "";
    document.getElementById("gone1").style.display = "";
    document.getElementById("gone2").style.display = "none";
    document.getElementById("brandhide1").style.display = "";
    document.getElementById("brandhide").style.display = "none";
    document.getElementById("brandhide2").style.display = "none";
    document.getElementById("brandTypes").value =  "";
    document.getElementById("brandTypes2").value =  "";

  } else if (document.getElementById("allgender").checked) {
    document.getElementById("gone").style.display = "";
    document.getElementById("gone1").style.display = "";
    document.getElementById("gone2").style.display = "";
    document.getElementById("brandhide1").style.display = "none";
    document.getElementById("brandhide").style.display = "none";
    document.getElementById("brandhide2").style.display = "";
    document.getElementById("brandTypes").value =  "";
    document.getElementById("brandTypes1").value =  "";
  }
}

function clothing(){
  document.getElementById("categoriesTypes").selectedIndex =  1;
  document.getElementById("filterAll").submit();
}
function bag() {
  document.getElementById("categoriesTypes").selectedIndex =  2;
  document.getElementById("filterAll").submit();
}
function accessories() {
  document.getElementById("categoriesTypes").selectedIndex =  3;
  document.getElementById("filterAll").submit();
}
function watches() {
  document.getElementById("categoriesTypes").selectedIndex =  4;
  document.getElementById("filterAll").submit();
}
function shoes() {
  document.getElementById("categoriesTypes").selectedIndex =  5;
  document.getElementById("filterAll").submit();
}
function dresses() {
  document.getElementById("categoriesTypes").selectedIndex =  6;
  document.getElementById("filterAll").submit();
}
function jewellery() {
  document.getElementById("categoriesTypes").selectedIndex =  7;
  document.getElementById("filterAll").submit();
}

function burberry() {
  document.getElementById("brandTypes").selectedIndex =  1;
  document.getElementById("filterAll").submit();
}
function dior() {
  document.getElementById("brandTypes").selectedIndex =  2;
  document.getElementById("filterAll").submit();
}
function fendi() {
  document.getElementById("brandTypes").selectedIndex =  3;
  document.getElementById("filterAll").submit();
}
function givenchy() {
  document.getElementById("brandTypes").selectedIndex =  4;
  document.getElementById("filterAll").submit();
}
function gucci() {
  document.getElementById("brandTypes").selectedIndex =  5;
  document.getElementById("filterAll").submit();
}
function hermes() {
  document.getElementById("brandTypes").selectedIndex =  6;
  document.getElementById("filterAll").submit();
}
function louisvuitton() {
  document.getElementById("brandTypes").selectedIndex =  7;
  document.getElementById("filterAll").submit();
}
function valentino() {
  document.getElementById("brandTypes").selectedIndex =  8;
  document.getElementById("filterAll").submit();
}
function yvessaintlaurent() {
  document.getElementById("brandTypes").selectedIndex =  9;
  document.getElementById("filterAll").submit();
}
function balenciaga() {
  document.getElementById("brandTypes1").selectedIndex =  1;
  document.getElementById("filterAll").submit();
}
function celine() {
  document.getElementById("brandTypes1").selectedIndex =  2;
  document.getElementById("filterAll").submit();
}
function chloe() {
  document.getElementById("brandTypes1").selectedIndex =  3;
  document.getElementById("filterAll").submit();
}
function christian() {
  document.getElementById("brandTypes1").selectedIndex =  4;
  document.getElementById("filterAll").submit();
}
function louboutin() {
  document.getElementById("brandTypes1").selectedIndex =  5;
  document.getElementById("filterAll").submit();
}
function miumiu() {
  document.getElementById("brandTypes1").selectedIndex =  6;
  document.getElementById("filterAll").submit();
}