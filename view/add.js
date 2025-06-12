document.getElementById("s-form").addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const roll = parseInt(document.getElementById("roll").value);
    const sclass = document.getElementById("class").value.trim();
    const marks = parseFloat(document.getElementById("marks").value);

    const msg = document.getElementById("msg");

fetch("http://localhost:3000/students", {
    method: "POST",
    headers:{
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name: name,
        rollNo: roll,
        class: sclass,
        marks: marks
    })
}).then(response => {
    if(!response.ok){
        throw new Error("Failed to add new entry.");
    }
    return response.json();
}).then(data => {
    msg.style.color = "green",
    msg.textContent = "Student entry added successfully!";
    document.getElementById("s-form").reset();
}).catch(error => {
    msg.style.color = "red",
    msg.textContent = "Failed to add new entry!";
    console.log(error);
})
});