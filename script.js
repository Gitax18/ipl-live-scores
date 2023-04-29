// getting elements
let lists = document.getElementById("matches");
let theme = document.querySelector('button');
let body = document.querySelector('body');
let list = document.querySelector('ul')


theme.addEventListener('click' , ()=>{
    if (theme.innerHTML == 'Light'){
        theme.innerHTML = 'Dark'
        theme.style.backgroundColor = '#1b1c1e'
        theme.style.color = '#eee'
        body.style.backgroundColor = '#eee'
        body.style.color = '#1b1c1e'
        list.style.color = '#1b1c1e'

    } else{
        theme.innerHTML = 'Light'
        theme.style.backgroundColor = '#eee'
        theme.style.color = '#1b1c1e'
        body.style.backgroundColor = '#1b1c1e'
        body.style.color = '#eee'
        list.style.color = '#ddd'
    }
})


async function getMatchData() {

    return await fetch("https://api.cricapi.com/v1/currentMatches?apikey=ec899aac-5f4a-4f5d-9c56-5df4f57b7462&offset=0")
        .then(data => data.json())
        .then(data => {
            if (data.status != "success")return;

            const matchesList = data.data;

            if(!matchesList)return [];
            
            //add your api key from cricketdata.org
            const relevantData = matchesList.filter(match => match.series_id == "c75f8952-74d4-416f-b7b4-7da4b4e3ae6e").map(match => `${match.name}, ${match.status}`);

            console.log({relevantData});

            lists.innerHTML = relevantData.map(match => `<li>${match} </li> <br>`).join('');

            return relevantData;

        })
        .catch(e => console.log(e));
}

getMatchData();

