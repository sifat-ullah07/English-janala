//get synoname
const createElements = (arr) => {
    console.log(arr);
    const htmlElements = arr.map((Element) => `<span class = "btn"> ${Element}</span>`)
    console.log(htmlElements.join(" "));
}




const syn = [ 'jara', 'rahman', 'crystal']
createElements(syn);