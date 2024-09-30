import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	
}

export default class TOCPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();

		
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	getHeadings() {
		const activeMarkdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
			//console.log(activeMarkdownView);
			if(activeMarkdownView && activeMarkdownView.file){
				const headings = this.app.metadataCache.getFileCache(activeMarkdownView.file)?.headings;
				console.log("Headings received")
				return headings;
			} else{
				console.error("No active file at the moment")
				return null;
			}
	}
}


class SampleSettingTab extends PluginSettingTab {
	plugin: TOCPlugin;

	constructor(app: App, plugin: TOCPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();


	}
}
