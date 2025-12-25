const createElements = (arr) => {
    console.log(arr);
    const htmlElements = arr.map((Element) => `<span class = "btn"> ${Element}</span>`)
    return (htmlElements.join(" "));
};

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}
const manageSpinner = (ststus) => {
    const manageSpinner = (status) => {  
    if (status === true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    } else {
        document.getElementById("word-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
};


}



const loadLessons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(response => response.json())
    .then((json) => displayLesson(json.data) )
}

const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn")
    // console.log(lessonButtons)
lessonButtons.forEach(btn => btn.classList.remove("active"))
}

const loadLevelWord = (id) => {
    manageSpinner(true)
    // console.log(id)
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    // console.log(url)
    fetch(url)
    .then(response => response.json())
    .then((json) => {
        removeActive();  //remove all active class
        const clickBtn = document.getElementById(`lesson-btn-${id}`)
        clickBtn.classList.add("active")    //add active class
        displayLevelWord(json.data)

    })
     return;
}


// {
//     "word": "Sincere",
//     "meaning": "সত্‍ / আন্তরিক",
//     "pronunciation": "সিনসিয়ার",
//     "level": 1,
//     "sentence": "He gave a sincere apology.",
//     "points": 1,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "honest",
//         "genuine",
//         "truthful"
//     ],
//     "id": 19
// }
const loadWordDetail = async(id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    // console.log(url)
    const response = await fetch(url);
    const details = await response.json()
    displayWordDetails(details.data);
    // console.log(details.data)

}
const displayWordDetails = (word) => {
    console.log(word)
    const detailsBox = document.getElementById('details-container');
    detailsBox.innerHTML = `                
    <div class="">
                    <h2 class="text-2xl font-bold">${word.word} ( <i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})
                    </h2>
                </div>
                <div class="">
                    <h2 class=" font-bold">Meaning </h2>
                    <p>${word.meaning}</p>
                </div>
                <div class="">
                    <h2 class=" font-bold">Example</h2>
                    <p>${word.sentence}</p>
                </div>
                <div class="">
                    <h2 class=" font-bold">synonym</h2>
                    <div class="">${createElements(word.synonyms)}</div>

                </div>
                <div class="modal-action">
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn">Close</button>
                </form>
            </div>
                    `;
    document.getElementById('word_modal').showModal();
}



const displayLevelWord = (words) => {
    // console.log(words)
    const wordContainer = document.getElementById('word-container')
    wordContainer.innerHTML = '';

    if(words.length == 0) {
        // alert("No word tetected");
        wordContainer.innerHTML = `        
        <div class="text-center  col-span-full rounded-xl py-10 space-y-6 ">
            <img class = "mx-auto" src="assets/alert-error.png" alt="">
            <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="text-4xl font-medium font-bangla">নেক্সট Lesson এ যান</h2>
        </div>`;
        manageSpinner(false);
        return;
    }

    // {
    // "id": 52,
    // "level": 3,
    // "word": "Bewilder",
    // "meaning": "বিভ্রান্ত করা",
    // "pronunciation": "বিওয়াইল্ডার"
    // }

    words.forEach(word => {
        console.log(word)
        const card = document.createElement('div')
        card.innerHTML = `        
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4  h-[372px]>
            <h2 class="text-3xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি "}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি" } / ${word.pronunciation ? word.pronunciation : ' pronunciation পাওয়া যায়নি ' }"</div>
            <div class="flex justify-between items-center">
                <button onclick = "loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button onclick ="pronounceWord('${word.word}')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>`
        
        wordContainer.append(card)
    });
    manageSpinner(false)
    

};
const displayLesson = (lessons) => {
    console.log(lessons)
    const levelContainer = document.getElementById('level-container')
    levelContainer.innerHTML = '';

    for(let lesson of lessons) {
        const btnDiv = document.createElement('div')
        btnDiv.innerHTML = `<button id = "lesson-btn-${lesson.level_no}" onclick = "loadLevelWord( ${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
        </button>`

        levelContainer.appendChild(btnDiv)
        

    }
    


}
    

loadLessons()
document.getElementById("btn-search").addEventListener("click", () => {
    removeActive();

    const input = document.getElementById("input-search")
    const searchValu = input.value 
    console.log(searchValu)
    

    fetch("https://openapi.programming-hero.com/api/words/all")
    .then(response => response.json())
    .then(data => {
        allWords = data.data;
        console.log(allWords);
        const q = (searchValu || '').trim().toLowerCase();
        const filterWords = allWords.filter(w => (w.word || w.text || '').toLowerCase().includes(q));
        displayLevelWord(filterWords);
    });

    
    // fetch("https://openapi.programming-hero.com/api/words/all")
    // .then(response => response.json())
    // .then(data => {
    //     allWords = data.data;
    //     console.log(allWords);
    //     const filterWords = ;
    // });
    
    
});
