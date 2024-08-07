// Get the selected tab's text content
function getSelectedTabText() {
    const selectedTab = document.querySelector('.tablinks.active');
    if (selectedTab) {
        return selectedTab.textContent;
    } else {
        return null;
    }
}

// Function to make a GET request to the API
function makeGETRequest(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}

// Function to update the rank chart
function updateRankChart(data) {
    // Extract the ranks from the data
    const ranks = data.ranks;

    // Create a line chart
    const ctx = document.getElementById('rankChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ranks.map(r => r.date),
            datasets: [{
                label: 'Rank History',
                data: ranks.map(r => r.rank),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(255, 99, 132, 1)'
            }]
        },
        options: {
            responsive: true,
            lineWidth: 1,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

// Function to update the rank CSV data
function updateRankCsv(data) {
    const ranks = data.ranks;
    const rankCsv = document.getElementById('rankCsv');
    rankCsv.innerText = 'Date,Rank\n';
    ranks.forEach((r, index) => {
        rankCsv.innerText += `${r.date},${r.rank}\n`;
    });
}

// Add event listener to each tab button
document.querySelector('.tabs').addEventListener('click', (e) => {
    const selectedTab = e.target;
    if (selectedTab.classList.contains('tablinks')) {
        // Get the selected domain
        const domain = selectedTab.textContent.trim();

        // Create the API URL
        const apiUrl = `https://tranco-list.eu/api/ranks/domain/${domain}`;

        // Make a GET request to the API
        makeGETRequest(apiUrl)
            .then(data => {
                // Update the rank chart
                updateRankChart(data);

                // Update the rank CSV data
                updateRankCsv(data);

                // Display the domain
                document.getElementById('selected-domain').innerText = domain;

                // Hide the loading indicator
                document.getElementById('loading').style.display = 'none';
            })
            .catch(error => {
                console.error(error);
                // Display an error message
                document.getElementById('error-message').innerText = 'Failed to retrieve data.';
                document.getElementById('error-message').style.display = 'block';
            });
    }
});
