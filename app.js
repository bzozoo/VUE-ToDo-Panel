let Panels = {
	data() {
		return {
			disabled: false,
			panels: [],
			inputValue: "",
			secureDel: false
			}
		},
	methods: {
		editPanel(panelID) {
			let selectedpanel = document.getElementById('pc_' + panelID) 
			this.panels[panelID].content = selectedpanel.innerHTML
		},
		formatedDate(date) {
			return new Date(date).toLocaleString();
		},
		clearAllPanels() {
			console.log("Clearing panels...");
			this.panels = [];
			this.savePanels();
		},
		addPanel() {
			if (this.inputValue != "") {
				console.log("Add panel...");
				let now = new Date();
				this.panels.push({
					id: this.panels.length,
					content: this.inputValue,
					createdAt: now,
					editable: false,
					status: false
				});
				this.inputValue = "";
				this.savePanels();
			}
		},
		deletePanel(number) {
			console.log("Delete panel...");
			this.panels.splice(number, 1);
			this.savePanels();
		},

		savePanels() {
			console.log("Panels saved to storage..");
			let parsed = JSON.stringify(this.panels);
			localStorage.setItem("panels", parsed);
		}
	},
	computed: {},
	mounted() {
		if (localStorage.getItem("panels")) {
			try {
				this.panels = JSON.parse(localStorage.getItem("panels"));
			} catch (e) {
				localStorage.removeItem("panels");
			}
		}
	},

	watch: {
		panels: {
			handler() {
				localStorage.setItem("panels", JSON.stringify(this.panels));
			},

			deep: true
		}
	}
};

Vue.createApp(Panels).mount("#app");
