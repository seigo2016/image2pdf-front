// import Sortable = require("sortablejs");
import Sortable from "sortablejs";
const dragFileList = document.getElementById("drag-file-list")!;
const inputFiles = document.getElementById("input-files")!;
const resultLink = document.getElementById("result")! as HTMLAnchorElement;

let sortable = Sortable.create(dragFileList);
const inputFileName = document.getElementById(
  "input-file-name"
)! as HTMLInputElement;
const submitButton = document.getElementById("submit-button")!;

function createFileElement(file: File): HTMLElement {
  let reader = new FileReader();
  let dataUrl: string;
  let li = document.createElement("li");
  li.classList.add("file-item", "mt-1");
  let dev = document.createElement("div");
  dev.classList.add("flex", "md:w-1/2", "m-auto");
  let deleteButton = document.createElement("button");
  deleteButton.classList.add(
    "bg-red-400",
    "hover:bg-red-700",
    "text-white",
    "m-2",
    "px-2",
    "py-1",
    "rounded",
    "h-8"
  );
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", function () {
    li.remove();
  });
  let img = document.createElement("img");
  img.classList.add(
    "mx-2",
    "md:w-2/3",
    "w-3/4",
    "border",
    "p-2",
    "rounded",
    "image-item"
  );
  reader.onload = function () {
    dataUrl = reader.result as string;
    img.src = dataUrl;
    dev.appendChild(img);
    dev.appendChild(deleteButton);
  };
  reader.readAsDataURL(file);

  li.appendChild(dev);
  return li;
}

function onChange(event: any) {
  let files = event.target.files;
  for (let file of files) {
    let li = createFileElement(file);
    dragFileList.appendChild(li);
  }
}

function URItoBlob(dataURI: string) {
  const byteString = atob(dataURI.split(",")[1]);
  const mimeType = dataURI.match(/:([a-z\/\-]+);/)![1];
  let buffer = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    buffer[i] = byteString.charCodeAt(i);
  }
  return new Blob([buffer], { type: mimeType });
}

submitButton.addEventListener("click", function () {
  let formData = new FormData();
  const filename = inputFileName.value;
  let imageItem = document.getElementsByClassName(
    "image-item"
  )! as HTMLCollectionOf<HTMLImageElement>;
  for (let i = 0; i < imageItem.length; i++) {
    const dataURI = imageItem[i].src as string;
    const blob = URItoBlob(dataURI);
    formData.append("files", blob);
    formData.append("filename", filename);
  }
  fetch("https://api.img2pdf.seigo2016.com/convert", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.blob())
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      console.log(url);
      console.log(filename);
      resultLink.href = url;
      resultLink.innerText = "クリックしてダウンロード";
      resultLink.download = filename + ".pdf";
      resultLink.classList.remove("hidden");
    });
});

inputFiles.addEventListener("change", onChange, false);
