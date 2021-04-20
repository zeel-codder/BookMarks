const list = document.querySelector('.List');
const ListUL = document.querySelector('.ListUl');
const Url = document.querySelector('#url');
const UrlName = document.querySelector('#urlname');
const AddBookMarks = document.querySelector('.add-bookmark');

let UrlList = list.querySelectorAll("p");

let ListArray = [];



function isBookMarkExits(url, text1) {
    UrlList = list.querySelectorAll("p");
    const NameList = list.querySelectorAll("a");
    for (let i = 0; i < UrlList.length; i++) {
        // const tem=url.toLowerCase();
        // console.log(NameList[i].text.toLowerCase(),text1.toLowerCase())
        if (UrlList[i].dataset.url === url) {
            return false;
        }
        if ((NameList[i].text.toLowerCase()).trim() == text1.toLowerCase().trim()) {
            return false;
        }
    }
    // console.log(yes);
    return true;

}


function AddBookMark(e) {
    e.preventDefault();
    const url = Url.value;
    const u = new URL(url);
    const text = UrlName.value;

    if (isBookMarkExits(url, text)) {

        const domain = u.hostname;
        console.log(u);

        const item = {
            url,
            domain,
            text,
            time: new Date().getTime()
        }


        // const getIcon=GetIcon(url);

        ListArray.push(item);
        localStorage.setItem('MyBookMark', JSON.stringify(ListArray));
        Url.value = "";
        UrlName.value = "";
        ShowAddBookMarks();
        AddListByLocal()
        UpdateList();
    } else {
        alert('Url Exits');
    }
}


function AddListByLocal() {

    ListArray = JSON.parse(localStorage.getItem('MyBookMark'));

    if (!ListArray || ListArray === []) {
        ListArray = [];
        return;
    }

    UpdateBookMarksList(ListArray);
}

function UpdateBookMarksList(List) {

    const text = List.map((data) => {

        const { url, text, domain } = data;

        return `
        <p data-url=${url} title=${url} >
        <span
        class="bg"
        style="
        background: url(https://www.google.com/s2/favicons?domain=${domain});
        background-repeat: no-repeat;
    background-position-y: center;
    background-size: 19px;
    object-fit: cover;
    width: 15%;
    margin: 0px 0rem;
    "    
    >
    </span>
    <a href=${url}>${text} </a></p>    
    `
    }).join(' ')

    ListUL.innerHTML = text;

}




function Sort(e) {
    e.preventDefault();

    if (!ListArray) return;

    const section = document.querySelector("#sort-section").value;

    let newArray = [];
    console.log(section)

    if (section == 'time') {
        newArray = ListArray.sort((a, b) => b.time - a.time);

    } else if (section == 'text') {
        newArray = ListArray.sort((a, b) => a.text.localeCompare(b.text))

    }
    console.log(newArray);

    UpdateBookMarksList(newArray);
    console.log(section);



}


function Search(e) {

    if (!e.target.value) {
        UpdateBookMarksList(ListArray);
        return;
    }
    const arr = findMatches(e.target.value);

    UpdateBookMarksList(arr);

}

function findMatches(wordToMatch) {
    return ListArray.filter(place => {
        // here we need to figure out if the city or state matches what was searched
        const regex = new RegExp(wordToMatch, 'gi');
        return place.text.match(regex);
    });
}

function UpdateList() {
    UrlList = list.querySelectorAll("p");
    AddEventInUrlList();
}


function AddEventInUrlList() {
    if (UrlList) {
        UrlList.forEach((data) => data.addEventListener('click', (e) => {
            location.replace(e.target.dataset.url);
        }));
    }
}


function ShowAddBookMarks(e) {
    console.log('i am call');
    if(window.innerWidth<1200){
        AddBookMarks.classList.toggle('showDiv');

    }
}

UpdateList();
AddListByLocal();
// document.querySelector('.btn').addEventListener('click',AddUrl);

document.querySelector("#search").addEventListener('click', Search);
document.querySelector("#search").addEventListener('keyup', Search);
