// Function to extract the ledger data from the PokerNow website's ledger page
function extractLedgerData() {
    //entry point for log button
    var log_button;
    var checkExist = setInterval(function () {
    if (!document.body.contains(log_button)) {
        console.log("FINDING LOG BUTTON");
        try {
            log_button = document.getElementsByClassName("button-1 show-log-button small-button dark-gray")[0];
            log_button.addEventListener("click", logButtonClicked, false);
        } catch {
            log_button = null;
        }
    }
    }, 1000); // check every 1000ms

    //entry point for ledger button
    function logButtonClicked(){
        console.log("LOG BUTTON CLICKED");

        // Set a timeout to wait for the Ledger button to appear in the DOM
        setTimeout(function() {
            var ledgerButton = document.querySelector("#canvas > div.game-column > div.game-main-container.two-color > div.modal-overlay > div > div.modal-body > div.log-modal-controls > button.button-1.green-2.small-button.ledger-button");
            if (ledgerButton) {
                ledgerButton.addEventListener("click", ledgerButtonClicked, false);
            } else {
                console.error("Ledger button not found");
            }
        }, 1000); 
    }

    function ledgerButtonClicked() {
        console.log("LEDGER BUTTON CLICKED");

        var container = document.querySelector('#canvas > div.game-column > div.game-main-container.two-color > div.modal-overlay > div > div.modal-body > div.log-modal-controls');

        // Check if the button already exists
        var existingButton = container.querySelector(".finalize-ledger-button");
        if (existingButton) {
            console.log("Finalize Ledger button already exists");
            return;
        }

        var finalizeButton = document.createElement('button');
        finalizeButton.type = "button";
        finalizeButton.className = "button-1 green small-button finalize-ledger-button";
        finalizeButton.innerHTML = "Finalize Ledger";

        if (container) {
            container.appendChild(finalizeButton);
        } else {
            console.error("Container for Finalize Ledger button not found");
        }

        finalizeButton.addEventListener("click", function() {
            console.log("FINALIZE LEDGER BUTTON CLICKED");
            setTimeout(traverseData, 500); 
        });
    }

    function traverseData() {
        const players = [];
        const chipsValues = {};
        let balances = [];
    
        // Find the container div that holds the ledger rows
        const ledgerRowsContainer = document.querySelector("#canvas > div.game-column > div.game-main-container.two-color > div.modal-overlay > div > div.modal-body > div:nth-child(1) > div");
        if (!ledgerRowsContainer) {
            console.log("Could not find ledger rows container");
        }

        console.log("Finding ledger rows container:", ledgerRowsContainer);
    
        if (ledgerRowsContainer) {
            const playerLedgerTables = ledgerRowsContainer.querySelectorAll(".player-ledger-table");
        
            playerLedgerTables.forEach((table) => {
                const playerIdElement = table.querySelector(".player-id");
                const chipsValueElement = table.querySelector(".positive-net, .negative-net");
        
                if (playerIdElement && chipsValueElement) {
                    let playerName = playerIdElement.textContent.trim();
                    let chipsValue = chipsValueElement.textContent.trim();

                    // Use regex to extract the name part before "@"
                    const nameMatch = playerName.match(/^[^@]+/);
                    if (nameMatch) {
                        playerName = nameMatch[0].trim();
                    }

                    // Convert to float
                    chipsValue = parseFloat(chipsValue);
        
                    players.push(playerName);
                    balances.push({
                        name: playerName,
                        balance: chipsValue
                    });
                }
            });
        }           

        console.log("Balances:", balances);
        console.log("Processing ledger data");
        let transactions = [];
        
        const epsilon = 0.01; // A small tolerance level for floating point comparison
        while (balances.length > 0) {
            // Sort the balances array
            balances.sort((a, b) => b.balance - a.balance);

            let winner = balances[0];
            let loser = balances[balances.length - 1];

            let amount = Math.min(winner.balance, Math.abs(loser.balance));
            console.log(`Transaction: ${loser.name} pays ${winner.name} ${amount.toFixed(2)}`);

            transactions.push(`${loser.name} pays ${winner.name} ${amount.toFixed(2)}`);

            winner.balance -= amount;
            loser.balance += amount;

            // Filter out players whose balances are settled
            balances = balances.filter(player => Math.abs(player.balance) > epsilon);
        }

        console.log("Final Transactions:", JSON.stringify(transactions, null, 2));

        showModal(transactions);
    };

    // CSS for the modal
    const modalStyle = `
        .custom-modal {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6); /* Darker background for better contrast */
            z-index: 1000;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .custom-modal-content {
            background-color: #fff;
            padding: 25px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
            border: 2px solid rgb(63,167,108); /* Green border */
            width: 60%;
            max-width: 800px;
            max-height: 80%;
            overflow-y: auto;
        }
        .custom-modal-close {
            float: right;
            border: none;
            background: rgb(63,167,108); /* Green background */
            color: white;
            font-size: 20px;
            cursor: pointer;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            text-align: center;
            line-height: 30px; /* Vertically center the 'X' */
        }
        .custom-modal-list {
            list-style: none;
            padding: 0;
            margin: 0;
            color: #333; /* Darker text for better readability */
        }
        .custom-modal-list li {
            margin-bottom: 10px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    `;

    function showModal(transactions) {
    // Create style element
    const styleEl = document.createElement('style');
    styleEl.textContent = modalStyle;
    document.head.appendChild(styleEl);

    // Create modal elements
    const modal = document.createElement('div');
    modal.className = 'custom-modal';

    const modalContent = document.createElement('div');
    modalContent.className = 'custom-modal-content';

    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.className = 'custom-modal-close';
    closeButton.onclick = () => modal.remove();

    const transactionsList = document.createElement('ul');
    transactionsList.className = 'custom-modal-list';
    transactions.forEach(transaction => {
        const listItem = document.createElement('li');
        listItem.textContent = transaction;
        transactionsList.appendChild(listItem);
    });

    // Append elements
    modalContent.appendChild(closeButton);
    modalContent.appendChild(transactionsList);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    }
  }
  
  extractLedgerData();