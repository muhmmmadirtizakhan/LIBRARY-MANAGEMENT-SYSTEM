// --- Global variables ---
const screens = ['welcome-screen', 'details-screen', 'main-menu-screen', 'books-list-screen', 'purchase-screen', 'rent-screen', 'sell-screen', 'receipt-screen'];
let userDetails = {};
let currentChoice = '';
let currentReceiptContent = '';
let books = [];

// --- UI Screen Management ---
function showScreen(screenId) {
    screens.forEach(id => {
        const screen = document.getElementById(id);
        if (screen) {
            if (id === screenId) {
                screen.style.display = 'block';
                setTimeout(() => {
                    screen.classList.add('active');
                }, 10);
            } else {
                screen.classList.remove('active');
                setTimeout(() => {
                    if (id !== screenId) screen.style.display = 'none';
                }, 300);
            }
        }
    });
    
    // Special actions for specific screens
    if (screenId === 'purchase-screen') {
        populateBookSelect('purchase-book-select', true);
        updatePurchasePrice();
    } else if (screenId === 'rent-screen') {
        populateBookSelect('rent-book-select', true);
        updateRentPrice();
    } else if (screenId === 'books-list-screen') {
        displayBooks();
    }
}

// --- Modal/Message Box Functionality ---
function showMessage(title, message) {
    const modal = document.getElementById('message-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.classList.remove('hidden');
}

// --- Data for Books ---
function initializeBooks() {
   books = [
    { name: "Seerat un Nabi", author: "Dr. Muhammad Tahir ul Qadri", price: 500, isAvailable: true },
    { name: "Islam aur Science", author: "Dr. Muhammad Tahir ul Qadri", price: 650, isAvailable: true },
    { name: "History of Islam", author: "Akbar Shah Khan", price: 800, isAvailable: false },
    { name: "Al-Bidaya wal Nihaya", author: "Imam Ibn Kathir", price: 1200, isAvailable: true },
    { name: "Khutbat-e-Bahawalpur", author: "Allama Iqbal", price: 450, isAvailable: true },
    { name: "The Decline of Muslim Ummah", author: "Syed Abul A'la Maududi", price: 750, isAvailable: false },
    { name: "Riyadh-us-Saliheen", author: "Imam an-Nawawi", price: 1000, isAvailable: true },
    { name: "Tafseer Ibn Kathir", author: "Imam Ibn Kathir", price: 1500, isAvailable: true },
    { name: "The Crusades", author: "Thomas Asbridge", price: 900, isAvailable: true },
    { name: "Fazail-e-Amaal", author: "Muhammad Zakariyya Kandhlawi", price: 300, isAvailable: false },
    { name: "Nahjul Balagha", author: "Imam Ali", price: 850, isAvailable: true },
    { name: "The Ottoman Empire", author: "Lord Kinross", price: 1100, isAvailable: true },
    { name: "Iqbal ka Shaheen", author: "Dr. Muhammad Iqbal", price: 250, isAvailable: true },
    { name: "Tareekh-e-Tabari", author: "Muhammad ibn Jarir al-Tabari", price: 1800, isAvailable: false },
    { name: "World History by H.G. Wells", author: "H.G. Wells", price: 700, isAvailable: true },
    { name: "Minhaj ul Abideen", author: "Imam Ghazali", price: 600, isAvailable: true },
    { name: "Islam at the Crossroads", author: "Muhammad Asad", price: 550, isAvailable: true },
    { name: "A Short History of Time", author: "Stephen Hawking", price: 950, isAvailable: true },
    { name: "Kitab al-Tawheed", author: "Muhammad ibn Abd al-Wahhab", price: 400, isAvailable: true },
    { name: "Islamic History by Akbar Shah Khan", author: "Akbar Shah Khan", price: 780, isAvailable: false },
    { name: "Modern World History", author: "Norman Lowe", price: 820, isAvailable: true },
    { name: "Forty Hadith of Nawawi", author: "Imam an-Nawawi", price: 350, isAvailable: true },
    { name: "Life of Muhammad", author: "Haykal", price: 680, isAvailable: true },
    { name: "Medieval History", author: "Marc Bloch", price: 980, isAvailable: true },
    { name: "Tafseer As-Sa'di", author: "Abdur Rahman al-Sa'di", price: 1300, isAvailable: true },
    { name: "History of Baghdad", author: "Al-Khatib al-Baghdadi", price: 1050, isAvailable: false },
    { name: "History of Europe", author: "J.M. Roberts", price: 1150, isAvailable: true },
    { name: "Tafheem-ul-Qur'an (6 Vols)", author: "Syed Abul A'la Maududi", price: 1220, isAvailable: true },
    { name: "Nukhbat al-Fikr", author: "Ibn Hajar Al-Asqalani", price: 1400, isAvailable: true },
    { name: "Sahih al-Bukhari", author: "Imam Bukhari", price: 2000, isAvailable: true },
    { name: "Sahih Muslim", author: "Imam Muslim", price: 1900, isAvailable: true },
    { name: "Sunan Abu Dawood", author: "Imam Abu Dawood", price: 1700, isAvailable: true },
    { name: "Sunan an-Nasa'i", author: "Imam an-Nasa'i", price: 1600, isAvailable: true },
    { name: "Sunan Ibn Majah", author: "Ibn Majah", price: 1500, isAvailable: false },
    { name: "Jami' at-Tirmidhi", author: "Imam Tirmidhi", price: 1650, isAvailable: true },
    { name: "Musnad Ahmad", author: "Imam Ahmad ibn Hanbal", price: 1800, isAvailable: true },
    { name: "Shama'il Muhammadiyah", author: "Imam Tirmidhi", price: 950, isAvailable: true },
    { name: "Ar-Raheeq al-Makhtum", author: "Safiyyur Rahman Mubarakpuri", price: 720, isAvailable: true },
    { name: "Fiqh-us-Sunnah", author: "Sayyid Sabiq", price: 1300, isAvailable: true },
    { name: "Al-Hidayah", author: "Burhan al-Din al-Marghinani", price: 1450, isAvailable: true },
    { name: "Usul al-Fiqh", author: "Imam Shafi'i", price: 1100, isAvailable: false },
    { name: "Al-Muwatta", author: "Imam Malik", price: 1550, isAvailable: true },
    { name: "Bidayat al-Mujtahid", author: "Ibn Rushd", price: 1250, isAvailable: true },
    { name: "Kashf al-Mahjub", author: "Ali Hujwiri (Data Ganj Bakhsh)", price: 1400, isAvailable: true },
    { name: "Ihya Ulum al-Din", author: "Imam Ghazali", price: 1350, isAvailable: true },
    { name: "Futuhat al-Makkiyya", author: "Ibn Arabi", price: 2000, isAvailable: true },
    { name: "Fusus al-Hikam", author: "Ibn Arabi", price: 1000, isAvailable: true },
    { name: "Dalail al-Khayrat", author: "Imam al-Jazuli", price: 750, isAvailable: true },
    { name: "As-Shifa", author: "Qadi Iyad", price: 1150, isAvailable: true },
    { name: "Al-Adab al-Mufrad", author: "Imam Bukhari", price: 950, isAvailable: true },
    { name: "Zaad al-Ma'ad", author: "Ibn al-Qayyim", price: 1400, isAvailable: true },
    { name: "Madarij as-Salikin", author: "Ibn al-Qayyim", price: 1350, isAvailable: false },
    { name: "Talbis Iblis", author: "Ibn al-Jawzi", price: 1200, isAvailable: true },
    { name: "Kitab al-Zuhd", author: "Imam Ahmad ibn Hanbal", price: 980, isAvailable: true },
    { name: "Kitab al-Tawheed (Shaikh al-Islam)", author: "Ibn Taymiyyah", price: 1450, isAvailable: true },
    { name: "Majmu' al-Fatawa", author: "Ibn Taymiyyah", price: 2100, isAvailable: false },
    { name: "Al-Siyasah al-Shar'iyyah", author: "Ibn Taymiyyah", price: 1000, isAvailable: true },
    { name: "Hashiyat Ibn Abidin", author: "Ibn Abidin", price: 1600, isAvailable: true },
    { name: "Al-Itqan fi Ulum al-Qur'an", author: "Jalal al-Din al-Suyuti", price: 1750, isAvailable: true }
];
}

// Populate book select dropdowns
function populateBookSelect(selectId, availableOnly = false) {
    const select = document.getElementById(selectId);
    select.innerHTML = '<option value="">Select a book</option>';
    
    books.forEach(book => {
        if (!availableOnly || book.isAvailable) {
            const option = document.createElement('option');
            option.value = book.name;
            option.textContent = `${book.name} by ${book.author} - Rs. ${book.price}`;
            select.appendChild(option);
        }
    });
}

// Update purchase price display
function updatePurchasePrice() {
    const bookSelect = document.getElementById('purchase-book-select');
    const quantityInput = document.getElementById('purchase-quantity');
    const priceDisplay = document.getElementById('purchase-price-display');
    
    const selectedBook = books.find(b => b.name === bookSelect.value);
    if (selectedBook) {
        const totalPrice = selectedBook.price * parseInt(quantityInput.value);
        priceDisplay.textContent = `Rs. ${totalPrice.toFixed(2)}`;
    } else {
        priceDisplay.textContent = 'Rs. 0.00';
    }
}

// Update rent price display
function updateRentPrice() {
    const bookSelect = document.getElementById('rent-book-select');
    const daysInput = document.getElementById('rent-days');
    const priceDisplay = document.getElementById('rent-price-display');
    
    const selectedBook = books.find(b => b.name === bookSelect.value);
    if (selectedBook) {
        // Calculate rental price (10% of book price per week)
        const weeklyRate = selectedBook.price * 0.1;
        const dailyRate = weeklyRate / 7;
        const totalPrice = dailyRate * parseInt(daysInput.value);
        priceDisplay.textContent = `Rs. ${totalPrice.toFixed(2)}`;
    } else {
        priceDisplay.textContent = 'Rs. 0.00';
    }
}

// Display books in the books list screen
function displayBooks() {
    const booksGrid = document.getElementById('books-grid');
    booksGrid.innerHTML = '';
    
    const searchTerm = document.getElementById('book-search').value.toLowerCase();
    
    books.forEach(book => {
        if (book.name.toLowerCase().includes(searchTerm) || 
            book.author.toLowerCase().includes(searchTerm)) {
            booksGrid.innerHTML += `
                <div class="p-4 bg-gray-800 rounded-lg text-center book-option hover:bg-gray-700 transition-all">
                    <p class="font-bold text-lg">${book.name}</p>
                    <p class="text-sm text-gray-400 mt-1">by ${book.author}</p>
                    <p class="text-sm text-gray-400 mt-1">Price: Rs. ${book.price.toFixed(2)}</p>
                    <p class="text-sm mt-2">Status: <span class="${book.isAvailable ? 'text-green-400' : 'text-red-400'} font-semibold">${book.isAvailable ? 'Available' : 'Not Available'}</span></p>
                </div>
            `;
        }
    });
}

// --- Event Listeners and Logic ---
function setupEventListeners() {
    // Exit button
    document.getElementById('exit-btn').addEventListener('click', () => {
        if (confirm('Are you sure you want to exit the library system?')) {
            showScreen('welcome-screen');
        }
    });

    // Welcome screen button
    document.getElementById('start-btn').addEventListener('click', () => {
        showScreen('details-screen');
    });

    // Details form submission
    document.getElementById('details-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const form = e.target;
        userDetails = {
            name: form.elements['name'].value,
            age: form.elements['age'].value,
            phone: form.elements['phone'].value,
        };
        showScreen('main-menu-screen');
    });

    // Main menu buttons
    document.getElementById('purchase-btn').addEventListener('click', () => {
        currentChoice = 'PURCHASED';
        showScreen('purchase-screen');
    });
    
    document.getElementById('rent-btn').addEventListener('click', () => {
        currentChoice = 'RENT';
        showScreen('rent-screen');
    });
    
    document.getElementById('sell-btn').addEventListener('click', () => {
        currentChoice = 'SOLD';
        showScreen('sell-screen');
    });

    // Book search functionality
    document.getElementById('book-search').addEventListener('input', displayBooks);

    document.getElementById('show-books-btn').addEventListener('click', () => {
        showScreen('books-list-screen');
    });

    // Purchase form events
    document.getElementById('purchase-book-select').addEventListener('change', updatePurchasePrice);
    document.getElementById('purchase-quantity').addEventListener('input', updatePurchasePrice);

    // Purchase form submission
    document.getElementById('purchase-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const bookName = document.getElementById('purchase-book-select').value;
        const quantity = parseInt(document.getElementById('purchase-quantity').value);
        
        const book = books.find(b => b.name === bookName);

        if (!book) {
            showMessage("Error", "Please select a book to purchase.");
            return;
        }
        
        if (!book.isAvailable) {
            showMessage("Error", "This book is not available for purchase.");
            return;
        }

        const totalPrice = quantity * book.price;
        
        // Update book availability
        book.isAvailable = false;

        currentReceiptContent = `
            Purpose: ${currentChoice}
            
            User Details:
            Name: ${userDetails.name}
            Age: ${userDetails.age}
            Phone: ${userDetails.phone}
            
            Transaction Details:
            Type: Purchase
            Book Name: ${bookName}
            Quantity: ${quantity}
            Price per book: Rs. ${book.price.toFixed(2)}
            Total Amount: Rs. ${totalPrice.toFixed(2)}
            
            Transaction Date: ${new Date().toLocaleString()}
        `;

        const receiptHtml = `
            <p class="font-bold mb-2 text-indigo-400">Purpose: ${currentChoice}</p>
            <div class="mb-4 bg-gray-900 p-3 rounded-md">
                <p class="text-sm font-semibold">User Details:</p>
                <p class="text-sm mt-1">Name: ${userDetails.name}</p>
                <p class="text-sm">Age: ${userDetails.age}</p>
                <p class="text-sm">Phone: ${userDetails.phone}</p>
            </div>
            <hr class="border-gray-600 my-4">
            <p class="text-xl font-bold mb-2 text-indigo-300">Purchase Receipt</p>
            <div class="bg-gray-900 p-3 rounded-md">
                <p class="text-sm">Book Name: ${bookName}</p>
                <p class="text-sm">Quantity: ${quantity}</p>
                <p class="text-sm">Price per book: Rs. ${book.price.toFixed(2)}</p>
                <p class="text-lg font-semibold mt-2 text-indigo-300">Total Amount: Rs. ${totalPrice.toFixed(2)}</p>
            </div>
            <p class="text-xs text-gray-400 mt-4 text-center">Transaction Date: ${new Date().toLocaleString()}</p>
        `;
        document.getElementById('receipt-content').innerHTML = receiptHtml;
        showScreen('receipt-screen');
    });

    // Rent form events
    document.getElementById('rent-book-select').addEventListener('change', updateRentPrice);
    document.getElementById('rent-days').addEventListener('input', updateRentPrice);

    // Rent form submission
    document.getElementById('rent-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const bookName = document.getElementById('rent-book-select').value;
        const days = parseInt(document.getElementById('rent-days').value);
        const book = books.find(b => b.name === bookName);
        
        if (!book) {
            showMessage("Error", "Please select a book to rent.");
            return;
        }

        if (!book.isAvailable) {
            showMessage("Error", `The book "${bookName}" is not available for rent.`);
            return;
        }

        // Calculate rental price
        const weeklyRate = book.price * 0.1;
        const dailyRate = weeklyRate / 7;
        const totalPrice = dailyRate * days;
        
        // Update book availability
        book.isAvailable = false;
        
        // Generate receipt for rent
        currentReceiptContent = `
            Purpose: ${currentChoice}
            
            User Details:
            Name: ${userDetails.name}
            Age: ${userDetails.age}
            Phone: ${userDetails.phone}
            
            Transaction Details:
            Type: Rent
            Book Name: ${bookName}
            Rental Period: ${days} days
            Daily Rate: Rs. ${dailyRate.toFixed(2)}
            Total Rental Fee: Rs. ${totalPrice.toFixed(2)}
            Due Date: ${new Date(Date.now() + days * 24 * 60 * 60 * 1000).toLocaleDateString()}
            
            Transaction Date: ${new Date().toLocaleString()}
        `;

        const receiptHtml = `
            <p class="font-bold mb-2 text-green-400">Purpose: ${currentChoice}</p>
            <div class="mb-4 bg-gray-900 p-3 rounded-md">
                <p class="text-sm font-semibold">User Details:</p>
                <p class="text-sm mt-1">Name: ${userDetails.name}</p>
                <p class="text-sm">Age: ${userDetails.age}</p>
                <p class="text-sm">Phone: ${userDetails.phone}</p>
            </div>
            <hr class="border-gray-600 my-4">
            <p class="text-xl font-bold mb-2 text-green-300">Rental Receipt</p>
            <div class="bg-gray-900 p-3 rounded-md">
                <p class="text-sm">Book Name: ${bookName}</p>
                <p class="text-sm">Rental Period: ${days} days</p>
                <p class="text-sm">Daily Rate: Rs. ${dailyRate.toFixed(2)}</p>
                <p class="text-lg font-semibold mt-2 text-green-300">Total Rental Fee: Rs. ${totalPrice.toFixed(2)}</p>
                <p class="text-sm mt-2">Please return by: ${new Date(Date.now() + days * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
            </div>
            <p class="text-xs text-gray-400 mt-4 text-center">Transaction Date: ${new Date().toLocaleString()}</p>
        `;
        document.getElementById('receipt-content').innerHTML = receiptHtml;
        showScreen('receipt-screen');
    });
    
    // Sell form submission
    document.getElementById('sell-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const form = e.target;
        const bookName = form.elements['sell-book-name'].value;
        const author = form.elements['sell-author'].value;
        const price = parseFloat(form.elements['sell-price'].value);
        const condition = form.elements['sell-condition'].value;

        // Add the new book to the system
        const newBook = { 
            name: bookName, 
            author: author, 
            price: price, 
            isAvailable: true, 
            condition: condition
        };
        books.push(newBook);
        
        currentReceiptContent = `
            Purpose: ${currentChoice}
            
            User Details:
            Name: ${userDetails.name}
            Age: ${userDetails.age}
            Phone: ${userDetails.phone}
            
            Transaction Details:
            Type: Sell
            Book Name: ${bookName}
            Author: ${author}
            Condition: ${condition}
            Asking Price: Rs. ${price.toFixed(2)}
            
            Note: We will contact you soon to finalize the selling process.
            
            Listing Date: ${new Date().toLocaleString()}
        `;

        const receiptHtml = `
            <p class="font-bold mb-2 text-red-400">Purpose: ${currentChoice}</p>
            <div class="mb-4 bg-gray-900 p-3 rounded-md">
                <p class="text-sm font-semibold">User Details:</p>
                <p class="text-sm mt-1">Name: ${userDetails.name}</p>
                <p class="text-sm">Age: ${userDetails.age}</p>
                <p class="text-sm">Phone: ${userDetails.phone}</p>
            </div>
            <hr class="border-gray-600 my-4">
            <p class="text-xl font-bold mb-2 text-red-300">Selling Details</p>
            <div class="bg-gray-900 p-3 rounded-md">
                <p class="text-sm">Book Name: ${bookName}</p>
                <p class="text-sm">Author: ${author}</p>
                <p class="text-sm">Condition: ${condition}</p>
                <p class="text-sm">Asking Price: Rs. ${price.toFixed(2)}</p>
                <p class="mt-4 text-center text-green-300">We will contact you soon for the selling process! 📞</p>
            </div>
            <p class="text-xs text-gray-400 mt-4 text-center">Listing Date: ${new Date().toLocaleString()}</p>
        `;
        document.getElementById('receipt-content').innerHTML = receiptHtml;
        showScreen('receipt-screen');
    });
    
    // Download receipt button
    document.getElementById('download-receipt-btn').addEventListener('click', () => {
        const blob = new Blob([currentReceiptContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'library_receipt.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
    
    // Modal OK button
    document.getElementById('modal-ok-btn').addEventListener('click', () => {
        document.getElementById('message-modal').classList.add('hidden');
    });
}

// --- Initialize the application ---
window.onload = function() {
    // Initialize books data
    initializeBooks();
    
    // Setup event listeners
    setupEventListeners();
   
    // Show the initial welcome screen
    showScreen('welcome-screen');
};