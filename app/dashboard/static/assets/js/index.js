$(function () {

	/* Dashboard content */
	$('#compositeline').sparkline('html', {
		lineColor: 'rgba(255, 255, 255, 0.6)',
		lineWidth: 2,
		spotColor: false,
		minSpotColor: false,
		maxSpotColor: false,
		highlightSpotColor: null,
		highlightLineColor: null,
		fillColor: 'rgba(255, 255, 255, 0.2)',
		chartRangeMin: 0,
		chartRangeMax: 20,
		width: '100%',
		height: 30,
		disableTooltips: true
	});
	$('#compositeline2').sparkline('html', {
		lineColor: 'rgba(255, 255, 255, 0.6)',
		lineWidth: 2,
		spotColor: false,
		minSpotColor: false,
		maxSpotColor: false,
		highlightSpotColor: null,
		highlightLineColor: null,
		fillColor: 'rgba(255, 255, 255, 0.2)',
		chartRangeMin: 0,
		chartRangeMax: 20,
		width: '100%',
		height: 30,
		disableTooltips: true
	});
	$('#compositeline3').sparkline('html', {
		lineColor: 'rgba(255, 255, 255, 0.6)',
		lineWidth: 2,
		spotColor: false,
		minSpotColor: false,
		maxSpotColor: false,
		highlightSpotColor: null,
		highlightLineColor: null,
		fillColor: 'rgba(255, 255, 255, 0.2)',
		chartRangeMin: 0,
		chartRangeMax: 30,
		width: '100%',
		height: 30,
		disableTooltips: true
	});
	$('#compositeline4').sparkline('html', {
		lineColor: 'rgba(255, 255, 255, 0.6)',
		lineWidth: 2,
		spotColor: false,
		minSpotColor: false,
		maxSpotColor: false,
		highlightSpotColor: null,
		highlightLineColor: null,
		fillColor: 'rgba(255, 255, 255, 0.2)',
		chartRangeMin: 0,
		chartRangeMax: 20,
		width: '100%',
		height: 30,
		disableTooltips: true
	});
	/* Dashboard content closed*/


	/* Apexcharts (#bar) */
	days = document.getElementById('bar').dataset.days.split('|');


	success = document.getElementById('bar').dataset.successful_transactions.split('|');
	let success_transactions_volumes = success.map(function (x) {
		return parseInt(x, 10);
	});

	pending = document.getElementById('bar').dataset.pending_transactions.split('|');
	let pending_transactions_volumes = pending.map(function (x) {
		return parseInt(x, 10);
	});

	failed = document.getElementById('bar').dataset.failed_transactions.split('|');
	let failed_transactions_volumes = failed.map(function (x) {
		return parseInt(x, 10);
	});

	var optionsBar = {
		chart: {
			height: 355,
			type: 'bar',
			toolbar: {
				show: false,
			},
			fontFamily: 'Nunito, sans-serif',
		},
		colors: ["#036fe7", '#f93a5a', '#f7a556'],
		plotOptions: {
			bar: {
				dataLabels: {
					enabled: false
				},
				columnWidth: '42%',
				endingShape: 'rounded',
			}
		},
		dataLabels: {
			enabled: false
		},
		stroke: {
			show: true,
			width: 2,
			endingShape: 'rounded',
			colors: ['transparent'],
		},
		responsive: [{
			breakpoint: 576,
			options: {
				stroke: {
					show: true,
					width: 1,
					endingShape: 'rounded',
					colors: ['transparent'],
				},
			},


		}],
		series: [{
			name: 'Successful',
			data: success_transactions_volumes,
		}, {
			name: 'Failed',
			data: failed_transactions_volumes,
		}, {
			name: 'Pending',
			data: pending_transactions_volumes,
		}],
		xaxis: {
			categories: days,
		},
		fill: {
			opacity: 1
		},
		legend: {
			show: false,
			floating: true,
			position: 'top',
			horizontalAlign: 'left',


		},

		tooltip: {
			y: {
				formatter: function (val) {
					return "GHC " + val;
				}
			}
		}
	}
	new ApexCharts(document.querySelector('#bar'), optionsBar).render();

	/* Apexcharts (#bar) closed */


	/* ApexCharts (#horicontal bar) | for account balance*/
	// let account_names = document.getElementById('hbar').dataset.account_names.split('|');
	// let balance = document.getElementById('hbar').dataset.account_balance.split('|');
	// // CONVERTING each element to int
	// let account_balance = balance.map(function (x) {
	// 	return parseInt(x, 10);
	// });

	// console.log(account_names);
	// console.log(account_balance);

	// var optionsHbar = {
	// 	series: [{
	// 		data: account_balance,
	// 	}],
	// 	chart: {
	// 		type: 'bar',
	// 		height: 300,
	// 	},
	// 	plotOptions: {
	// 		bar: {
	// 			borderRadius: 4,
	// 			horizontal: true,
	// 		}
	// 	},
	// 	dataLabels: {
	// 		enabled: false
	// 	},
	// 	xaxis: {
	// 		categories: account_names,
	// 		labels: {
	// 			formatter: function (value) {
	// 				// if (value > 999 && value < 1000000) {
	// 				// 	return (value / 1000).toFixed(1) + 'K'; // convert to K for valueber from > 1000 < 1 million 
	// 				// } else if (value > 1000000) {
	// 				// 	return (value / 1000000).toFixed(1) + 'M'; // convert to M for valueber from > 1 million 
	// 				// } else if (value < 900) {
	// 				// 	return value; // if value < 1000, nothing to do
	// 				// }
	// 				return value;
	// 			}
	// 		}
	// 	},
	// 	tooltip: {
	// 		y: {
	// 			formatter: function (val) {
	// 				return "GHC " + val;
	// 			}
	// 		}
	// 	}
	// };

	// var chart = new ApexCharts(document.querySelector("#hbar"), optionsHbar).render();
	/* horizontal bar ends */

	// DOUGHNUT CHART
	let account_names = document.getElementById('doughnut').dataset.account_names.split('|');
	let balance = document.getElementById('doughnut').dataset.account_balance.split('|');
	// CONVERTING each element to int
	let account_balance = balance.map(function (x) {
		return parseInt(x, 10);
	});
	var doughnutOptions = {
		series: account_balance,
		labels: account_names,
		colors: ['#5668E2', '#E25668', '#E28956', '#AEE256', 'violet', '#56E2CF', 'indigo'],
		chart: {
			type: 'donut',
		},
		tooltip: {
			y: {
				formatter: function (value) {
					return value + ' cedis';
				}
			}
		},
		responsive: [{
			breakpoint: 480,
			options: {
				chart: {
					width: 200
				},
				legend: {
					position: 'bottom'
				}
			}
		}]
	};

	var doughnutChart = new ApexCharts(document.querySelector("#doughnut"), doughnutOptions).render();


	/*--- Apex (#spark1) ---*/
	var spark1 = {
		chart: {
			id: 'spark1',
			group: 'sparks',
			type: 'line',
			height: 38,
			sparkline: {
				enabled: true
			},
			dropShadow: {
				enabled: true,
				top: 1,
				left: 1,
				blur: 1,
				opacity: 0.1,
			}
		},
		series: [{
			data: [25, 66, 41, 59, 25, 44, 12, 36, 9, 21]
		}],
		stroke: {
			curve: 'smooth'
		},
		markers: {
			size: 0
		},
		grid: {
			padding: {
				top: 10,
				bottom: 10,
				left: 50
			}
		},
		colors: ['#0a9ae1'],
		stroke: {
			width: 2
		},
		tooltip: {
			x: {
				show: false,
				width: 1,
			},
			y: {
				title: {
					formatter: function formatter(val) {
						return '';
					}
				}
			}
		}
	}
	/*--- Apex (#spark1) closed ---*/

	/*--- Apex (#spark2) ---*/
	var spark2 = {
		chart: {
			id: 'spark2',
			group: 'sparks',
			type: 'line',
			height: 38,
			sparkline: {
				enabled: true
			},
			dropShadow: {
				enabled: true,
				top: 1,
				left: 1,
				blur: 1,
				opacity: 0.1,
			}
		},
		series: [{
			data: [12, 14, 2, 47, 32, 44, 14, 55, 41, 69]
		}],
		stroke: {
			curve: 'smooth'
		},
		grid: {
			padding: {
				top: 10,
				bottom: 10,
				left: 50
			}
		},
		markers: {
			size: 0
		},
		colors: ['#ff516e'],
		stroke: {
			width: 2
		},
		tooltip: {
			x: {
				show: false
			},
			y: {
				title: {
					formatter: function formatter(val) {
						return '';
					}
				}
			}
		}
	}
	/*--- Apex (#spark2) closed ---*/

	/*--- Apex (#spark3) ---*/
	var spark3 = {
		chart: {
			id: 'spark3',
			group: 'sparks',
			type: 'line',
			height: 38,
			sparkline: {
				enabled: true
			},
			dropShadow: {
				enabled: true,
				top: 1,
				left: 1,
				blur: 1,
				opacity: 0.1,
			}
		},
		series: [{
			data: [47, 45, 74, 32, 56, 31, 44, 33, 45, 19]
		}],
		stroke: {
			curve: 'smooth'
		},
		markers: {
			size: 0
		},
		grid: {
			padding: {
				top: 10,
				bottom: 10,
				left: 50
			}
		},
		colors: ['#28b98a'],
		xaxis: {
			crosshairs: {
				width: 1
			},
		},
		stroke: {
			width: 2
		},
		tooltip: {
			x: {
				show: false
			},
			y: {
				title: {
					formatter: function formatter(val) {
						return '';
					}
				}
			}
		}
	}
	/*--- Apex (#spark3) closed ---*/

	/*--- Apex (#spark4) ---*/

	var spark4 = {
		chart: {
			id: 'spark4',
			group: 'sparks',
			type: 'line',
			height: 38,
			sparkline: {
				enabled: true
			},
			dropShadow: {
				enabled: true,
				top: 1,
				left: 1,
				blur: 1,
				opacity: 0.1,
			}
		},
		series: [{
			data: [15, 75, 47, 65, 14, 32, 19, 54, 44, 61]
		}],
		stroke: {
			curve: 'smooth'
		},
		markers: {
			size: 0
		},
		grid: {
			padding: {
				top: 10,
				bottom: 10,
				left: 50
			}
		},
		colors: ['#f48846'],
		xaxis: {
			crosshairs: {
				width: 1
			},
		},
		stroke: {
			width: 2
		},
		tooltip: {
			x: {
				show: false
			},
			y: {
				title: {
					formatter: function formatter(val) {
						return '';
					}
				}
			}
		}
	}
	/*--- Apex (#spark4) closed ---*/

	/*--- Apex (#spark5) ---*/
	var spark5 = {
		chart: {
			id: 'spark5',
			group: 'sparks',
			type: 'line',
			height: 38,
			sparkline: {
				enabled: true
			},
			dropShadow: {
				enabled: true,
				top: 1,
				left: 1,
				blur: 1,
				opacity: 0.1,
			}
		},
		series: [{
			data: [12, 25, 76, 35, 17, 43, 10, 26, 69, 31]
		}],
		stroke: {
			curve: 'smooth'
		},
		markers: {
			size: 0
		},
		grid: {
			padding: {
				top: 10,
				bottom: 10,
				left: 50
			}
		},
		colors: ['#673ab7'],
		xaxis: {
			crosshairs: {
				width: 1
			},
		},
		stroke: {
			width: 2
		},
		tooltip: {
			x: {
				show: false
			},
			y: {
				title: {
					formatter: function formatter(val) {
						return '';
					}
				}
			}
		}
	}


	new ApexCharts(document.querySelector("#spark1"), spark1).render();
	new ApexCharts(document.querySelector("#spark2"), spark2).render();
	new ApexCharts(document.querySelector("#spark3"), spark3).render();
	new ApexCharts(document.querySelector("#spark4"), spark4).render();
	new ApexCharts(document.querySelector("#spark5"), spark5).render();

	/*--- Apex (#spark5) closed ---*/

	/*--- Apex (#chart) ---*/
	var options = {
		chart: {
			height: 205,
			type: 'radialBar',
			offsetX: 0,
			offsetY: 0,
		},
		plotOptions: {
			radialBar: {
				startAngle: -135,
				endAngle: 135,
				size: 120,
				imageWidth: 50,
				imageHeight: 50,

				track: {
					strokeWidth: "80%",
					background: '#ecf0fa',
				},
				dropShadow: {
					enabled: false,
					top: 0,
					left: 0,
					bottom: 0,
					blur: 3,
					opacity: 0.5
				},
				dataLabels: {
					name: {
						fontSize: '16px',
						color: undefined,
						offsetY: 30,
					},
					hollow: {
						size: "60%"
					},
					value: {
						offsetY: -10,
						fontSize: '22px',
						color: undefined,
						formatter: function (val) {
							return val + "%";
						}
					}
				}
			}
		},
		colors: ['#0db2de'],
		fill: {
			type: "gradient",
			gradient: {
				shade: "dark",
				type: "horizontal",
				shadeIntensity: .5,
				gradientToColors: ['#005bea'],
				inverseColors: !0,
				opacityFrom: 1,
				opacityTo: 1,
				stops: [0, 100]
			}
		},
		stroke: {
			dashArray: 4
		},
		series: [83],
		labels: [""]
	};

	var chart = new ApexCharts(document.querySelector("#chart"), options);
	chart.render();
	/*--- Apex (#chart)closed ---*/

	/*--- Map ---*/
	$('#vmap2').vectorMap({
		map: 'usa_en',
		showTooltip: true,
		backgroundColor: '#fff',
		color: '#60adff',
		colors: {
			mo: '#9fceff',
			fl: '#60adff',
			or: '#409cff',
			ca: '#005cbf',
			tx: '#005cbf',
			wy: '#005cbf',
			ny: '#007bff'
		},
		hoverColor: '#222',
		enableZoom: false,
		borderWidth: 1,
		borderColor: '#fff',
		hoverOpacity: .85
	});
	/*--- Map closed ---*/

	$('.resp-tabs-list .index-valex').addClass('active');
	$('.second-sidemenu .index-valex').addClass('resp-tab-content-active');

});