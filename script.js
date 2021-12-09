"use strict";

import {apiKey} from './secret.js';

//get the base elements and create the container for new ones
const root = document.getElementById('container');
const cardContainer = document.createElement('div');
cardContainer.className = "card_container";
root.appendChild(cardContainer);
//get all the different buttons
const artsBtn = document.getElementById('artsButt');
const scienceBtn = document.getElementById('scienceButt');
const fashionBtn = document.getElementById('fashionButt');
const politicsBtn = document.getElementById('politicsButt');
const techBtn = document.getElementById('techButt');
const travelBtn = document.getElementById('travelButt');
const homeBtn = document.getElementById('homeButt');

//different API links for different sections
const artsUrl = "https://api.nytimes.com/svc/topstories/v2/arts.json?api-key="+apiKey;
const scienceUrl = "https://api.nytimes.com/svc/topstories/v2/science.json?api-key="+apiKey;
const fashionUrl = "https://api.nytimes.com/svc/topstories/v2/fashion.json?api-key="+apiKey;
const politicsUrl = "https://api.nytimes.com/svc/topstories/v2/politics.json?api-key="+apiKey;
const techUrl = "https://api.nytimes.com/svc/topstories/v2/technology.json?api-key="+apiKey;
const travelUrl = "https://api.nytimes.com/svc/topstories/v2/travel.json?api-key="+apiKey;
const homeUrl = "https://api.nytimes.com/svc/topstories/v2/home.json?api-key="+apiKey;

const articles = async (url, color) => {
    try {
        const res = await fetch(url);
        const article = await res.json();
        //console.log(url);
        removeAllChildren(cardContainer);
        printCards(article);
        changeColor(color);
    } catch(error){
        console.log(error);
    }
};
articles(homeUrl, "white");

artsBtn.addEventListener("click", function() { 
    articles(artsUrl, "red")
    }, false);
scienceBtn.addEventListener("click", function() { 
    articles(scienceUrl, "blue")
    }, false);
fashionBtn.addEventListener("click", function() { 
    articles(fashionUrl, "green")
    }, false);
politicsBtn.addEventListener("click", function() { 
    articles(politicsUrl, "yellow")
    }, false);
techBtn.addEventListener("click", function() { 
    articles(techUrl, "cyan")
    }, false);
travelBtn.addEventListener("click", function() { 
    articles(travelUrl, "purple")
    }, false);
homeBtn.addEventListener("click", function() { 
    articles(homeUrl, "white")
    }, false); 

function printCards(stories){
    stories.results.forEach(el => {
        if(el.section != "admin"){
            createCard(el);
        }   
    });
    
}

function removeAllChildren(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

function createCard(story){
    const card = document.createElement('div');
    const section = document.createElement('p');
    const image = document.createElement('img');
    const textContainer = document.createElement('div');
    const title = document.createElement('h3');
    const subtext = document.createElement('p');
    const readMore = document.createElement('a');
    card.className = "card";
    section.classList = "section color";
    section.innerText = story.section.toUpperCase();
    image.className = "card_image";
    //console.log(story.multimedia[0].url);
    image.src = story.multimedia[0].url;
    textContainer.className = "card_text_container";
    title.className = "card_title";
    title.innerText = story.title;
    subtext.className = "abstract";
    subtext.innerText = story.abstract;
    readMore.className = "read_more";
    readMore.innerText = "Read More...";
    readMore.href = story.url;
    readMore.target = "blank";
    textContainer.appendChild(title);
    textContainer.appendChild(subtext);
    textContainer.appendChild(readMore);
    card.appendChild(section);
    card.appendChild(image);
    card.appendChild(textContainer);
    cardContainer.appendChild(card);
}

function changeColor(color){
    let elem = document.getElementsByClassName("color");
    for (let i = 0; i < elem.length; i++){
        elem[i].style.backgroundColor = color;
    }
    

}