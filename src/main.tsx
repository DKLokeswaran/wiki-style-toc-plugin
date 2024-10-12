import {  HeadingCache, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { createRoot, Root } from 'react-dom/client';
import TOC from './components/TOC'


// interface MyPluginSettings {
// 	//TODO
// }

// const DEFAULT_SETTINGS: MyPluginSettings = {
// 	//TODO
// }

export default class TOCPlugin extends Plugin {
	//settings: MyPluginSettings;

	async onload() {
		// await this.loadSettings();
		  this.registerMarkdownCodeBlockProcessor("toc", (source, el, ctx) => {

			const root = createRoot(el);
			this.renderTOC(root,ctx.sourcePath);
			
			this.app.workspace.on('editor-change',()=> {
					this.renderTOC(root,ctx.sourcePath);			
			});	

		  });		
	}

	onunload() {

	}

	// async loadSettings() {
	// 	this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	// }

	// async saveSettings() {
	// 	await this.saveData(this.settings);
	// }

	getHeadings(path:string) {
		const currentFile = this.getFileByPath(path)
		if(currentFile){
			const headings = this.app.metadataCache.getFileCache(currentFile)?.headings;
			return headings;
		} else{
			console.error("No active file at the moment")
			return null;
		}
	}

	getFileByPath(path:string){
		return this.app.vault.getFileByPath(path)
	}

	renderTOC(root:Root,filePath:string){
		let headings:HeadingCache[]|undefined|null;
		headings=this.getHeadings(filePath)
		const file = this.getFileByPath(filePath)
		root.render(<TOC headings={headings} filePath={filePath}/>)
		if(headings===null && headings===undefined){
			console.log("No Heading:",headings);
		} 
	}
}


// class SampleSettingTab extends PluginSettingTab {
// 	plugin: TOCPlugin;

// 	constructor(app: App, plugin: TOCPlugin) {
// 		super(app, plugin);
// 		this.plugin = plugin;
// 	}

// 	display(): void {
// 		const {containerEl} = this;

// 		containerEl.empty();


// 	}
// }
