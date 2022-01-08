document.querySelectorAll(".confirmation-form")?.forEach(form => {
    const message = form.dataset.message
    form.addEventListener("submit", event => {
        respose = confirm(message)
        if (!respose) {
            event.preventDefault();
        }
    })
})

// Fetch Rooms
const fetchAvailableRooms = (element, outputElementId) => {
    const output = document.getElementById(outputElementId)
    output.innerHTML = null

    if (element.value) {
        const url = `/ajax/v1/${element.value}/beds`;
        fetch(url)
            .then(response => response.json())
            .then(json => {
                json["bed_values"].forEach(bed => {
                    const option = document.createElement("option")
                    option.value = bed[0]
                    option.innerText = bed[1]
                    output.appendChild(option)
                })
            })
            .catch(err => alert('Request Failed ' + err));
    } else {
        const option = document.createElement("option")
        option.innerText = "No bed"
        option.setAttribute("selected", "")
        output.appendChild(option)
    }
}