const path = require("path");
const { app, Menu, shell } = require("electron");
const {
	is,
	appMenu,
	aboutMenuItem,
	openUrlMenuItem,
	openNewGitHubIssue,
	debugInfo
} = require("electron-util");
const config = require("../common/config");

const showPreferences = () => {
	// Show the app's preferences here
};

let helpSubmenu = [
	openUrlMenuItem({
		label: "Website",
		url: "https://exifcleaner.com"
	}),
	openUrlMenuItem({
		label: "Source Code",
		url: "https://github.com/szTheory/exifcleaner"
	}),
	{
		label: "Report an Issue…",
		click() {
			const body = `
<!-- Please succinctly describe your issue and steps to reproduce it. -->


---

${debugInfo()}`;

			openNewGitHubIssue({
				user: "szTheory",
				repo: "exifcleaner",
				body
			});
		}
	}
];

function aboutMenuIconPath() {
	if (is.linux) {
		return path.join(__dirname, "../../exifcleaner.png");
	} else {
		return path.join(__dirname, "static", "icon.png");
	}
}

if (!is.macos) {
	helpSubmenu.push(
		{
			type: "separator"
		},
		aboutMenuItem({
			website: "https://exifcleaner.com",
			icon: aboutMenuIconPath(),
			copyright: "Copyright © szTheory"
		})
	);
}

const debugSubmenu = [
	{
		label: "Show Settings",
		click() {
			config.openInEditor();
		}
	},
	{
		label: "Show App Data",
		click() {
			shell.openItem(app.getPath("userData"));
		}
	},
	{
		type: "separator"
	},
	{
		label: "Delete Settings",
		click() {
			config.clear();
			app.relaunch();
			app.quit();
		}
	},
	{
		label: "Delete App Data",
		click() {
			shell.moveItemToTrash(app.getPath("userData"));
			app.relaunch();
			app.quit();
		}
	}
];

const macosTemplate = [
	appMenu([
		// No preferences menu for now
		// {
		// 	label: "Preferences…",
		// 	accelerator: "Command+,",
		// 	click() {
		// 		showPreferences();
		// 	}
		// }
	]),
	{
		role: "fileMenu",
		submenu: [
			// {
			//   label: 'Custom'
			// },
			// {
			//   type: 'separator'
			// },
			{
				role: "close"
			}
		]
	},
	{
		role: "editMenu"
	},
	{
		role: "viewMenu"
	},
	{
		role: "windowMenu"
	},
	{
		role: "help",
		submenu: helpSubmenu
	}
];

// Linux and Windows
const otherTemplate = [
	{
		role: "fileMenu",
		submenu: [
			// {
			// 	label: "Custom"
			// },
			// {
			// 	type: "separator"
			// },
			// {
			// 	label: "Settings",
			// 	accelerator: "Control+,",
			// 	click() {
			// 		showPreferences();
			// 	}
			// },
			// {
			// 	type: "separator"
			// },
			{
				role: "quit"
			}
		]
	},
	{
		role: "editMenu"
	},
	{
		role: "viewMenu"
	},
	{
		role: "help",
		submenu: helpSubmenu
	}
];

const template = process.platform === "darwin" ? macosTemplate : otherTemplate;

if (is.development) {
	template.push({
		label: "Debug",
		submenu: debugSubmenu
	});
}

function buildMenu() {
	return Menu.buildFromTemplate(template);
}

const setupMenu = function() {
	Menu.setApplicationMenu(buildMenu());
};

module.exports = {
	setupMenu
};
