document.querySelector('.tabs').addEventListener('click', (e) => {
    const selectedTab = e.target;
    if (selectedTab.classList.contains('tablinks')) {
      const domain = selectedTab.getAttribute('data-domain');
  
      chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
        const activeTab = tabs[0];
        const activeUrl = activeTab.url;
        console.log('log', activeUrl);
        const domain = activeUrl.replace('https://', '').replace(/\/$/, '');
  
        // Create the API URL
        const apiUrl = `https://tranco-list.eu/api/ranks/domain/${domain}`;
  
        // Send a request to the API
        fetch(apiUrl, {
          method: 'GET',
          mode: 'no-cors'
        })
          .then(response => {
            if (response.status === 200) {
              return response.json();
            } else {
              console.log(response.text())
              const dummyData =     {
                "ranks": [
                    {
                        "date": "2024-08-06",
                        "rank": 121188
                    },
                    {
                        "date": "2024-08-05",
                        "rank": 121080
                    },
                    {
                        "date": "2024-08-04",
                        "rank": 121173
                    },
                    {
                        "date": "2024-08-03",
                        "rank": 121195
                    },
                    {
                        "date": "2024-08-02",
                        "rank": 121306
                    },
                    {
                        "date": "2024-08-01",
                        "rank": 121373
                    },
                    {
                        "date": "2024-07-31",
                        "rank": 121364
                    },
                    {
                        "date": "2024-07-30",
                        "rank": 121507
                    },
                    {
                        "date": "2024-07-29",
                        "rank": 120691
                    },
                    {
                        "date": "2024-07-28",
                        "rank": 120149
                    },
                    {
                        "date": "2024-07-27",
                        "rank": 120006
                    },
                    {
                        "date": "2024-07-26",
                        "rank": 120042
                    },
                    {
                        "date": "2024-07-25",
                        "rank": 120163
                    },
                    {
                        "date": "2024-07-24",
                        "rank": 120112
                    },
                    {
                        "date": "2024-07-23",
                        "rank": 120181
                    },
                    {
                        "date": "2024-07-22",
                        "rank": 120420
                    },
                    {
                        "date": "2024-07-21",
                        "rank": 121313
                    },
                    {
                        "date": "2024-07-20",
                        "rank": 120992
                    },
                    {
                        "date": "2024-07-19",
                        "rank": 120979
                    },
                    {
                        "date": "2024-07-18",
                        "rank": 121145
                    },
                    {
                        "date": "2024-07-17",
                        "rank": 121724
                    },
                    {
                        "date": "2024-07-16",
                        "rank": 123167
                    },
                    {
                        "date": "2024-07-15",
                        "rank": 123164
                    },
                    {
                        "date": "2024-07-14",
                        "rank": 123381
                    },
                    {
                        "date": "2024-07-13",
                        "rank": 123360
                    },
                    {
                        "date": "2024-07-12",
                        "rank": 123267
                    },
                    {
                        "date": "2024-07-11",
                        "rank": 123198
                    },
                    {
                        "date": "2024-07-10",
                        "rank": 123191
                    },
                    {
                        "date": "2024-07-09",
                        "rank": 123126
                    },
                    {
                        "date": "2024-07-08",
                        "rank": 122549
                    },
                    {
                        "date": "2024-07-07",
                        "rank": 122271
                    },
                    {
                        "date": "2024-07-06",
                        "rank": 121910
                    },
                    {
                        "date": "2024-07-05",
                        "rank": 121512
                    },
                    {
                        "date": "2024-07-04",
                        "rank": 121362
                    },
                    {
                        "date": "2024-07-03",
                        "rank": 120920
                    },
                    {
                        "date": "2024-07-02",
                        "rank": 119917
                    },
                    {
                        "date": "2024-07-01",
                        "rank": 118648
                    }
                ],
                "domain": "toolify.ai"
            }
              return dummyData;
            }
          })
          .then(data => {
            data.ranks = data.ranks || [];
  
            const ranks = data.ranks || [];

            // Update rankcsv and rankscore based on the fetched data
            const rankcsvElement = document.getElementById('rankCsv');
            if (rankcsvElement) {
              rankcsvElement.textContent = `Rank CSV: ${ranks.map(r => `${r.date},${r.rank}`).join(';')}`;
            }
    
            const rankscoreElement = document.getElementById('rankScore');
            if (rankscoreElement) {
              rankscoreElement.textContent = `Rank Score: ${data.totalScore}`;
            }
            // Check if the data contains rank information
            if (data.ranks && data.ranks.length > 0) {
              // Destroy previous chart instance if it exists
              const existingChart = Chart.getChart('rankChart');
              if (existingChart) {
                existingChart.destroy();
              }
  
              // Update the rank history data
              const ctx = document.getElementById('rankChart').getContext('2d');
              const chart = new Chart(ctx, {
                type: 'line',
                data: {
                  labels: data.ranks.map(r => r.date),
                  datasets: [{
                    label: 'Rank',
                    data: data.ranks.map(r => r.rank),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                  }]
                },
                options: {
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }
              });
            } else {
              // Display an error message
              const errorMessage = document.getElementById('error-message');
              errorMessage.innerText = 'Failed to retrieve rank information.';
              errorMessage.style.display = 'block';
            }
          })
          .catch(error => {
            console.error(error);
            // Display an error message
            const errorMessage = document.getElementById('error-message');
            errorMessage.innerText = 'Failed to retrieve data.';
            errorMessage.style.display = 'block';
          });
      });
    }
  });
  