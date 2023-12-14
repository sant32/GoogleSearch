/*function search() {
    const searchme = document.getElementById('searchme');
    const query = searchme.value;

}*/

document.getElementById("searchme").addEventListener("keypress", function(event) {   
  if (event.key === "Enter") {
    event.preventDefault();
      document.getElementById("searchBtn").click();
  }
});

document.getElementById("searchme1").addEventListener("keypress", function(event) {   
  if (event.key === "Enter") {
    event.preventDefault();
      document.getElementById("searchBtn1").click();
  }
});

function search(textBoxIndex)
{
document.getElementById('hiddenGoogleDiv').style.display = "block";
document.getElementById('displayGoogleDiv').style.display = "none";
//displayGoogleDiv

let searchedText;
if(textBoxIndex == "0")
searchedText = document.getElementById('searchme');
else
searchedText = document.getElementById('searchme1');


var googleSearchApiResponse = 
fetch("https://www.googleapis.com/customsearch/v1?key=AIzaSyDQPM9KM1HpbdlDN22i6mKlEJ22QkXQ83k&cx=14b6b7e08929b4e34&q=" + searchedText.value +  "")
.then((response) => response.json())
.then((data) => readItems(data) );

console.log('googleSearchApiResponse-->');
console.log('googleSearchApiResponse-->1',googleSearchApiResponse);


}

function readItems(googleSearchApiResponse)
{
var googleSerchItems = googleSearchApiResponse.items;
var parentDivTag = document.getElementById('SearchedItems');

while (parentDivTag.hasChildNodes()) {
    parentDivTag.removeChild(parentDivTag.firstChild);
  }

console.log('googleSerchItems',googleSerchItems);

for(let i=0;i<googleSerchItems.length;i++)
{   
     const divTag = document.createElement("div");
     divTag.id="gSearchId_" + i;
     const liTag = document.createElement("li");
     const aTag = document.createElement("a");
     aTag.text = googleSerchItems[i].title;
     aTag.href = googleSerchItems[i].link;

     const imgTag = document.createElement("Img");
     let imgPath = "";
    for(let a=0;a<Object.values(googleSerchItems[i].pagemap.metatags[0]).length;a++)
    {
     let imgtext = Object.values(googleSerchItems[i].pagemap.metatags[0])[a];

      if( imgtext && (imgtext.includes(".jpg")
      || imgtext.includes(".png")))
      {
       imgPath = imgtext;
       break;
      }
     }

    imgTag.src=imgPath;
    imgTag.width="50";
    imgTag.height="50";

     aTag.appendChild(imgTag);
     liTag.appendChild(aTag);
     divTag.appendChild(liTag);

     document.getElementById('SearchedItems').appendChild(divTag);    
     
      
     

}
}