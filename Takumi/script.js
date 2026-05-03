
function openApp(appId) {
    const appWindow = document.getElementById(appId);
    appWindow.style.display = "block";

    if (appId === "files") loadFiles();

    const taskbar = document.getElementById("taskApps");

    if (document.getElementById(`task-${appId}`)) return;

    const taskBtn = document.createElement("div");
    taskBtn.id = `task-${appId}`;
    taskBtn.innerText = appId;

    taskBtn.onclick = () => {
        appWindow.style.display = "block";
    };

    taskbar.appendChild(taskBtn);
}

function closeApp(appId) {
    document.getElementById(appId).style.display = "none";
}


// TO-DO
function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (!taskText) return; // Ignore empty input

    const taskItem = document.createElement("li");
    taskItem.textContent = taskText;

    // Click to remove task
    taskItem.onclick = () => taskItem.remove();

    document.getElementById("list").appendChild(taskItem);

    input.value = "";
}


// GALLERY
let uploadedImages = 0;
const MAX_IMAGES = 4;

function addImage() {
    const fileInput = document.getElementById("imgInput");
    const file = fileInput.files[0];

    if (!file) return;

    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);

    document.getElementById("galleryBox").appendChild(img);

    uploadedImages++;

    // Limit number of uploads
    if (uploadedImages >= MAX_IMAGES) {
        fileInput.style.display = "none";
        document.getElementById("uploadBtn").style.display = "none";
    }
}


// CLOCK
setInterval(() => {
    const now = new Date();

    document.getElementById("time").innerText =
        now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });

    document.getElementById("date").innerText =
        now.toLocaleDateString();
}, 1000);


// START MENU
function toggleMenu() {
    const menu = document.getElementById("startMenu");

    menu.style.display =
        menu.style.display === "block" ? "none" : "block";
}


// NOTES
function saveNote() {
    const noteText = document.getElementById("noteText").value;

    const savedNotes =
        JSON.parse(localStorage.getItem("notes")) || [];

    savedNotes.push(noteText);

    localStorage.setItem("notes", JSON.stringify(savedNotes));
}


// FILE SYSTEM
function loadFiles() {
    const fileList = document.getElementById("fileList");
    fileList.innerHTML = "";

    const savedNotes =
        JSON.parse(localStorage.getItem("notes")) || [];

    savedNotes.forEach((note, index) => {
        const item = document.createElement("li");
        item.innerText = `Note ${index + 1}`;

        item.onclick = () => {
            document.getElementById("noteText").value = note;
            openApp("notes");
        };

        fileList.appendChild(item);
    });
}


// DRAG WINDOWS
document.querySelectorAll(".window").forEach(windowEl => {
    const header = windowEl.querySelector(".title");

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    header.onmousedown = (e) => {
        isDragging = true;
        offsetX = e.clientX - windowEl.offsetLeft;
        offsetY = e.clientY - windowEl.offsetTop;
    };

    document.onmousemove = (e) => {
        if (!isDragging) return;

        windowEl.style.left = `${e.clientX - offsetX}px`;
        windowEl.style.top = `${e.clientY - offsetY}px`;
    };

    document.onmouseup = () => {
        isDragging = false;
    };
});


// WALLPAPER
const wallpapers = [
    "Images/wallpaper1.jpg",
    "Images/wallpaper2.jpg"
];

function changeWallpaper() {
    const randomIndex = Math.floor(Math.random() * wallpapers.length);

    document.body.style.background =
        `url('${wallpapers[randomIndex]}') no-repeat center center/cover`;
}