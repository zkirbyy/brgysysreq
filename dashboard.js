document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('myPieChart').getContext('2d');

    // Initial data with all values set to zero
    const initialData = [0, 0, 0]; // Use 1 to ensure the segments are visible

    const myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Total', 'Pending', 'Approved'],
            datasets: [{
                data: initialData,
                backgroundColor: ['gray', 'gray', 'gray'],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom', // Move legend to the bottom
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw;
                        }
                    }
                }
            }
        }
    });

    // Function to update the chart and text based on input values
    function updateChart() {
        const pendingRequests = parseInt(document.getElementById('pendingRequests').textContent) || 0;
        const approvedRequests = parseInt(document.getElementById('approvedRequests').textContent) || 0;
        const totalRequests = pendingRequests + approvedRequests;

        myPieChart.data.datasets[0].data = totalRequests === 0 && pendingRequests === 0 && approvedRequests === 0
            ? [0, 1, 0] // Use 1 to ensure the segments are visible
            : [totalRequests, pendingRequests, approvedRequests];
        myPieChart.data.datasets[0].backgroundColor = totalRequests === 0 && pendingRequests === 0 && approvedRequests === 0
            ? ['#6181D6', '#BDBDBD', '#48742C']
            : ['#6181D6', '#BDBDBD', '#48742C'];
        myPieChart.update();
    }

    // Update the chart when the page loads
    updateChart();

    // Add event listeners to update the chart when the text content changes
    const observer = new MutationObserver(updateChart);
    observer.observe(document.getElementById('pendingRequests'), { childList: true });
    observer.observe(document.getElementById('approvedRequests'), { childList: true });
});


