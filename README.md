# Pokernow Ledger Settler - Chrome Extension 🎲

A Chrome extension that automates the settlement process for Pokernow.club ledgers, minimizing the number of transactions needed to settle debts between players.

## Features 💡

- **Automated Settlement**: Calculates the minimum number of transactions needed to settle the poker ledger
- **Transaction Optimization**: Uses a greedy algorithm to minimize the number of required transfers
- **User-Friendly Interface**: Presents settlement information in a clean, easy-to-understand modal
- **Seamless Integration**: Works directly on Pokernow.club ledger pages
- **Smart Delay Handling**: Implements timeouts and delays for smooth user experience

## How to Use 📖

1. Go to your Pokernow.club ledger page
2. Click the extension icon in your Chrome toolbar
3. The extension will automatically:
   - Extract player data from the ledger
   - Calculate optimal settlement transactions
   - Display a modal with settlement instructions
4. Follow the displayed transaction instructions to settle the ledger

## Technical Details 🛠️

- **Languages**: JavaScript, HTML, CSS
- **Algorithm**: Greedy optimization for minimizing transactions
- **DOM Manipulation**: Event listeners and HTML injection
- **Browser**: Chrome Extension APIs

## Development Setup 👨‍💻

1. Clone the repository:
   ```bash
   git clone https://github.com/tatavarthiv/Pokernow-Ledger-Settler---Chrome-Extension.git
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" in the top right

4. Click "Load unpacked" and select the cloned directory

5. Make changes to the code and reload the extension to test

## Contributing 🤝

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Privacy 🔒

This extension:
- Only runs on Pokernow.club ledger pages
- Does not collect or store any user data
- Performs all calculations locally in the browser

## Support 💬

For issues, feature requests, or questions:
- Create an issue in the GitHub repository
- Contact the developer at [GitHub](https://github.com/tatavarthiv)

## License 📝

This project is licensed under the MIT License - see the LICENSE file for details.

---

Created by [Vijay Tatavarthi](https://github.com/tatavarthiv)
