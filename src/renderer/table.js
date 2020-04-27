const path = require("path");
const { selectedFilesList } = require("./selected_files");

function updateRowWithExif({ tdNode, exifData }) {
	// td
	tdNode.textContent = "";

	// label
	const exifCount = Object.keys(exifData).length;
	const label = exifCount;

	// text
	const textNode = document.createElement("div");
	textNode.textContent = label;
	textNode.classList.add("popover", "popover-bottom");
	tdNode.appendChild(textNode);

	if (exifCount > 0) {
		// popover container
		const popoverContainerNode = document.createElement("div");
		popoverContainerNode.classList.add("popover-container");
		textNode.appendChild(popoverContainerNode);
		// card
		const cardNode = document.createElement("div");
		cardNode.classList.add("card");
		popoverContainerNode.appendChild(cardNode);
		// card body
		const cardBodyNode = document.createElement("div");
		cardBodyNode.classList.add("card-body");
		cardBodyNode.innerHTML = buildExifString({ exifData: exifData });
		cardNode.appendChild(cardBodyNode);
	}
}

function buildExifString({ exifData }) {
	let str = "";
	for (const [key, value] of Object.entries(exifData)) {
		str += key + " " + "<strong>" + value + "</strong>" + "<br>";
	}
	return str;
}

function updateRowWithCleanerSpinner({ trNode }) {
	// td
	const tdNode = trNode.querySelector("td:nth-child(3)");
	// spinner
	const spinnerNode = document.createElement("div");
	spinnerNode.classList.add("loading");
	tdNode.appendChild(spinnerNode);
}

function addTableRow({ filePath }) {
	const label = path.basename(filePath);

	// tr node
	const trNode = document.createElement("tr");

	// td name node
	const tdNode = document.createElement("td");
	tdNode.setAttribute("title", label);
	trNode.appendChild(tdNode);

	// td icon
	const iconNode = document.createElement("i");
	iconNode.classList.add("icon", "icon-photo");
	tdNode.appendChild(iconNode);

	// td text
	var textSpanNode = document.createElement("span");
	textSpanNode.textContent = " " + label;
	textSpanNode.classList.add("file-path");
	tdNode.appendChild(textSpanNode);

	// td num exif before node
	const tdNumExifBeforeNode = document.createElement("td");
	// tdNumExifBeforeNode.setAttribute("align", "center")
	// spinner
	const tdNumExifBeforeSpinner = document.createElement("span");
	tdNumExifBeforeSpinner.classList.add("loading");
	tdNumExifBeforeNode.appendChild(tdNumExifBeforeSpinner);
	// append
	trNode.appendChild(tdNumExifBeforeNode);

	// td num exif after node
	const tdNumExifAfterNode = document.createElement("td");
	trNode.appendChild(tdNumExifAfterNode);

	// add tr to list
	selectedFilesList().appendChild(trNode);

	return trNode;
}

module.exports = {
	addTableRow,
	updateRowWithExif,
	updateRowWithCleanerSpinner
};
