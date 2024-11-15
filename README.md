# FAIRWallet

The FAIRWallet is a secure wallet platform for both desktop and mobile devices.

For a list of frequently asked questions please visit the [FairWallet Support](https://support.fairco.in/).

## Main Features

- Multiple wallet creation and management in-app
- Easy spending proposal flow for shared wallets and group payments
- Device-based security: all private keys are stored locally, not in the cloud
- Support for FairCoin testnet wallets
- Support for over 150 currency pricing options and unit denomination in FAIR
- Push notifications (only available for iOS and android versions)
- Customizable wallet naming
- Multiple languages supported
- Available for iOS, [Android](https://play.google.com/store/apps/details?id=in.fairco.wallet) devices

## Environment(DEV)

- Nodejs(14.0.0)
- Android

## Pages

- Wallet screen
- Wallet detail screen (transaction lists)
- Import/Create wallet screen
- Send screen
- Receive screen

## Installation

To install FAIRWallet, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/FairCoinOfficial/FairWallet.git
   ```
2. Navigate to the project directory:
   ```
   cd FairWallet
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Run the application:
   ```
   npm start
   ```

## Usage

To use FAIRWallet, follow these steps:

1. Open the application on your device.
2. Create a new wallet or import an existing one.
3. Manage your wallets, send and receive FairCoin, and view transaction history.

For detailed usage instructions, please refer to the [FairWallet Documentation](https://docs.fairco.in/).

## Contributing

We welcome contributions to FAIRWallet! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix:
   ```
   git checkout -b my-feature-branch
   ```
3. Make your changes and commit them:
   ```
   git commit -m "Add new feature"
   ```
4. Push your changes to your fork:
   ```
   git push origin my-feature-branch
   ```
5. Create a pull request on the main repository.

For more details on contributing, please refer to the [Contributing Guidelines](CONTRIBUTING.md).

## License

FAIRWallet is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## How It Works

FAIRWallet is a secure and user-friendly wallet platform designed to manage FairCoin. It supports multiple wallet creation and management, allowing users to easily create and manage multiple wallets within the app. The wallet provides a seamless spending proposal flow for shared wallets and group payments, making it convenient for users to collaborate on transactions.

The wallet ensures device-based security by storing all private keys locally on the user's device, rather than in the cloud. This enhances the security of the wallet and protects the user's funds. FAIRWallet also supports FairCoin testnet wallets, allowing users to test and experiment with the wallet without using real funds.

The wallet supports over 150 currency pricing options and unit denomination in FAIR, providing users with flexibility in managing their funds. Push notifications are available for iOS and Android versions, keeping users informed about important events and updates.

FAIRWallet offers customizable wallet naming, allowing users to personalize their wallets. The wallet is available in multiple languages, making it accessible to users from different regions. It is available for iOS and Android devices, providing a seamless experience across different platforms.

## More Information About the Wallet Code

The FAIRWallet codebase is organized into several modules and components, each responsible for different functionalities of the wallet. Here is an overview of the main modules and components:

1. **Bitcoin Module**: This module handles all Bitcoin-related functionalities, including creating and managing Bitcoin wallets, generating addresses, signing transactions, and interacting with the Bitcoin network. It includes the following files:
   - `BitcoinService.js`: Provides functions for interacting with the Bitcoin network, such as fetching transaction information, pushing transactions, and getting wallet balances.
   - `BitcoinUtil.js`: Contains utility functions for converting BTC to Satoshi, validating addresses, and formatting values.
   - `BitcoinWallet.js`: Handles the creation and management of Bitcoin wallets, including generating new wallets, importing wallets, and deriving addresses from mnemonic phrases.

2. **Language Module**: This module manages the localization and translation of the wallet. It includes language files for different supported languages and provides functions for switching between languages. The main files are:
   - `en.js`: Contains English translations for various text strings used in the wallet.
   - `vi.js`: Contains Vietnamese translations for various text strings used in the wallet.
   - `lang.js`: Exports the available languages and their respective translation files.

3. **Theme Module**: This module handles the theming and styling of the wallet. It provides different themes and allows users to switch between them. The main files are:
   - `light.js`: Defines the light theme colors and styles.
   - `dark.js`: Defines the dark theme colors and styles.
   - `Themes.js`: Exports the available themes and their respective styles.

4. **Persistence Module**: This module manages the storage and retrieval of wallet data, including wallets, contacts, and settings. It provides functions for adding, updating, and removing data from storage. The main files are:
   - `WalletService.js`: Handles the storage and retrieval of wallet data, including adding new wallets, importing wallets, and getting wallet balances.
   - `ContactService.js`: Manages the storage and retrieval of contact data, including adding, updating, and removing contacts.
   - `LanguageService.js`: Handles the storage and retrieval of language settings.
   - `ThemeService.js`: Manages the storage and retrieval of theme settings.

5. **Navigation Module**: This module handles the navigation and routing within the wallet. It defines the different screens and their respective navigation flows. The main files are:
   - `ApplicationNavigator.js`: Defines the main navigation structure of the wallet, including the stack navigator and the different screens.
   - `DrawerNavigator.js`: Handles the drawer navigation and the different drawer items.
   - `MainStackNavigator.js`: Defines the main stack navigator and the different screens within the stack.

6. **Components**: The wallet includes various reusable components that are used throughout the application. These components provide common UI elements and functionalities. Some of the main components are:
   - `LMButton.js`: A customizable button component.
   - `LMFlatList.js`: A flat list component for displaying lists of items.
   - `LMImage.js`: An image component for displaying images.
   - `LMLoading.js`: A loading spinner component.
   - `LMText.js`: A text component for displaying text with different styles.
   - `LMTextInput.js`: A text input component for user input.

This is a high-level overview of the main modules and components in the FAIRWallet codebase. For more detailed information, please refer to the individual files and their respective documentation.
