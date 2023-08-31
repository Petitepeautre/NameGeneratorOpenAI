// script.js

const form = document.getElementById("name-generator-form");
const generatedNamesDiv = document.getElementById("generated-names");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const race = form.race.value;
    const className = form.class.value;
    const gender = form.gender.value;
    const world = form.world.value;

    const prompt = `Generate 10 names of ${race} ${className} ${gender} characters in the world of ${world}.`;
    console.log(prompt);

    const temperatureRange = document.getElementById("temperatureRange");
    const temperature = parseFloat(temperatureRange.value);
    console.log(temperature);

    try {
        const response = await fetch("/generate-names", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: prompt,
                temperature: temperature,
            }),
        });

        const data = await response.json();
        console.log(data.names);
        displayGeneratedNames(data.names);
    } catch (error) {
        console.error("Error generating names:", error);
    }
});

function displayGeneratedNames(namesArray) {
    generatedNamesDiv.innerHTML = "";
    const namesString = namesArray[0].split('\n');
    const ul = document.createElement("ul");
    
    namesString.forEach((name) => {
        const li = document.createElement("li");
        li.textContent = name;
        ul.appendChild(li);
    });

    generatedNamesDiv.appendChild(ul);
}

temperatureRange.addEventListener("input", () => {
    const selectedValue = temperatureRange.value;
    const dataList = temperatureRange.list.options;

    for (const option of dataList) {
        if (option.value === selectedValue) {
            selectedTemperature.textContent = option.getAttribute("label");
            break;
        }
    }
});
