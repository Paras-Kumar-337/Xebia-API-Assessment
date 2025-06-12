document.addEventListener("DOMContentLoaded", () => {
    const sList = document.getElementById("s-list");

    fetch("http://localhost:3000/students").then(response => {
        if(!response.ok){
            throw new Error("Network Bad");
        }

        return response.json();
    }).then(students => {
        sList.innerHTML = "";

        if(students.length === 0){
            sList.textContent = "No entries found.";
            return;
        }

        students.forEach(student => {
            const sDiv = document.createElement("div");
            sDiv.className = "student";
            sDiv.innerHTML = `<h3>${student.name}</h3>
            <p><strong>Roll No.: </strong> ${student.rollNo}</p>
            <p><strong>Class: </strong> ${student.class}</p>
            <p><strong>Marks Obtained: </strong> ${student.marks}</p>`;
            sList.appendChild(sDiv);
        });
    }).catch(error => {
        sDiv.textContent = "Failed to load entries.";
        console.error("Error fetching details: ", error);
    })
});