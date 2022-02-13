export default function getChartOptions(history, type) {
	const labels = []
	const values = []
	
	history.forEach((el) =>{ 
		labels.push(el.time_open.slice(0,8))
		values.push(el.price_close)
	 })

	 return {
		options: {
			responsive: true,
			plugins: {
				legend: {
					position: 'top',
				},
			},
		},

		params: {
			labels,
			datasets: [
				{
					label: type,
					data: values,
					borderColor: 'rgb(255, 99, 132)',
					backgroundColor: 'rgba(255, 99, 132, 0.5)',
				},
			],
		},
	};
}
