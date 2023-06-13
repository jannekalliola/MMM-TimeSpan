/* Magic Mirror
 * Module: MMM-TimeSpan
 *
 * By JanneKalliola
 */
Module.register("MMM-TimeSpan", {

	defaults: {
		updateUIInterval: 60 * 60,
		dateFormat: "yyyy-MM-dd"
	},

	getStyles: function() {
		return ["MMM-TimeSpan.css"];
	},
	
	start: function() {
		this.spans = [];
		this.initialiseSpans();
		this.scheduleUIUpdate();
	},

	initialiseSpans: function() {
		if(this.config.spans && this.config.spans.length > 0) {
			for(let i = 0; i < this.config.spans.length; i++) {
				let sp = this.config.spans[i];
				if(sp['start'] && sp['end'] && sp['title']) {
					let st = new Date(sp['start']);
					let en = new Date(sp['end']);
					if(!isNaN(st.valueOf()) && !isNaN(en.valueOf())) {
						this.spans.push({ start: st.getTime(),
										  startD: st,
										  end: en.getTime(),
										  endD: en,
										  len: en.getTime() - st.getTime(),
										  title: sp['title'] });
					}
				}
			}
		}
	},
	
	scheduleUIUpdate: function() {
		var self = this;
		setInterval(() => {
			self.updateDom();
        }, this.config.updateUIInterval * 1000);
		this.updateDom();
	},

	getDom: function() {
		var wrapper = document.createElement("div");
		wrapper.className = "MMM-TimeSpan";

		if(this.spans.length > 0) {
			let now = new Date();
			let currentTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), 0, 0, 0).getTime();
			for(let i = 0; i < this.spans.length; i++) {
				let llen = this.spans[i].end - currentTime;
				let percent = Math.min(100, (this.spans[i].len - llen) * 100 / this.spans[i].len);

				let timeSince = document.createElement("div");

				let dts = document.createElement("div");
				dts.className = "timeSinceDates";
				let dtSt = document.createElement("span");
				dtSt.className = "timeSinceDatesStart light";
				dtSt.innerHTML = this.formatDate(this.spans[i].startD, this.config.dateFormat);
				dts.appendChild(dtSt);
				let dtEn = document.createElement("span");
				dtEn.className = "timeSinceDatesEnd light";
				dtEn.innerHTML = this.formatDate(this.spans[i].endD, this.config.dateFormat);
				dts.appendChild(dtEn);
				timeSince.appendChild(dts);
				let title = document.createElement("span");
				title.className = "timeSinceTitle";
				title.innerHTML = this.spans[i].title;
				dts.appendChild(title);

				let bar = document.createElement("div");
				bar.className = "timeSinceBar";
				let barFiller = document.createElement("div");
				barFiller.className = "timeSinceProgress"
				barFiller.style.width = "" + percent + "%";
				bar.appendChild(barFiller);

				timeSince.appendChild(bar);

				wrapper.appendChild(timeSince);
			}
		}
		return wrapper;
	},

	// Date formatting code from https://stackoverflow.com/questions/3552461/how-do-i-format-a-date-in-javascript
	monthNames: [
		"January", "February", "March", "April", "May", "June", "July",
		"August", "September", "October", "November", "December"
	],

	dayOfWeekNames: [
		"Sunday", "Monday", "Tuesday",
		"Wednesday", "Thursday", "Friday", "Saturday"
	],
	
	formatDate: function(date, patternStr){
		if (!patternStr) {
			patternStr = 'M/d/yyyy';
		}
		var day = date.getDate(),
			month = date.getMonth(),
			year = date.getFullYear(),
			hour = date.getHours(),
			minute = date.getMinutes(),
			second = date.getSeconds(),
			miliseconds = date.getMilliseconds(),
			h = hour % 12,
			hh = this.twoDigitPad(h),
			HH = this.twoDigitPad(hour),
			mm = this.twoDigitPad(minute),
			ss = this.twoDigitPad(second),
			aaa = hour < 12 ? 'AM' : 'PM',
			EEEE = this.dayOfWeekNames[date.getDay()],
			EEE = EEEE.substr(0, 3),
			dd = this.twoDigitPad(day),
			M = month + 1,
			MM = this.twoDigitPad(M),
			MMMM = this.monthNames[month],
			MMM = MMMM.substr(0, 3),
			yyyy = year + "",
			yy = yyyy.substr(2, 2)
		;
		// checks to see if month name will be used
		patternStr = patternStr
			.replace('hh', hh).replace('h', h)
			.replace('HH', HH).replace('H', hour)
			.replace('mm', mm).replace('m', minute)
			.replace('ss', ss).replace('s', second)
			.replace('S', miliseconds)
			.replace('dd', dd).replace('d', day)
		
			.replace('EEEE', EEEE).replace('EEE', EEE)
			.replace('yyyy', yyyy)
			.replace('yy', yy)
			.replace('aaa', aaa);
		if (patternStr.indexOf('MMM') > -1) {
			patternStr = patternStr
				.replace('MMMM', MMMM)
				.replace('MMM', MMM);
		}
		else {
			patternStr = patternStr
				.replace('MM', MM)
				.replace('M', M);
		}
		return patternStr;
	},

	twoDigitPad: function(num) {
		return num < 10 ? "0" + num : num;
	}
});
